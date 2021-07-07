import React from 'react';
import { Link } from 'react-router-dom';
import * as HpS from '../HomePage.styles';
import * as UpS from './UserProfile.styles';
import grp from '../../../image/grp.png';
import { PAGE_USER_HISTORY } from '../../../constants/routes';

const UserProfile = (): JSX.Element => {
  return (
    <>
      <UpS.UserProfileInfo>My profile</UpS.UserProfileInfo>
      <UpS.GeneralInfoWrapper>
        <UpS.GIWImage src={grp} />
        <UpS.GIInfoContainer>
          <UpS.GIInfoTitle>General information</UpS.GIInfoTitle>
          <HpS.ColWrapper>
            <HpS.Col style={{ marginRight: '30px' }}>
              <HpS.InnerCol>
                <HpS.Row>First name:</HpS.Row>
                <HpS.Row>Last name:</HpS.Row>
                <HpS.Row>Role:</HpS.Row>
                <HpS.Row>Company:</HpS.Row>
              </HpS.InnerCol>
              <HpS.InnerCol style={{ marginLeft: '30px' }}>
                <HpS.Row>Cave</HpS.Row>
                <HpS.Row>Johnson</HpS.Row>
                <HpS.Row>Founder</HpS.Row>
                <HpS.Row>Oracle</HpS.Row>
              </HpS.InnerCol>
            </HpS.Col>
            <HpS.Col>
              <HpS.InnerCol style={{ borderLeft: `1px solid #3f88c5`, paddingLeft: `20px` }}>
                <HpS.Row>User name:</HpS.Row>
                <HpS.Row>Number of columns:</HpS.Row>
                <HpS.Row>
                  <Link to={PAGE_USER_HISTORY}>Analytics history...</Link>
                </HpS.Row>
                <HpS.Row>
                  Download as <span>CSV</span> / <span>JSON</span> ...
                </HpS.Row>
              </HpS.InnerCol>
              <HpS.InnerCol style={{ marginLeft: '30px' }}>
                <HpS.Row>cave.john</HpS.Row>
                <HpS.Row>16</HpS.Row>
                <HpS.Row />
                <HpS.Row />
              </HpS.InnerCol>
            </HpS.Col>
          </HpS.ColWrapper>
        </UpS.GIInfoContainer>
      </UpS.GeneralInfoWrapper>
      <UpS.GeneralInfoWrapper>
        <UpS.GIInfoContainer>
          <UpS.GIInfoTitle>API access keys</UpS.GIInfoTitle>
        </UpS.GIInfoContainer>
      </UpS.GeneralInfoWrapper>
    </>
  );
};

export default UserProfile;
