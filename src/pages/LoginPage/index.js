import React from "react";
import { Route, Switch } from "react-router-dom";
import { LOGIN, REGISTRATION, RECOVERY } from "../../constants/routes";
import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Text,
} from "./LoginPageStyles";
import LoginForm from "../../forms/LoginForm";
import RegistrationForm from "../../forms/RegistrationForm";
import PasswordRecoveryForm from "../../forms/PasswordRecoveryForm";
import cloud2 from "../../image/cloud-2.png";
import cloud from "../../image/cloud.png";
import logo from "../../image/logo.png";

function AuthenticationPage() {
  return (
    <LoginWrapper>
      <CloudWrapper>
        <BackImage src={cloud2} timeAnimation="100s" />
        <BackImage src={cloud} timeAnimation="70s" />
      </CloudWrapper>
      <LoginFormWrapper>
        <Logo src={logo} />
        <Text>Welcome to sdLitica</Text>
        <Switch>
          <Route path={LOGIN} component={LoginForm} />
          <Route path={REGISTRATION} component={RegistrationForm} />
          <Route path={RECOVERY} component={PasswordRecoveryForm} />
        </Switch>
      </LoginFormWrapper>
    </LoginWrapper>
  );
}

export default AuthenticationPage;
