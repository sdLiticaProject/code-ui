import React, {useState} from 'react';
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
    AiOutlineSearch, CiStreamOn,
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

const TimeSeriesTable = (data): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [showForm, setShowForm] = useState(false);
    const filteredTimeSeries = listTimeSeries.filter(timeseries => timeseries.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const sortedListTimeSeries = sortOrder === 'none'
        ? filteredTimeSeries :
        [...filteredTimeSeries].sort((a, b) => {
            switch (sortOrder) {
                case'asc':
                    return a.name.localeCompare(b.name);
                case 'desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

    console.log(data)

    function Row(props: { row }) {
        const {row} = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRowBorder sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCellBorder>
                        {row.id}
                    </TableCellBorder>
                    <TableCellBorder scope="row">
                        {row.type === 'file' ? <AiFillFile style={{width: "30px", height: "30px"}}/> : (row.type === 'stream' ? <CiStreamOn style={{width: "30px", height: "30px"}}/> : <MdPhotoCamera style={{width: "30px", height: "30px"}}/>)}
                    </TableCellBorder>
                    <TableCellBorder align="left">{row.name}</TableCellBorder>
                    <TableCellBorder component="th" align="right">
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
                                            <TableCell component="th" scope="row" rowSpan={3}>
                                                {row.description}ㅤ
                                            </TableCell>
                                            <TableCell >
                                                Created date:
                                            </TableCell>
                                            <TableCell >
                                                {row.createDate}
                                            </TableCell>
                                            <TableCell >
                                                Number of lines:
                                            </TableCell>
                                            <TableCell >
                                                {row.numberOFLines}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Last updated:</TableCell>
                                            <TableCell>{row.lastUpdate}</TableCell>
                                            <TableCell>Number of columns:</TableCell>
                                            <TableCell >
                                                {row.numberOfColumns}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Size:</TableCell>
                                            <TableCell>{row.size}</TableCell>
                                            <TableCell colSpan={2}>
                                                Download as CSV
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
            <Breadcrumb routeSegments={[{'name': 'Buckets', 'path': '/home/buckets'}, {'name': data.data.name}]}/>
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
                                <TableCell>#</TableCell>
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
                                <Row key={index} row={row}/>
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

// TODO: Исправить на получение списка с backend'а
const listTimeSeries = [
    {
        id: "1",
        type: "file",
        name: 'My time series snapshot from CSV file',
        description: 'hferufhewruipjbfeiur gbfiue ufiewiufhiweuahfiuawehfuihweiufhweiuhfiuweh',
        createDate: 'some date',
        lastUpdate: 'some date',
        size: '256Mb',
        numberOFLines: '25k',
        numberOfColumns: '16'
    },
    {
        id: "2",
        type: "stream",
        name: 'Time series accepting live data stream from somewhere',
        description: '',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
    {
        id: "3",
        type: "rest",
        name: 'My first time series snapshot from JTS file',
        description: 'Time series accepting live data stream from somewhere',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
    {
        id: "1",
        type: "file",
        name: 'My time series snapshot from CSV file',
        description: 'hferufhewruipjbfeiur gbfiue ufiewiufhiweuahfiuawehfuihweiufhweiuhfiuweh',
        createDate: 'some date',
        lastUpdate: 'some date',
        size: '256Mb',
        numberOFLines: '25k',
        numberOfColumns: '16'
    },
    {
        id: "2",
        type: "stream",
        name: 'Time series accepting live data stream from somewhere',
        description: '',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
    {
        id: "3",
        type: "rest",
        name: 'My first time series snapshot from JTS file',
        description: 'Time series accepting live data stream from somewhere',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
    {
        id: "1",
        type: "file",
        name: 'My time series snapshot from CSV file',
        description: 'hferufhewruipjbfeiur gbfiue ufiewiufhiweuahfiuawehfuihweiufhweiuhfiuweh',
        createDate: 'some date',
        lastUpdate: 'some date',
        size: '256Mb',
        numberOFLines: '25k',
        numberOfColumns: '16'
    },
    {
        id: "2",
        type: "stream",
        name: 'Time series accepting live data stream from somewhere',
        description: '',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
    {
        id: "3",
        type: "rest",
        name: 'My first time series snapshot from JTS file',
        description: 'Time series accepting live data stream from somewhere',
        createDate: '',
        lastUpdate: '',
        size: '',
        numberOFLines: '',
        numberOfColumns: ''
    },
];

export default TimeSeriesTable;
