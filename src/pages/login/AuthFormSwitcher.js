import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import { LoginWrapper, LoginFormWrapper, BackImage, Logo, CloudWrapper, Text } from './AuthFormSwitcher.styles';
import { LOGIN } from '../../constants/routes';

function AuthenticationPage({ location }) {
  const params = new URLSearchParams(location.search).get('tab');

  if (params == null) {
    return (
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
        </CloudWrapper>
        <LoginFormWrapper>
          <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
          <Text>Welcome to sdLitica!</Text>
          <LoginForm />
        </LoginFormWrapper>
      </LoginWrapper>
    );
  }

  if (params === 'reg') {
    return (
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
        </CloudWrapper>
        <LoginFormWrapper>
          <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
          <Text>Welcome to sdLitica!</Text>
          <RegistrationForm />
        </LoginFormWrapper>
      </LoginWrapper>
    );
  }

  return <Redirect to={LOGIN} />;
}

export default AuthenticationPage;
