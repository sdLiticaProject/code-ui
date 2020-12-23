import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import {LOGIN} from '../../../constants/routes';
import {del} from '../../../actions/userActions';
import {logoutUser, LOGOUT_SUCCESS} from '../../../actions/loginActions';

function AdminPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    dispatch(logoutUser()).then(e => {
      if (e.type && e.type === LOGOUT_SUCCESS) {
        Cookies.remove('token');
        dispatch(del());
        history.push(LOGIN);
      }
    });
  };

  return (
    <div>
      <h1>Page from Admin</h1>
      <button
        type="button"
        style={{height: '20px'}}
        onClick={() => signOut()}
        variant="contained"
        color="primary">
        Logout
      </button>
    </div>
  );
}

export default AdminPage;
