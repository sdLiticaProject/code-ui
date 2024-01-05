import Layout from "../../../components/layout/Layout";
import React from "react";
import Breadcrumb from "../../../components/BreadCrumb";
import * as Sc from '../../home/HomePage.styles';
import {
    Circle,
    CircleComplete,
    CircleMain,
    CircleTextBox,
    ContentWrapper,
    LineEmpty,
    LineFill
} from "./ProgressBar.styles";

const ProgressBar = (data): JSX.Element => {

    return (
        <>
            <ContentWrapper>
                <CircleTextBox>
                    <CircleMain>
                        {data.progress > 0 ? <CircleComplete/> : <Circle/> }
                    </CircleMain>
                    <span>Info</span>
                </CircleTextBox>
                {data.progress >= 1 ? <LineFill/> : <LineEmpty/>}
                <CircleTextBox>
                    <CircleMain>
                        {data.progress > 1 ? <CircleComplete/> : (data.progress === 1 ? <Circle/> : "") }
                    </CircleMain>
                    <span>Type</span>
                </CircleTextBox>
                {data.progress >= 2 ? <LineFill/> : <LineEmpty/>}
                <CircleTextBox>
                    <CircleMain>
                        {data.progress > 2 ? <CircleComplete/> : (data.progress === 2 ? <Circle/> : "") }
                    </CircleMain>
                    <span>Data</span>
                </CircleTextBox>
                {data.progress >= 3 ? <LineFill/> : <LineEmpty/>}
                <CircleTextBox>
                    <CircleMain>
                        {data.progress > 3 ? <CircleComplete/> : (data.progress === 3 ? <Circle/> : "") }
                    </CircleMain>
                    <span>Confirmation</span>
                </CircleTextBox>
                {data.progress >= 4 ? <LineFill/> : <LineEmpty/>}
                <CircleTextBox>
                    <CircleMain>
                        {data.progress > 4 ? <CircleComplete/> : (data.progress === 4 ? <Circle/> : "") }
                    </CircleMain>
                    <span>Processing</span>
                </CircleTextBox>
            </ContentWrapper>
        </>
    );
};

export default ProgressBar;