import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import useActions from '../../../../hooks/useAction';
import { HOME, LOGIN } from '../../../../constants/routes';
import { loginUser, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS } from '../../../../actions/loginActions';
import { Button, InputFormWrapper, LoadIndicator, NavLinkWrapper, Error, Transfer, FormWrapper } from './FormsStyles';

function LoginForm() {
  const { handleSubmit, register, errors } = useForm();
  const [submitAction] = useActions([loginUser]);
  const history = useHistory();
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const isLoginLoading = useSelector((state) => state.login.type) === LOGIN_LOADING;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const submit = (data) => {
    if (data.email !== '' && data.password !== '') {
      submitAction(data.email, data.password).then((e) => {
        if (e.type && e.type === LOGIN_FAIL) {
          setSnackMessage(e.message);
          setSnackbarOpen(true);
        } else if (e.type && e.type === LOGIN_SUCCESS) {
          history.push(HOME);
        }
      });
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label htmlFor="email">Email</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
          id="email"
          name="email"
        />
        <Error>{errors.email && errors.email.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="password">Password</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._]{3,15}$/i,
              message: 'invalid password',
            },
          })}
          type="password"
          name="password"
          id="password"
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <br />
      <Button type="submit">Log in</Button>
      {isLoginLoading && <LoadIndicator />}
      <NavLinkWrapper>
        <NavLink to={`${LOGIN}?tab=reg`}>
          <Transfer>Need an account?</Transfer>
        </NavLink>
      </NavLinkWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </FormWrapper>
  );
}

export default LoginForm;
