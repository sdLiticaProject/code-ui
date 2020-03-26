import React from 'react';
import {useState} from 'react';

import {loginUser} from '../../actions/loginActions'
import {useActions} from '../../hooks/useAction'
import { LoginWrapper, Input, Button, LoginFormWrapper, BackImage, Logo, CloudWrapper } from "./LoginPageStyles";

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
        <br/>
        <Input
          placeholder="Write login"
          onChange={e => setLogin(e.target.value)}
        />
        <br/>
        <Input
          placeholder="Write password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={submit}>check</Button>
        </LoginFormWrapper>
      </LoginWrapper>
  )
}


export default AuthenticationPage;