import React from 'react';
import {useState} from 'react';
import { useForm } from "react-hook-form";

import {loginUser} from '../../actions/loginActions'
import {useActions} from '../../hooks/useAction'
import { LoginWrapper, Button, LoginFormWrapper, BackImage, Logo, CloudWrapper, InputFormWrapper, Text, Link, Error } from "./LoginPageStyles";

function AuthenticationPage() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {handleSubmit, register, errors}=useForm();

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
        <form onSubmit={handleSubmit(submit)}>
          <InputFormWrapper>
            <label for="login">Email</label>
            <input
              ref = {register({
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              })}
              name="login"
              onChange={e => setLogin(e.target.value)}
            />
            <Error>{errors.login && errors.login.message}</Error> 
          </InputFormWrapper>
          <br/> 
          <InputFormWrapper>
            <label for="password">Password</label> 
            <input
              ref = {register({
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._]{6,15}$/i,
                  message: "invalid password"
                }
              })}
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Error>{errors.password && errors.password.message}</Error>
          </InputFormWrapper>
          <Link href="#">Forgot password</Link>
          <br/>
          <Button type="submit">Log in</Button>
        </form>
      </LoginFormWrapper>
    </LoginWrapper>
  )
}


export default AuthenticationPage;