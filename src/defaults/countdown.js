import PropTypes from "prop-types";
import React, {PureComponent} from "react";
// eslint-disable-next-line import-x/no-named-as-default
import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Menlo, monospace;
  font-size: 100px;
  text-shadow: 1px 2px rgba(0, 0, 0, 0.5);
`;

const MS_SECOND = 1000;

export default class Countdown extends PureComponent {
  static propTypes = {
    countdownTime: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      number: props.countdownTime / MS_SECOND,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(this.updateNumber, MS_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  updateNumber = () => {
    this.setState(
      (prevState) => ({number: prevState.number - 1}),
      () => {
        if (this.state.number !== 0) {
          this.timeout = setTimeout(this.updateNumber, MS_SECOND);
        }
      },
    );
  };

  render() {
    return <Root>{this.state.number === 0 ? null : this.state.number}</Root>;
  }
}
