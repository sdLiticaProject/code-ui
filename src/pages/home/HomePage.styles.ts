import styled from 'styled-components';
import logo from '../../assets/resources/logo2.png';

const HEADER_HEIGHT = '64px';
const FOOTER_HEIGHT = '74px';

export const HeaderWrapper = styled.header`
  background: #C0D4EC;
  height: ${HEADER_HEIGHT};
  display: flex;
  padding: 0 40px 0 40px;
  align-items: center;
`;

export const MainWrapper = styled.main`
  height: calc(100% - ${HEADER_HEIGHT} - 20px);
  padding: 0px 0px 20px 0px;
  overflow-y: auto;
  align-items: center;
`;

export const LogoGradient = styled.div`
  width: 300px;
  height: 300px;
  margin-top: -130px;
  margin-bottom: -90px;
  background: radial-gradient(circle closest-side at 45% 60%, #ffffff, #3f88c5);
`;

export const LogoImg = styled.div`
  width: 240px;
  height: 240px;
  background-image: url(${logo});
  background-size: 50%;
  background-position: 60% 85%;
  background-repeat: no-repeat;
  background-color: white;
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
  border: 1px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  padding: 8px 12px 8px 12px;
  width: 200px;
  height: 60px;
  user-select: none;
  cursor: pointer;
`;

export const InfoBlocksWrapper = styled.div`
  border: red;
  display: flex;
  margin-top: 20px;

  flex-wrap: wrap;
  justify-content: flex-start;

  a {
    text-decoration: none;
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
    font-family: Roboto,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    color: #000000;
  }

  h3 {
    font-family: Roboto,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    /* identical to box height */

    color: #3f88c5;
  }
`;

export const ContentWrapper = styled.div`
  padding: 30px 30px 0 30px;
`;

export const UserInfo = styled.div`
  font-family: Roboto,serif;
  font-size: 36px;
  font-weight: 700;
  font-style: normal;
  line-height: 42px;

  color: #000000;
`;

export const MenuWrapperLogo = styled.img`
  height: 45px;
  position: relative;
  bottom: 2px;
  fill: #ffffff;
`;

export const MenuLogoWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  overflow: hidden;
`;

export const MenuLogoGradient = styled.div`
  width: 300px;
  height: 300px;
  margin-top: -130px;
  margin-bottom: -90;
  background: radial-gradient(circle closest-side at 45% 60%, #ffffff, #3f88c5);
`;

export const MenuLogoImage = styled.div`
  width: 240px;
  height: 240px;
  background-image: url(${logo});
  background-size: 60%;
  background-position: 60% 85%;
  background-repeat: no-repeat;
`;

export const MenuWrapperText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  color: black;
  line-height: 42px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
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

interface TabProps {
  readonly isActive?: boolean;
}

export const Tab = styled.div<TabProps>`
  font-family: Roboto;
  font-style: normal;
  cursor: pointer;
  user-select: none;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  ${({ isActive }) =>
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FooterLogo = styled.svg``;

export const FooterInfo = styled.div`
  margin-left: 8px;
  & div {
    line-height: 21px;
  }

  a {
    text-decoration: unset;
    color: white;
  }
`;

export const ColWrapper = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const Row = styled.div`
  padding-left: 5px;
  padding-top: 10px;
  padding-right: 5px;
`;

export const Form = styled.form``;

export const InputRow = styled.input`
  border: none;
  outline: none;
  background-color: #f2f2f2;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  &:focus {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
`;

export const Col = styled.div`
  display: flex;
`;

export const InnerCol = styled.div``;
