/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/avoid-new */

const MS_SECOND = 1000;

export const captureThumb = (videoTag) =>
  new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoTag.videoWidth;
    canvas.height = videoTag.videoHeight;
    canvas.getContext("2d").drawImage(
      videoTag,
      0, // top
      0, // left
      videoTag.videoWidth,
      videoTag.videoHeight,
    );
    canvas.toBlob((thumbnail) => {
      resolve(thumbnail);
    }, "image/jpeg");
  });

const getVideoInfo = (videoBlob) =>
  new Promise((resolve, reject) => {
    const videoTag = document.createElement("video");
    videoTag.preload = "metadata";
    videoTag.muted = true;
    videoTag.defaultMuted = true;
    videoTag.playsInline = true;
    videoTag.autoplay = true;

    let resolved = false;

    const handleTimeout = () => {
      resolved = true;
      resolve({
        duration: null,
        thumbnail: null,
      });
      if (videoTag.removeEventListener) {
        // eslint-disable-next-line no-use-before-define
        videoTag.removeEventListener("loadeddata", handleLoadedData);
      }
      window.URL.revokeObjectURL(videoTag.src);
    };

    const timeout = setTimeout(handleTimeout, MS_SECOND);

    const handleVideoTag = (duration) => {
      captureThumb(videoTag)
        .then((thumbnail) => {
          videoTag.pause();
          if (!resolved) {
            clearTimeout(timeout);
            resolved = true;
            return resolve({duration, thumbnail});
          }
          window.URL.revokeObjectURL(videoTag.src);

          return null;
        })
        .catch((err) => {
          if (!resolved) {
            clearTimeout(timeout);
            resolved = true;
            reject(err);
          }
        });
    };

    const handleLoadedData = () => {
      let duration = videoTag.duration * MS_SECOND;
      if (videoTag.duration === Infinity) {
        videoTag.currentTime = Number.MAX_SAFE_INTEGER;
        videoTag.ontimeupdate = () => {
          videoTag.ontimeupdate = null;
          duration = videoTag.duration * MS_SECOND;
          videoTag.currentTime = 0;
          handleVideoTag(duration);
        };
      } else {
        handleVideoTag(duration);
      }
    };

    videoTag.addEventListener("loadeddata", handleLoadedData);
    videoTag.src = window.URL.createObjectURL(videoBlob);
  });

export default getVideoInfo;
