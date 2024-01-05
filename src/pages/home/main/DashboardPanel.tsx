import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import * as Sc from "../HomePage.styles";
import React, {useEffect, useState} from "react";
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
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";

const DashboardPanel = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState('');
    const [listDashboards, setListDashboards] = useState<any[]>([]);

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    const fetchDashboards = async () => {
        try {
            const response = await axios.get(api.dashboard(), {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setListDashboards(response.data);
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    const filteredDashboards = listDashboards.filter(obj => obj.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        fetchDashboards();
    }, []);

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

export default DashboardPanel;