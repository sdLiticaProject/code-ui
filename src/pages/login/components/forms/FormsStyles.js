import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const NavLinkWrapper = styled.div`
  margin-bottom: 30px;
`;

export const LoadIndicator = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 15px;
  display: inline-block;
  font-size: 10px;
  text-indent: -9999em;
  border-top: 3px solid #444;
  border-right: 3px solid #444;
  border-bottom: 3px solid #444;
  border-left: 3px solid #00b7db;
  animation: ${rotate} 0.8s infinite linear;
  border-top-color: #e4e9eb;
  border-right-color: #e4e9eb;
  border-bottom-color: #e4e9eb;
  border-left-color: #87c6f8;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0px;
  z-index: 99;
  margin-top: 20px;
  margin-left: 20px;

  ${({ tab }) => (tab === '/news' || tab === 'unknown') && `border-left-color: green !important;`};
`;

const InputFormWrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 5px;
  width: 100%;

  & input {
    font-family: sans-serif;
    width: 70%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.1rem;
    color: #9b9b9b;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: red;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
      padding-bottom: 6px;
      border-width: 3px;
      border-image: linear-gradient(to right, #2196f3, #bbdefb);
      border-image-slice: 1;
    }

    &:required,
    &:invalid {
      box-shadow: none;
    }
  }

  & label {
    font-size: 1rem;
    color: #9b9b9b;
    font-family: sans-serif;
    position: absolute;
    bottom: 40px;
  }
`;

const MyButton = styled.button`
  background-color: #87c6f8;
  cursor: pointer;
  user-select: none;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 6px;
  color: white;
  display: block;
  width: 230px;
  margin: 5% auto;
  font-family: sans-serif;
  font-size: 18px;
  text-align: center;
  height: 40px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 4px 6px;
  text-decoration: none;
  
  &:hover,
  &:focus {
    border-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.3);
    outline: 0 none;
    background-color: #3F88C5;
  }
`;

const Error = styled.text`
  color: #8b0000;
  font-size: 0.8rem;
  font-family: sans-serife;
  text-decoration: none;
  position: absolute;
  right: 0px;
  top: 10px;
  padding-right: 67px;

  @media (max-width: 500px) {
    padding-right: 60px;
  }
`;

const Link = styled.a`
  color: #9b9b9b;
  text-decoration: none;
  position: absolute;
  padding-right: 67px;
  right: 0;
  font-family: sans-serife;

  @media (max-width: 500px) {
    padding-right: 60px;
  }
`;

const Transfer = styled.a`
  position: absolute;
  left: 176px;
  color: #3eacdc;
  text-decoration: none;
  font-family: sans-serife;

  @media (max-width: 500px) {
    left: 150px;
  }
`;

export { MyButton, InputFormWrapper, Link, Error, Transfer };
