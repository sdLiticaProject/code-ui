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
import {EXPLORER, GUIDES, HOME, PAGE_USER_DASHBOARD} from "../../../constants/routes";
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
                        <ButtonBox to={HOME}>LOAD YOU DATA</ButtonBox>
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
                            Guide 1
                        </LinksGuide>
                        <LinksGuide to={GUIDES + "/2"} styled={{}}>
                            Guide 2
                        </LinksGuide>
                        <LinksGuide to={GUIDES + "/3"} styled={{}}>
                            Guide 3
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