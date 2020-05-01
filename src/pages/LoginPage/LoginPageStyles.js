import styled, {keyframes} from "styled-components";


const LoginWrapper = styled.div`
  box-sizing: border-box;
  padding-top:10%;
  width:  100%;
  height: 100hr;
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

const Form_group = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
`;
const Button = styled.button`
  background-color: #FFFFFF;
  border: 1px solid #9b9b9b;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 4px;
  color: #555555;
  display:block;
  width:30%;
  margin: 5% auto;
  font-family: sans-serif;
  font-size: 14px;
  text-align:center;
  height: 40px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 4px 6px;
  vertical-align: middle;
  text-decoration:none;

  &:hover,&:focus {
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.3);
    outline: 0 none;
  }
`;

const Input = styled.input`
  font-family: sans-serif;
  width: 70%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: #9b9b9b;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: #9b9b9b;
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
`;


const Label = styled.label`
font-size: 1rem;
color: #9b9b9b;
font-family: sans-serif;
position:absolute;
bottom:40px;

`;


export { LoginWrapper, LoginFormWrapper, Input, Button, BackImage, Logo, CloudWrapper, Form_group,Label };
