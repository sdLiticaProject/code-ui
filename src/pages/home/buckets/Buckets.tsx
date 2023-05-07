import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/createStore';
import * as Sc from '../HomePage.styles';
import Breadcrumb from "../../../components/BreadCrumb";
import {Link, useHistory} from 'react-router-dom';
import {
    BucketInfoBox, Button,
    ButtonBucket,
    Dropdown, DropdownIcon, DropdownOption, LargePlot, LargeTable, Line, RowDiv1, RowDiv2,
    SearchBox,
    SearchIcon,
    SearchInputField, SortAndSearchBox, TableCell,
    TableRowBucket, TableRowLine, TBodyLargeTable
} from "./Buckets.style";
import {
    AiFillPlusCircle,
    AiOutlineRight,
    AiOutlineSearch,
    BsFillTrashFill,
    MdSettings,
    MdVisibility
} from "react-icons/all";

const Buckets = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
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

    const filteredBuckets = listBuckets.filter(dashboard => dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedListBuckets = sortOrder === 'none'
        ? filteredBuckets :
        [...filteredBuckets].sort((a, b) => {
            switch (sortOrder) {
                case'asc':
                    return a.name.localeCompare(b.name);
                case 'desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{'name': 'Buckets'}]}/>
            <SortAndSearchBox>
                <SearchBox>
                    <SearchIcon>
                        <AiOutlineSearch/>
                        <SearchInputField placeholder="Filter buckets" type="text" value={searchTerm}
                                          onChange={handleSearchChange}/>
                    </SearchIcon>
                </SearchBox>
                <Dropdown value={sortOrder} onChange={handleSortOrderChange}>
                    <DropdownOption value="none">Sort by ...</DropdownOption>
                    <DropdownOption value="asc">Sort by Name (A→Z)</DropdownOption>
                    <DropdownOption value="desc">Sort by Name (Z→A)</DropdownOption>
                    <DropdownIcon/>
                    <AiOutlineRight/>
                </Dropdown>
            </SortAndSearchBox>
            <Sc.InfoBlocksWrapper>
                <LargePlot>
                    <LargeTable>
                        <TBodyLargeTable>
                            {sortedListBuckets.map((bucket) => (
                                <>
                                    <RowDiv1>
                                        <TableRowBucket>
                                            <TableCell style={titleSettings}>{bucket.name}</TableCell>
                                            <TableCell/>
                                            <TableCell/>
                                            <TableCell/>
                                            <TableCell style={{textAlign: "right"}}>
                                                <BsFillTrashFill/>
                                            </TableCell>
                                        </TableRowBucket>
                                        <TableRowBucket>
                                            <TableCell style={desSettings1}>Retention: {bucket.retention}</TableCell>
                                            <TableCell style={desSettings1}>ID: {bucket.id}</TableCell>
                                            <TableCell style={desSettings2}/>
                                            <TableCell>
                                                <Link to={"/bucket/" + bucket.id}>
                                                    <Button color={"#3F88C5"} to={"/bucket/" + bucket.id}>
                                                        <MdVisibility/>
                                                        View
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button color={"white"}>
                                                    <MdSettings/>
                                                    Settings
                                                </Button>
                                            </TableCell>
                                        </TableRowBucket>
                                    </RowDiv1>
                                    <RowDiv2>
                                        <TableRowLine>
                                            <TableCell colSpan="4">
                                                <Line/>
                                            </TableCell>
                                        </TableRowLine>
                                    </RowDiv2>
                                </>
                            ))}
                        </TBodyLargeTable>
                    </LargeTable>
                </LargePlot>
                <div>
                    <ButtonBucket>
                        <AiFillPlusCircle style={{width: "25px", height: "25px"}}/>
                        New
                    </ButtonBucket>
                    <BucketInfoBox>
                        <h2>What is a Bucket?</h2>
                        <h3>A bucket is a designated place for storing time series information, with a specified
                            Retention Policy that determines how long each data point remains stored.</h3>
                    </BucketInfoBox>
                </div>
            </Sc.InfoBlocksWrapper>
        </Sc.ContentWrapper>
    );
};

// TODO: Исправить на получение списка с backend'а
const listBuckets = [
    {
        id: "aa6dd6a228137717",
        name: 'Name 1',
        description: 'Description 1',
        retention: "Forever / 10 ms"
    },
    {
        id: "fa981dfe1fbbcef3",
        name: 'Name 2',
        description: 'Description 2',
        retention: "Forever / 10 ms"
    },
    {
        id: "fa981dfe1fbbcef3",
        name: 'Name 2',
        description: 'Description 2',
        retention: "Forever / 10 ms"
    },
    {
        id: "fa981dfe1fbbcef3",
        name: 'Name 2',
        description: 'Description 2',
        retention: "Forever / 10 ms"
    },
];

const titleSettings = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "28px",
    color: "#000000",
}

const desSettings1 = {
    width: "300px",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "23px",
    color: "#828294"
}

const desSettings2 = {
    paddingRight: "400px",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "23px",
    color: "#828294"
}

export default Buckets;
