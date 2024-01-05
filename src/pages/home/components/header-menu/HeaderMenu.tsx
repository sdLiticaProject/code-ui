import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { LOGIN, PAGE_USER_PROFILE } from '../../../../constants/routes';
import { logoutUser, LOGOUT_SUCCESS } from '../../../../actions/loginActions';
import { del } from '../../../../actions/userActions';
import * as Sc from '../../HomePage.styles';
import { AppDispatch, RootState } from '../../../../store/createStore';
// @ts-ignore
import { profileIMG } from "../../../../assets";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: `#3f88c5`,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MenuWrapper = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state: RootState) => state.user.user);

  const logout = useCallback(() => {
    dispatch(logoutUser()).then((e) => {
      if (e.type && e.type === LOGOUT_SUCCESS) {
        Cookies.remove('token');
        dispatch(del());
        history.push(LOGIN);
      }
    });
  }, []);

  return (
    <>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem
          onClick={() => {
            handleClose();
            history.push(PAGE_USER_PROFILE);
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
      <Sc.MenuWrapper onClick={handleClick}>
        <Sc.MenuWrapperLogo src={profileIMG} />
        <Sc.MenuWrapperText>{user && `${user.firstName} ${user.lastName}`}</Sc.MenuWrapperText>
      </Sc.MenuWrapper>
    </>
  );
};

export default MenuWrapper;
