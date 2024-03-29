import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import * as Sc from "../HomePage.styles";
import React from "react";
import {
    ButtonBox,
    CircleNumber,
    ImageBox,
    InlineDiv,
    LargePlot,
    LineDivider, LinksGuide,
    MediumPlot, NavbarGuides, NavbarLinkContainer,
    SmallPlot, TitleBox,
    TitleInfo
} from "./Main.styles";
import {EXPLORER, GUIDES, HOME, LOADDATA, PAGE_USER_DASHBOARD} from "../../../constants/routes";
import DashboardPanel from "./DashboardPanel";
import Breadcrumb from "../../../components/BreadCrumb";
import {Version} from "./DashboardPanel.styles";
import {APP_VERSION} from "../../../App";
import {guideImg1, guideImg2, guideImg3} from "../../../assets";


const Main = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <Sc.ContentWrapper>
            <TitleInfo>
                Getting Started
            </TitleInfo>
            <InlineDiv>
                <LargePlot>
                    <InlineDiv>
                    <SmallPlot>
                        <CircleNumber>1</CircleNumber>
                        <ImageBox src={guideImg1}/>
                        <LineDivider/>
                        <ButtonBox to={LOADDATA}>LOAD YOU DATA</ButtonBox>
                    </SmallPlot>
                    <SmallPlot>
                        <CircleNumber>2</CircleNumber>
                        <ImageBox src={guideImg2}/>
                        <LineDivider/>
                        <ButtonBox to={EXPLORER}>ANALYZE</ButtonBox>
                    </SmallPlot>
                    <SmallPlot>
                        <CircleNumber>3</CircleNumber>
                        <ImageBox src={guideImg3}/>
                        <LineDivider/>
                        <ButtonBox to={PAGE_USER_DASHBOARD}>BUILD A DASHBOARD</ButtonBox>
                    </SmallPlot>
                    </InlineDiv>
                </LargePlot>
                <MediumPlot>
                    <DashboardPanel/>
                    <LineDivider style={{width: "445px"}}/>
                    <Version>sdLitica v{APP_VERSION}</Version>
                </MediumPlot>
            </InlineDiv>
            <InlineDiv>
                <NavbarGuides>
                    <TitleBox>Some Handy Guides and Tutorials</TitleBox>
                    <NavbarLinkContainer>
                        <LinksGuide to={GUIDES + "/1"} styled={{}}>
                            How to use the analytical platform?
                        </LinksGuide>
                        <LinksGuide to={GUIDES + "/2"} styled={{}}>
                            How do I upload data to the system?
                        </LinksGuide>
                        <LinksGuide to={GUIDES + "/3"} styled={{}}>
                            How does the data explorer work?
                        </LinksGuide>
                    </NavbarLinkContainer>

                    {/*<LinksGuid/>/!**/}
                    {/*<LinksGuid/>*!/*/}
                </NavbarGuides>
            </InlineDiv>
        </Sc.ContentWrapper>
    );
};

export default Main;