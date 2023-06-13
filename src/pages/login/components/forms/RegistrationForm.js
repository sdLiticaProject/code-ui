import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, HOME } from '../../../../constants/routes';
import { registerUser, loginUser, REGISTER_SUCCESS, LOGIN_SUCCESS, REGISTER_LOADING } from '../../../../actions/loginActions';
import useActions from '../../../../hooks/useAction';
import { MyButton, InputFormWrapper, Error, Transfer, NavLinkWrapper, FormWrapper, LoadIndicator } from './FormsStyles';

function RegistrationForm() {
  const { handleSubmit, register, errors, getValues } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  // Alternative bindActionCreators
  const [submitAction] = useActions([registerUser]);

  const isRegisterSuccess = useSelector((state) => state.login.type) === REGISTER_SUCCESS;
  const isRegisterLoading = useSelector((state) => state.login.type) === REGISTER_LOADING;

  useEffect(() => {
    if (isRegisterSuccess) {
      dispatch(loginUser(getValues('login'), getValues('password'))).then((e) => {
        if (e.type && e.type === LOGIN_SUCCESS) {
          history.push(HOME);
        }
      });
    }
  }, [isRegisterSuccess]);

  const submit = (data) => {
    if (data.login !== '' && data.password !== '') {
      submitAction(data.login, data.password, data.firstName, data.lastName);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label htmlFor="firstName">Enter your first name</label>
        <input
          ref={register({
            required: 'required',
          })}
          id="firstName"
          name="firstame"
        />
        <Error>{errors.firstName && errors.firstName.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="lastName">Enter your last name</label>
        <input
          ref={register({
            required: 'required',
          })}
          name="lastName"
        />
        <Error>{errors.lastName && errors.lastName.message}</Error>
      </InputFormWrapper>
      <br /> <br />
      <InputFormWrapper>
        <label htmlFor="login">Enter your email</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
          name="login"
        />
        <Error>{errors.login && errors.login.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="password">Create the password(6-15 symbols)</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._]{6,15}$/i,
              message: 'invalid password',
            },
          })}
          id="password"
          type="password"
          name="password"
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <br />
      {isRegisterLoading && <LoadIndicator />}
      <MyButton type="submit">Sign up</MyButton>
      <NavLinkWrapper>
        <NavLink to={LOGIN}>
          <Transfer>Have an account?</Transfer>
        </NavLink>
      </NavLinkWrapper>
    </FormWrapper>
  );
}

export default RegistrationForm;
