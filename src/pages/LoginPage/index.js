import React from 'react';
import {useState} from 'react';

import {loginUser} from '../../actions/loginActions'
import {useActions} from '../../hooks/useAction'
import { LoginWrapper, Input, Button, LoginFormWrapper, BackImage, Logo, CloudWrapper, Label,Form_group,Link } from "./LoginPageStyles";

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
          <Form_group>
        <   Label for="login">Login</Label>
            <Input
            required name="login"
            onChange={e => setLogin(e.target.value)}
            />
          </Form_group>
          <br/> 
          <Form_group>
            <Label for="password">Password</Label> 
            <Input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            />
          </Form_group>
          <br/>
          <Button onClick={submit}>Log in</Button>
      </LoginFormWrapper>
    </LoginWrapper>
  )
}


export default AuthenticationPage;