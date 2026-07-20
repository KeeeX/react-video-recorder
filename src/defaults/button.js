// eslint-disable-next-line import-x/no-named-as-default
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => props.backgroundColor ?? "white"};
  color: ${(props) => props.color ?? "black"};
  border-radius: 4px;
  height: 40px;
  padding: 0px 18px;
  border: none;
  margin: -8px;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  :hover {
    background: #eee;
  }
`;

export default Button;
