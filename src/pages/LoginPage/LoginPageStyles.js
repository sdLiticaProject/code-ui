import styled, {keyframes} from "styled-components";


const LoginWrapper = styled.div`
  position:relative;
  box-sizing: border-box;
  padding-top:10%;
  width:  100%;
  height: 100vh;
  background-color: #E3ECF4;

  @media (max-height: 500px) {
    height: 150vh;
  } 
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
  background: white;
  width:450px;
  height: 450px;
  border-radius: 10px;
  margin: auto;
  padding:auto;

  @media (max-width: 500px) {
    width: 100%;
    top:50px;
    border-radius: 0px;
  }

`;

const Text = styled.p`
  font-size: 1.5rem;
  color: #3eacdc;
  font-weight:bold;
  font-family: sans-serif;
  position:relative;
  bottom:50px;
`;


export { LoginWrapper, LoginFormWrapper, BackImage, Logo, CloudWrapper, Text};
