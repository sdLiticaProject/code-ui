import styled, {keyframes} from "styled-components";


const LoginWrapper = styled.div`
  box-sizing: border-box;
  padding-top:10%;
  width:  100%;
  height: 100vh;
  background-color: #E3ECF4;
`;

const move = keyframes`
  from {
    left: -80%;
  }
  to {
    left: 100%;
  }
`;

const CloudWrapper = styled.div`
  z-index:0;
  width:100%;
  height: 300px;
  overflow:hidden;
  position: absolute;
  bottom:0;
`;

const BackImage = styled.img `
  height: 300px;
  position: absolute;
  left: -80%;
  animation: ${move} ${props => props.timeAnimation} linear infinite;
`;

const Logo = styled.img `
  width:230px;
  position: relative;
  top:-65px;
`;





const LoginFormWrapper = styled.div`
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 7px -10px rgba(0, 0, 0, 0.4);
  text-align:center;
  margin: auto;
  background: white;
  width:500px;
  height: 550px;
  border-radius: 10px;
`;

const Input = styled.input``;

const Button = styled.button`
  background: gray;
`;

export { LoginWrapper, LoginFormWrapper, Input, Button, BackImage, Logo, CloudWrapper };
