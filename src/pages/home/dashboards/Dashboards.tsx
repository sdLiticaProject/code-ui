import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/createStore';
import * as Sc from '../HomePage.styles';
import Breadcrumb from "../../../components/BreadCrumb";
import {Link, useHistory} from 'react-router-dom';
import {
    Dropdown, DropdownIcon, DropdownOption, NewBlock,
    SearchBox,
    SearchIcon,
    SearchInputField, SortAndSearchBox
} from "./Dashboards.styles";
import {AiOutlineRight, AiOutlineSearch} from "react-icons/all";
import {Title, Description, InfoBlock, TitleAndDescriptionBox, Line, Stats, Circle, Param} from "./Dashboards.styles";
import NewForm from "../../../components/NewForm";
import {Button, FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";

const Dashboards = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
    const filteredDashboard = listDashboards.filter(dashboard => dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const history = useHistory();

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
                            </TitleAndDescriptionBox>
                            <Stats>
                                {dashboard.widgets.map((widget, index) => (
                                    <Param key={index}><Circle/>{widget}</Param>
                                ))}
                            </Stats>
                        </InfoBlock>
                    </Link>
                ))}
                <InfoBlock style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                    {showForm ? (
                        // <NewForm title="Create new DashBoard" labels={[{"name": "Title", "type": "text", "placeholder": "Enter dashboard name"}, {"name": "Description", "type": "text", "placeholder": "Enter dashboard description"}]} />
                        <FormControl>
                            <TextField label="Title" color="secondary" required/>
                            <dl/>
                            <TextField label="Description" color="secondary" />
                            <dl/>
                            <Button style={{backgroundColor: "#3F88C5", color: "white"}} variant="contained">Create</Button>
                        </FormControl>
                    ) : (
                        <NewBlock onClick={handleNewDashboard}/>
                    )}
                </InfoBlock>
            </Sc.InfoBlocksWrapper>
        </Sc.ContentWrapper>
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
    {id: "7", title: 'TUploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
    {id: "8", title: 'Uploaded data 2', description: 'Types of uploaded data 2', widgets: ['Widget 1', 'Widget 2']},
];

export default Dashboards;
