import React from "react";
// eslint-disable-next-line import-x/no-named-as-default
import styled from "styled-components";

const LoadingMessage = styled.div`
  font-family: Arial;
`;

const LoadingView = () => <LoadingMessage>Loading...</LoadingMessage>;

export default LoadingView;
