import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/createStore';
import * as Sc from '../HomePage.styles';
import Breadcrumb from "../../../components/BreadCrumb";
import {Link, useHistory} from 'react-router-dom';
import {
    ButtonsLayout,
    Dropdown, DropdownIcon, DropdownOption, NewBlock,
    SearchBox,
    SearchIcon,
    SearchInputField, SortAndSearchBox
} from "./Dashboards.styles";
import {AiFillEdit, AiOutlineRight, AiOutlineSearch, BsTrashFill} from "react-icons/all";
import {Title, Description, InfoBlock, TitleAndDescriptionBox, Line, Stats, Circle, Param} from "./Dashboards.styles";
import NewForm from "../../../components/NewForm";
import {Button, FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";
import {dashboard} from "../../../constants/api";

const Dashboards = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
    const [listDashboards, setListDashboards] = useState<any[]>([])
    const filteredDashboard = listDashboards.filter(dashboard => dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

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

    useEffect(() => {
        fetchDashboards();
    }, []);

    // TODO: Исправить на получение списка с backend'а
    const widgetList = [
        {id: "1", widgets: []},
    ];

    async function handleCreateDashboard(title, description) {
        const requestBody = {
            "title": title,
            "description": description
        }

        try {
            const response = await axios.post(api.dashboard(), requestBody,{
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("Dashboard created successfully", {
                autoHideDuration: 2000,
                variant: "success"
            })
            fetchDashboards()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    const handleInfoBlockClick = (id) => {
        console.log(history.push("/"));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSortOrderChange = event => {
        setSortOrder(event.target.value);
    };

    const handleNewDashboard = () => {
        setShowForm(!showForm);
    };

    const sortedListDashboards = sortOrder === 'none'
        ? filteredDashboard :
        [...filteredDashboard].sort((a, b) => {
            switch (sortOrder) {
                case'asc':
                    return a.title.localeCompare(b.title);
                case 'desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{'name': 'Dashboards'}]}/>
            <SortAndSearchBox>
                <SearchBox>
                    <SearchIcon>
                        <AiOutlineSearch/>
                        <SearchInputField placeholder="Filter dashboard" type="text" value={searchTerm}
                                          onChange={handleSearchChange}/>
                    </SearchIcon>
                </SearchBox>
                <Dropdown value={sortOrder} onChange={handleSortOrderChange}>
                    <DropdownOption value="none">Sort by ...</DropdownOption>
                    <DropdownOption value="asc">Sort by Name (A→Z)</DropdownOption>
                    <DropdownOption value="desc">Sort by Name (Z→A)</DropdownOption>
                    <AiOutlineRight/>
                </Dropdown>
            </SortAndSearchBox>
            <Sc.InfoBlocksWrapper>
                {sortedListDashboards.map((dashboard, index) => (
                    <Link to={"/dashboard/" + dashboard.id}>
                        <InfoBlock key={index} onClick={handleInfoBlockClick}>
                            <TitleAndDescriptionBox>
                                <Title>{dashboard.title}</Title>
                                <Line/>
                                <Description>{dashboard.description}</Description>
                                <ButtonsLayout>
                                    <Button style={{minWidth: "30px"}}>
                                        <AiFillEdit/>
                                    </Button>
                                    <Button style={{minWidth: "30px"}}>
                                        <BsTrashFill/>
                                    </Button>
                                </ButtonsLayout>
                            </TitleAndDescriptionBox>
                            <Stats>
                                {widgetList[index].widgets.map((widget, index) => (
                                    <Param key={index}><Circle/>{widget}</Param>
                                ))}
                            </Stats>
                        </InfoBlock>
                    </Link>
                ))}
                <InfoBlock style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                    {showForm ? (
                        <FormControl>
                            <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" color="secondary" required/>
                            <dl/>
                            <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description" color="secondary" />
                            <dl/>
                            <Button style={{backgroundColor: "#3F88C5", color: "white"}} variant="contained" onClick={() => handleCreateDashboard(title, description)}>Create</Button>
                        </FormControl>
                    ) : (
                        <NewBlock onClick={handleNewDashboard}/>
                    )}
                </InfoBlock>
            </Sc.InfoBlocksWrapper>
        </Sc.ContentWrapper>
    );
};

export default Dashboards;
