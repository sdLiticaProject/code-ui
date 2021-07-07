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
    // eslint-disable-next-line react/jsx-props-no-spreading
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
    // TODO: fix this way
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
        <Sc.MenuWrapperLogo viewBox="0 0 50 50">
          <path d="M25 1C11.767 1 1 11.767 1 25c0 7.091 3.094 13.472 8 17.869v.017l.348.3c.061.053.128.097.19.149a24.496 24.496 0 003.189 2.279c.085.051.172.099.257.148.557.324 1.126.629 1.71.908l.018.008a23.838 23.838 0 003.915 1.456l.075.021c.641.175 1.293.322 1.954.443l.185.033a24.17 24.17 0 001.939.262c.075.007.15.011.224.017.659.055 1.323.09 1.996.09s1.337-.035 1.996-.09c.075-.006.15-.01.224-.017.655-.06 1.301-.15 1.939-.262l.185-.033a23.451 23.451 0 001.954-.443l.075-.021a23.838 23.838 0 003.915-1.456l.018-.008a24.261 24.261 0 001.71-.908c.086-.05.172-.097.257-.148a24.123 24.123 0 001.487-.968c.124-.087.248-.174.371-.264.456-.334.9-.683 1.331-1.047.062-.052.129-.096.19-.149l.348-.3v-.017c4.906-4.398 8-10.778 8-17.869C49 11.767 38.233 1 25 1zm0 24c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3 2c6.065 0 11 4.935 11 11v3.958c-.042.035-.086.067-.128.102-.395.321-.8.626-1.214.918-.092.065-.182.132-.274.195-.447.305-.906.591-1.373.862l-.257.148a21.799 21.799 0 01-6.871 2.468l-.171.031a22.27 22.27 0 01-1.715.225c-.079.007-.159.012-.239.018-.583.045-1.169.075-1.758.075s-1.175-.03-1.758-.077l-.239-.018a21.789 21.789 0 01-1.886-.256 22.013 22.013 0 01-5.212-1.626l-.161-.073a21.799 21.799 0 01-1.755-.917c-.467-.27-.926-.557-1.373-.862-.093-.063-.183-.13-.274-.195a21.826 21.826 0 01-1.214-.918c-.042-.034-.086-.067-.128-.102V38c0-6.065 4.935-11 11-11h6zm13 13.076V38c0-6.271-4.464-11.519-10.38-12.735A9.996 9.996 0 0035 17c0-5.514-4.486-10-10-10s-10 4.486-10 10a9.996 9.996 0 004.38 8.265C13.464 26.481 9 31.729 9 38v2.076C5.284 36.135 3 30.831 3 25 3 12.869 12.869 3 25 3s22 9.869 22 22c0 5.831-2.284 11.135-6 15.076z" />
        </Sc.MenuWrapperLogo>
        <Sc.MenuWrapperText>{user && `${user.firstName} ${user.lastName}`}</Sc.MenuWrapperText>
      </Sc.MenuWrapper>
    </>
  );
};

export default MenuWrapper;
