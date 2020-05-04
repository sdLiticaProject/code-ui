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
    border-image: linear-gradient(to right, #2196f3,#bbdefb);
    border-image-slice: 1;
  }

  &:required,&:invalid { 
    box-shadow:none;
   }
  }

  & label {
    font-size: 1rem;
    color: #9b9b9b;
    font-family: sans-serif;
    position:absolute;
    bottom:40px;
  }
`;
const Button = styled.button`
  background-color: #87c6f8;
  border: 1px solid #FFFFFF;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 6px;
  color: white;
  display:block;
  width:230px;
  margin: 5% auto;
  font-family: sans-serif;
  font-size: 18px;
  text-align:center;
  height: 40px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 4px 6px;
  vertical-align: middle;
  text-decoration:none;

  &:hover,&:focus {
    border-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.3);
    outline: 0 none;
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

const Error = styled.text`
  color: #8B0000;
  font-size:0.8rem;
  font-family:sans-serife;
  text-decoration:none;
  position:absolute;
  right:0px;
  top:10px;
  padding-right:67px;

  @media (max-width: 500px) {
    padding-right: 60px;
}
`;

const Link = styled.a`
  color: #9b9b9b;
  text-decoration:none;
  position:absolute;
  padding-right: 67px;
  right: 0;
  font-family:sans-serife;

  @media (max-width: 500px) {
    padding-right: 60px;
}
`;

export { LoginWrapper, LoginFormWrapper, Button, BackImage, Logo, CloudWrapper, InputFormWrapper, Text, Link, Error };
