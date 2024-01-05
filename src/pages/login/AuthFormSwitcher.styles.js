import styled, { keyframes } from 'styled-components';

const LoginWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-top: 10%;
  width: 100%;
  height: 100vh;
  background-color: #e3ecf4;

  @media (max-height: 500px) {
    height: 150vh;
  }
`;

const move = keyframes`
  from {
    left: -30%;
  }
  to {
    left: 100%;
  }
`;

const CloudWrapper = styled.div`
  z-index: 0;
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
`;

const BackImage = styled.img`
  height: 300px;
  position: absolute;
  left: -80%;
  animation: ${move} ${(props) => props.timeAnimation} linear infinite;
`;

const Logo = styled.img`
  width: 230px;
  position: relative;
  top: -65px;
`;

const LoginFormWrapper = styled.div`
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 7px -10px rgba(0, 0, 0, 0.4);
  text-align: center;
  background: white;
  width: 450px;
  border-radius: 10px;
  margin: auto;
  padding: auto;

  @media (max-width: 500px) {
    width: 100%;
    top: 50px;
    border-radius: 0px;
  }
`;

const Text = styled.p`
  font-size: 1.5rem;
  color: #3eacdc;
  font-weight: bold;
  font-family: sans-serif;
  position: relative;
  bottom: 50px;
`;

const Button = styled.button`
  background-color: #87c6f8;
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
  vertical-align: middle;
  text-decoration: none;

  &:hover,
  &:focus {
    border-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.3);
    outline: 0 none;
  }
`;

export { LoginWrapper, LoginFormWrapper, BackImage, Logo, CloudWrapper, Text, Button };
