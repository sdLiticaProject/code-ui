import React from 'react';
import {useSelector} from 'react-redux';
import UserPage from './byRole/user/UserPage';

const HomePage = () => {
  const role =
    useSelector(state => state.user && state.user.user && state.user.user.roleId) || null;
  switch (role) {
    case 0:
    case 2:
      return <UserPage />;
    default:
      return null;
  }
};

export default HomePage;
