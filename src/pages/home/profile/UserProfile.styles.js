import styled from 'styled-components';
import {v} from "../../../styles/variables";

export const UserProfileLayout = styled.div`
  padding: ${v.xxlSpacing} ${v.xxlSpacing} 0 ${v.xxlSpacing};
`;

export const UserProfileInfo = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  color: #000000;
  border-bottom: 3px solid #3f88c5;
`;

export const GeneralInfoWrapper = styled.div`
  margin-top: 20px;
  border: 1px solid #3f88c5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 320px;
`;

export const GIInfoTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 47px;
  text-align: center;
  border-bottom: 2px solid #3f88c5;
`;


export const GIInfoTitleSmall = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 25px;
  text-align: left;
  border-bottom: 2px solid #3f88c5;
`;
export const GIInfoContainer = styled.div``;

export const GIWImage = styled.img`
  position: absolute;
  left: 55px;
  top: 55px;
`;
