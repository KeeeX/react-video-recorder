import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Button from "./button.js";
import Countdown from "./countdown.js";
import RecordButton from "./record-button.js";
import StopButton from "./stop-button.js";
import Timer from "./timer.js";

const ActionsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line max-lines-per-function
const Actions = ({
  countdownTime,
  isCameraOn,
  isConnecting,
  isInlineRecordingSupported,
  isRecording,
  isReplayingVideo,
  isRunningCountdown,
  isVideoInputSupported,
  // onConfirm,
  onOpenVideoInput,
  // onPauseRecording,
  // onResumeRecording,
  onStartRecording,
  onStopRecording,
  onStopReplaying,
  // onTurnOffCamera,
  onTurnOnCamera,
  // replayVideoAutoplayAndLoopOff,
  // showReplayControls,
  streamIsReady,
  t,
  thereWasAnError,
  timeLimit,
  useVideoInput,
}) => {
  const renderContent = () => {
    const shouldUseVideoInput = !isInlineRecordingSupported && isVideoInputSupported;

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null;
    }

    if (isReplayingVideo) {
      return (
        <Button data-qa="start-replaying" onClick={onStopReplaying} type="button">
          {t("Use another video")}
        </Button>
      );
    }

    if (isRecording) {
      return <StopButton data-qa="stop-recording" onClick={onStopRecording} type="button" />;
    }

    if (isCameraOn && streamIsReady) {
      return (
        <RecordButton data-qa="start-recording" onClick={onStartRecording} t={t} type="button" />
      );
    }

    if (useVideoInput) {
      return (
        <Button data-qa="open-input" onClick={onOpenVideoInput} type="button">
          {t("Upload a video")}
        </Button>
      );
    }

    return shouldUseVideoInput ? (
      <Button data-qa="open-input" onClick={onOpenVideoInput} type="button">
        {t("Record a video")}
      </Button>
    ) : (
      <Button data-qa="turn-on-camera" onClick={onTurnOnCamera} type="button">
        {t("Turn my camera ON")}
      </Button>
    );
  };

  return (
    <div>
      {isRecording ? <Timer timeLimit={timeLimit} /> : null}
      {isRunningCountdown ? <Countdown countdownTime={countdownTime} /> : null}
      <ActionsWrapper>{renderContent()}</ActionsWrapper>
    </div>
  );
};

Actions.propTypes = {
  countdownTime: PropTypes.number,
  isCameraOn: PropTypes.bool,
  isConnecting: PropTypes.bool,
  isInlineRecordingSupported: PropTypes.bool,
  isRecording: PropTypes.bool,
  isReplayingVideo: PropTypes.bool,
  isRunningCountdown: PropTypes.bool,
  isVideoInputSupported: PropTypes.bool,
  onConfirm: PropTypes.func,
  onOpenVideoInput: PropTypes.func,
  onPauseRecording: PropTypes.func,
  onResumeRecording: PropTypes.func,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  onStopReplaying: PropTypes.func,
  onTurnOffCamera: PropTypes.func,
  onTurnOnCamera: PropTypes.func,
  replayVideoAutoplayAndLoopOff: PropTypes.bool,
  showReplayControls: PropTypes.bool,
  streamIsReady: PropTypes.bool,
  t: PropTypes.func,
  thereWasAnError: PropTypes.bool,
  timeLimit: PropTypes.number,
  useVideoInput: PropTypes.bool,
};

export default Actions;
