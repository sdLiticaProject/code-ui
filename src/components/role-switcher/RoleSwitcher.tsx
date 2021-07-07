import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from '../../pages/home/HomePage';
import { RootState } from '../../store/createStore';

const RoleSwitcher = (): React.ReactNode => {
  const role = useSelector((state: RootState) => state.user && state.user.user && state.user.user.roleId) || null;
  switch (role) {
    case 0:
    case 2:
      return <HomePage />;
    default:
      return null;
  }
};

export default RoleSwitcher;
