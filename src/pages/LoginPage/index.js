import React from 'react';
import { LOGIN, REGISTR, RECOVERY } from "../../constants/routes";
import { Route, Switch} from "react-router-dom";
import { LoginWrapper, LoginFormWrapper, BackImage, Logo, CloudWrapper, Text } from "./LoginPageStyles";
import LoginForm from '../../forms/LoginForm';
import RegistrForm from '../../forms/RegistrForm';
import PasswordRecoveryForm from '../../forms/PasswordRecoveryForm';
function AuthenticationPage(props) {

  return(
    <LoginWrapper>
      <CloudWrapper>
        <BackImage src={process.env.PUBLIC_URL + '/image/cloud-2.png'} timeAnimation = "100s" />
        <BackImage src={process.env.PUBLIC_URL + '/image/cloud.png'} timeAnimation = "70s"/>
      </CloudWrapper>
      <LoginFormWrapper>
        <Logo src={process.env.PUBLIC_URL + '/image/logo.png'}/>
        <Text>Welcome to sdLitica</Text>
        <Switch>
          <Route path={LOGIN} component={LoginForm}/>
          <Route path={REGISTR} component={RegistrForm}/>
          <Route path={RECOVERY} component={PasswordRecoveryForm}/>
        </Switch>
      </LoginFormWrapper>
    </LoginWrapper>
  )
}

export default AuthenticationPage;