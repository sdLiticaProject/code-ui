import {Link} from "react-router-dom";
import styled from "styled-components";

import {btnReset, v} from "../../styles/variables";

export const SSidebar = styled.div`
  width: ${({isOpen}) => (!isOpen ? `auto` : v.sidebarWidth)};
  background: ${({theme}) => '#3F88C5'};
  height: 100vh;
  padding: ${v.mdSpacing};
  color: white;
  transition: all 0.5s ease 0s;


position: relative;
`;

export const SSidebarButton = styled.button`
  ${btnReset};
  position: absolute;
  top: ${v.mdSpacing};
  right: ${({isOpen}) => (isOpen ? `-16px` : `-40px`)};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 0 4px ${({theme}) => theme.bg3}, 0 0 7px ${({theme}) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  background: white;

  transform: ${({isOpen}) => (!isOpen ? `rotate(180deg)` : `initial`)};
`;

export const SLogo = styled.div`
  height: 64px;
  
  img {
    max-width: 100%;
    height: 84%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  cursor: pointer;
  background-color: #144F80;

  margin: -16px -16px ${v.lgSpacing} -16px;
`;

export const SDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({theme}) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
  background: ${({theme, isActive}) => (!isActive ? `transparent` : theme.bg3)};
  border-radius: ${v.borderRadius};
  margin: 8px 0;

  :hover {
    box-shadow: inset 0 0 0 1px ${({theme}) => theme.bg3};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;

  svg {
    font-size: 20px;
  }
`;

export const SLinkLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.smSpacing};
`;

export const SLinkNotification = styled.div`
  font-size: 14px;
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({theme}) => theme.primary};
  color: white;

  margin-right: ${v.mdSpacing};
`;