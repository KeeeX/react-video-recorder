import PropTypes from "prop-types";
import React, {PureComponent} from "react";
// eslint-disable-next-line import-x/no-named-as-default
import styled from "styled-components";

const Text = styled.div`
  position: absolute;
  top: 50px;
  top: 50px;
  right: 50px;
  font-family: Menlo, monospace;
  font-size: 28px;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
`;

const RecIcon = styled.div`
  width: 16px;
  height: 16px;
  background: #e55226;
  border-radius: 50%;
  float: left;
  margin: 2px 8px;
  margin-left: 0;
`;

const SECOND_MS = 1000;
const SECONDS_IN_A_MIN = 60;

const pad = (unit) => {
  const str = `${unit}`;
  const padStr = "00";
  return padStr.substring(0, padStr.length - str.length) + str;
};

const getState = (seconds) => {
  const minutes = Math.floor(seconds / SECONDS_IN_A_MIN);

  const humanTime =
    minutes === 0
      ? `${seconds - minutes * SECONDS_IN_A_MIN}s`
      : `${minutes}:${pad(seconds - minutes * SECONDS_IN_A_MIN)}`;

  return {
    seconds: seconds,
    human: humanTime,
  };
};

class Timer extends PureComponent {
  static propTypes = {
    timeLimit: PropTypes.number,
    defaultText: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const nextSeconds = props.timeLimit ? props.timeLimit / SECOND_MS : 0;

    this.state = getState(nextSeconds);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    const {timeLimit} = this.props;
    this.timer = setInterval(() => {
      const {seconds} = this.state;
      const nextSeconds = timeLimit ? seconds - 1 : seconds + 1;

      const nextState = getState(nextSeconds);
      this.setState(nextState);
    }, SECOND_MS);
  }

  render() {
    const defaultText = this.props.defaultText || "0:00";
    return (
      <Text {...this.props}>
        <RecIcon />
        {this.state.human || defaultText}
      </Text>
    );
  }
}

export default Timer;
