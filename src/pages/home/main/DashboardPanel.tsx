import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import * as Sc from "../HomePage.styles";
import React, {useState} from "react";
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
import {
    DashboardPanelDiv,
    SearchBox,
    SearchIcon,
    SearchInputField, TableCell,
    TableListDashboards, TableRow, TBodyDashboards,
    Title, Version
} from "./DashboardPanel.styles";
import {AiOutlineSearch} from "react-icons/all";
import {Link} from "react-router-dom";
import {APP_VERSION} from "../../../App";

const DashboardPanel = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    const filteredDashboards = listDashboards.filter(obj => obj.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <DashboardPanelDiv>
            <Title>Recent Dashboards</Title>
            <SearchBox>
                <SearchIcon>
                    <AiOutlineSearch/>
                    <SearchInputField placeholder="Filter dashboard" type="text" value={searchTerm}
                                      onChange={handleSearchChange}/>
                </SearchIcon>
            </SearchBox>
            <TableListDashboards>
                <TBodyDashboards>
                {filteredDashboards.map((dashboard, index) => (
                        <TableRow key={index}>
                            <Link to={"/dashboard/" + dashboard.id} style={{textDecoration: "none"}}>
                                <TableCell>{dashboard.title}</TableCell>
                            </Link>
                        </TableRow>
                ))}
                </TBodyDashboards>
            </TableListDashboards>
        </DashboardPanelDiv>
    );
};

// TODO: Исправить на получение списка с backend'а
const listDashboards = [
    {
        id: "1",
        title: 'Uploaded data',
        description: 'Types of uploaded data',
        widgets: ['Widget 1', 'Widget 2', 'Widget 3', 'Widget 4']
    },
    {id: "2", title: 'Uploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
    {id: "3", title: 'AUploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
    {id: "4", title: 'BUploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
    {id: "5", title: 'DUploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
    {id: "6", title: 'ZUploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},

];

export default DashboardPanel;