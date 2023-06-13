import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import Cookies from "js-cookie/src/js.cookie";
import * as api from '../../../constants/api';
import AddBucketForm from "./forms/AddBucketForm";
import UpdateBucketForm from "./forms/UpdateBucketForm";
import {Tooltip} from "@material-ui/core";

const Buckets = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
    const [listBuckets, setListBuckets] = useState<any[]>([]);

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

    const fetchBuckets = async () => {
        try {
            const response = await axios.get(api.bucketList(), {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setListBuckets(response.data);
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    const deleteBucket = async (bucketId) => {
        try {
            const response = await axios.delete(api.bucketList() + `/${bucketId}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("Bucket delete successfully ", {
                autoHideDuration: 2000,
                variant: "success"
            })
            fetchBuckets()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    useEffect(() => {
        fetchBuckets();
    }, []);

    const handleUpdateBuckes = () => {
        fetchBuckets();
    };

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const year = Math.floor(days / 365);

        const remainingDays = days % 365;
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        console.log(days)

        let retention = ""

        if (seconds === 0) {
            return "Forever"
        }

        if (year > 0) {
            retention += `${year} year `
        }

        if (remainingDays > 0) {
            retention += `${remainingDays} days `;
        }

        if (remainingHours > 0) {
            retention += `${remainingHours} hours `;
        }

        if (remainingMinutes > 0) {
            retention += `${remainingMinutes} minutes`;
        }

        if (remainingSeconds > 0) {
            retention += `${remainingSeconds} seconds`;
        }

        return retention
    }

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
                                            <Tooltip title={bucket.description}>
                                                <TableCell style={titleSettings}>{bucket.name}</TableCell>
                                            </Tooltip>
                                            <TableCell/>
                                            <TableCell/>
                                            <TableCell/>
                                            <TableCell style={{textAlign: "right"}}>
                                                <BsFillTrashFill onClick={() => deleteBucket(bucket.id)}/>
                                            </TableCell>
                                        </TableRowBucket>
                                        <TableRowBucket>
                                            <TableCell
                                                style={desSettings11}>Retention: {formatTime(bucket.retentionPeriod)}</TableCell>
                                            <TableCell style={desSettings12}>ID: {bucket.id}</TableCell>
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
                                                <UpdateBucketForm onOk={handleUpdateBuckes} bucketId={bucket.id}/>
                                            </TableCell>
                                        </TableRowBucket>
                                        <TableRowBucket>

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
                    <AddBucketForm onOk={handleUpdateBuckes}/>
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

const titleSettings = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "28px",
    color: "#000000",
}

const desSettings11 = {
    width: "355px",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "23px",
    color: "#828294",
    whiteSpace: 'nowrap'
}

const desSettings12 = {
    width: "350px",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "23px",
    color: "#828294",
    whiteSpace: 'nowrap'
}

const desSettings2 = {
    paddingRight: "230px",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "23px",
    color: "#828294",
}

export default Buckets;
