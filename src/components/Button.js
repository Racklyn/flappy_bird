import styled from "styled-components";

const Button = styled.button`
  background-color: #FFB868;
  border: none;
  width: 350px;
  font-size: 24px;
  border-radius: 4px;
  padding: 16px;
  cursor: ${(props) => !props.disabled && 'pointer'};

  :hover {
    opacity: ${(props) => !props.disabled && 0.9};
    color: ${(props) => !props.disabled && '#335'};
  }
`

export default Button;