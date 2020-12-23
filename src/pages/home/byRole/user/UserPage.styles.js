import styled from 'styled-components';
import logo from '../resources/logo2.png';

const HEADER_HEIGHT = '100px';
const FOOTER_HEIGHT = '100px';

export const HeaderWrapper = styled.header`
  background: #3f88c5;
  height: ${HEADER_HEIGHT};
  display: flex;
  padding: 0 40px 0 40px;
  align-items: center;
`;

export const MainWrapper = styled.main`
  height: calc(100% - ${HEADER_HEIGHT} - 20px - ${FOOTER_HEIGHT});
  padding: 0px 0px 20px 0px;
  overflow-y: auto;
`;

export const LogoWrapper = styled.div`
  /* width: 500px;
  display: flex;
  height: 100%;
  margin-left: -40px;
  padding-left: 20px;
  box-shadow: rgb(63 136 197) -256px 10px 70px -46px inset;
  background: radial-gradient(at 29% 50%, #ffffff, #3f88c5);
  align-items: center;
  justify-content: flex-start; */
  margin-top: -90px;
  margin-bottom: -90px;
  background: radial-gradient(closest-side at 50% 50%, #ffffff, #3f88c5);
`;
export const Logo = styled.div`
  background-size: 50%;
  background-position: 50% 49%;
  background-repeat: no-repeat;
  width: 300px;
  height: ${HEADER_HEIGHT};
  background-image: url(${logo});
`;

export const MenuWrapper = styled.div`
  margin-left: auto;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  padding: 8px 12px 8px 12px;
  height: 60px;
  user-select: none;
  cursor: pointer;
`;

export const InfoBlocksWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  > div {
    margin-right: 30px;
  }

  > div:last-child {
    margin-right: unset;
  }
`;

export const InfoBlock = styled.div`
  padding: 8px 11px 8px 11px;
  border: 1px solid #3f88c5;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 300px;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    /* identical to box height */

    color: #3f88c5;
  }
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  padding: 50px 150px 0 150px;
`;

export const UserInfo = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  color: #000000;
`;

export const MenuWrapperLogo = styled.svg`
  height: 35px;
  position: relative;
  top: 3px;
  fill: #ffffff;
`;

export const MenuWrapperText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  color: #ffffff;
  line-height: 42px;
  margin-left: 20px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  > div {
    margin-right: 50px;
  }
  > div:last-child {
    margin-right: unset;
  }
  position: fixed;
  width: 100%;
  padding-top: 20px;
  z-index: 20;
  background: #ffffff;
`;

export const Tab = styled.div`
  font-family: Roboto;
  font-style: normal;
  cursor: pointer;
  user-select: none;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  ${({isActive}) =>
    isActive &&
    `padding-bottom: 5px; border-bottom: 3px solid #3F88C5;
`};
`;

export const FooterWrapper = styled.footer`
  background: #3f88c5;
  height: ${FOOTER_HEIGHT};
  display: flex;
  justify-content: center;
`;

export const FooterContent = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 9px;
  color: #ffffff;
  text-align: center;
`;
