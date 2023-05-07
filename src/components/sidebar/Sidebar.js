import React, {useCallback, useState} from 'react';
import Cookies from 'js-cookie';

import {
  AiFillFolder,
  AiFillHome,
  AiOutlineLeft,
  AiOutlineSetting
} from 'react-icons/ai';
import {MdLogout, MdSpaceDashboard} from 'react-icons/md';

import {useHistory, useLocation} from 'react-router-dom';
import { logoSVG } from '../../assets';
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSidebar,
  SSidebarButton,
} from './styles';
import {CiImport, RiBarChartBoxFill} from "react-icons/all";
import {AppDispatch} from "../../store/createStore";
import {useDispatch} from "react-redux";
import {LOGOUT_SUCCESS, logoutUser} from "../../actions/loginActions";
import {del} from "../../actions/userActions";
import {EXPLORER, HOME, LOGIN, PAGE_USER_BUCKETS, PAGE_USER_DASHBOARD} from "../../constants/routes";



const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation();

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
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <SLogo>
        <img src={logoSVG} alt="logo" style={!sidebarOpen ? {height: "64%", paddingTop: 10} : {}}/>
      </SLogo>
      {linksArray.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && (
              <>
                <SLinkLabel>{label}</SLinkLabel>
                {/* if notifications are at 0 or null, do not display */}
                {!!notification && <SLinkNotification>{notification}</SLinkNotification>}
              </>
            )}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label }) => (
        <SLinkContainer key={label} onClick={logout}>
          <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
    </SSidebar>
  );
};

const linksArray = [
  {
    label: 'Home',
    icon: <AiFillHome />,
    to: HOME,
  },
  {
    label: 'Dashboards',
    icon: <MdSpaceDashboard />,
    to: PAGE_USER_DASHBOARD,
  },
  {
    label: 'Load data',
    icon: <CiImport />,
    to: PAGE_USER_DASHBOARD,
  },
  {
    label: 'Data explorer',
    icon: <RiBarChartBoxFill />,
    to: EXPLORER,
  },
  {
    label: 'Buckets',
    icon: <AiFillFolder />,
    to: PAGE_USER_BUCKETS,
  },
];

const secondaryLinksArray = [
  {
    label: 'Logout',
    icon: <MdLogout />,
  },
];

export default Sidebar;
