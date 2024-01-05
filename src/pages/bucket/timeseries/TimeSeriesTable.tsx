import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/createStore';
import * as Sc from '../../home/HomePage.styles';
import Breadcrumb from "../../../components/BreadCrumb";
import {Link, useHistory} from 'react-router-dom';
import {
    Dropdown, DropdownIcon, DropdownOption, LargePlot,
    SearchBox,
    SearchIcon,
    SearchInputField, SortAndSearchBox, TableCellBorder, TableRowBorder
} from "./TimeSeriesTable.styles";
import {
    AiFillFile,
    AiFillPlusCircle,
    AiOutlineRight,
    AiOutlineSearch, BsFillTrashFill, CiStreamOn,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp, MdPhotoCamera,
    MdVisibility
} from "react-icons/all";
import {
    Title,
    Description,
    InfoBlock,
    TitleAndDescriptionBox,
    Line,
    Stats,
    Circle,
    Param,
    Button
} from "./TimeSeriesTable.styles";
import NewForm from "../../../components/NewForm";
import {
    Box, Collapse,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow,
    TextField, Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";
import styled from "styled-components";

const DeleteButton = styled(Button)`
  background-color: #FF5733;
  color: #ffffff;
  cursor: pointer;

  :hover {
    background-color: #a10000;
  }
`

const TimeSeriesTable = ({bucketInfo}): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
    const [listTimeSeries, setListTimeSeries] = useState([]);
    // @ts-ignore
    const filteredTimeSeries = listTimeSeries.filter(timeseries => timeseries.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const fetchTimeSeriesList = async () => {
        try {
            const response = await axios.get(api.timeSeries() + `/bucket/${bucketInfo.id}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setListTimeSeries(response.data);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchTimeSeriesList();
    }, [bucketInfo]);

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleGoLoadData(event) {
        event.preventDefault()
        window.location.replace('/load');
    }

    async function handleDownloadTS (tsName, tsId) {
        try {
            const response = await axios.get(api.timeSeries() + `/${tsId}/download`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                responseType: 'blob', // Set the response type to 'blob'
            });

            // Create a download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${tsName}.csv`);
            document.body.appendChild(link);
            link.click();

            // Clean up the object URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            enqueueSnackbar("TimeSeries not found", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    async function handleDeleteTS(event) {
        try {
            await axios.delete(api.timeSeries() + `/${event.target.value}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("TimeSeries delete", {
                autoHideDuration: 2000,
                variant: "success"
            })
            fetchTimeSeriesList();
        } catch (error) {
            enqueueSnackbar("TimeSeries not found", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    const sortedListTimeSeries = sortOrder === 'none'
        ? filteredTimeSeries :
        [...filteredTimeSeries].sort((a, b) => {
            switch (sortOrder) {
                case'asc':
                    // @ts-ignore
                    return a.name.localeCompare(b.name);
                case 'desc':
                    // @ts-ignore
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

    function Row(props: { row, index }) {
        const {row, index} = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRowBorder sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCellBorder style={{ width: '60px', textAlign: "center" }}>
                        {index + 1}
                    </TableCellBorder>
                    <TableCellBorder scope="row" style={{ width: '60px' }}>
                        {row.type === 'file' ? <AiFillFile style={{width: "30px", height: "30px"}}/> : (row.type === 'stream' ? <CiStreamOn style={{width: "30px", height: "30px"}}/> : <MdPhotoCamera style={{width: "30px", height: "30px"}}/>)}
                    </TableCellBorder>
                    <TableCellBorder align="left">{row.name}</TableCellBorder>
                    <TableCellBorder align="right">
                        <DeleteButton color={"white"} value={row.id} onClick={handleDeleteTS}>
                            Delete
                        </DeleteButton>
                        <Link to={"/explorer/" + row.id}>
                            <Button color="white">
                                View
                            </Button>
                        </Link>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
                        </IconButton>
                    </TableCellBorder>
                </TableRowBorder>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Table size="small" aria-label="purchases">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell scope="row" rowSpan={3} style={{width: "60%"}}>
                                                ㅤ{row.description}ㅤ
                                            </TableCell>
                                            <TableCell >
                                                Created date:
                                            </TableCell>
                                            <TableCell >
                                                {row.dateCreated}
                                            </TableCell>
                                            <TableCell >
                                                Number of lines:
                                            </TableCell>
                                            <TableCell >
                                                {row.rowsCount}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last updated:</TableCell>
                                            <TableCell>{row.dateModified}</TableCell>
                                            <TableCell>Number of columns:</TableCell>
                                            <TableCell >
                                                {row.columnsCount}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Size:</TableCell>
                                            <TableCell>{row.size}</TableCell>
                                            <TableCell colSpan={2}>
                                                Download as <a style={{color: "#3F88C5"}} onClick={() => handleDownloadTS(row.name, row.id)} download>CSV</a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{'name': 'Buckets', 'path': '/home/buckets'}, {'name': bucketInfo.name}]}/>
            <SortAndSearchBox>
                <SearchBox>
                    <SearchIcon>
                        <AiOutlineSearch/>
                        <SearchInputField placeholder="Filter time series" type="text" value={searchTerm}
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
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '60px', textAlign: "center" }}>#</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">
                                    <Button color={"#3F88C5"} onClick={handleGoLoadData}>
                                        <span style={{display: "flex"}}>
                                            <AiFillPlusCircle/>NEW
                                        </span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedListTimeSeries
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                <Row key={index} row={row} index={index}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedListTimeSeries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </LargePlot>
            </Sc.InfoBlocksWrapper>
        </Sc.ContentWrapper>
    );
};


export default TimeSeriesTable;
