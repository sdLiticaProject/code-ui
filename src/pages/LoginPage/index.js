import React from 'react';
import {useState} from 'react';

import {loginUser} from '../../actions/loginActions'
import {useActions} from '../../hooks/useAction'
import { LoginWrapper, Button, LoginFormWrapper, BackImage, Logo, CloudWrapper, InputFormWrapper, Text, Link } from "./LoginPageStyles";

function AuthenticationPage() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  //Alternative bindActionCreators
  const [submitAction] = useActions([loginUser]);
  
  const submit = () => {
    if(login!==""&&password!==""){
      submitAction(login,password)
    }
  }

  return(
    <LoginWrapper>
        <CloudWrapper>
          <BackImage src={process.env.PUBLIC_URL + '/image/cloud-2.png'} timeAnimation = "100s" />
          <BackImage src={process.env.PUBLIC_URL + '/image/cloud.png'} timeAnimation = "70s"/>
        </CloudWrapper>
        <LoginFormWrapper>
          <Logo src={process.env.PUBLIC_URL + '/image/logo.png'}/>
          <Text>Welcome to sdLitica</Text>
          <InputFormWrapper>
            <label for="login">Username</label>
            <input
            required name="login"
            onChange={e => setLogin(e.target.value)}
            />
          </InputFormWrapper>
          <br/> 
          <InputFormWrapper>
            <label for="password">Password</label> 
            <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            />
          </InputFormWrapper>
          <Link href="#">Forgot password</Link>
          <br/>
          <Button onClick={submit}>Log in</Button>
      </LoginFormWrapper>
    </LoginWrapper>
  )
}


export default AuthenticationPage;