import * as Sc from "../../home/HomePage.styles";
import Breadcrumb from "../../../components/BreadCrumb";
import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import {
    ContentControlsSettings,
    ContentControls,
    ContentControlsEnd,
    ContentWrapper,
    ContentWrapperSettings,
    ContentChoose,
    ContentChooseSettings,
    ScrollBarsWrapper,
    ScrollBarsContent,
    ScrollList,
    ScrollObject, Card, MyTitle, MyList, MyBr
} from "./ExplorerData.styles";
import {
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText, Paper, Radio,
    Select,
    Switch,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";
import moment from "moment";
import SaveWidgetForm from "./forms/SaveWidgetForm";


const ExplorerData = (timeseries): JSX.Element => {
    const [selectedFields, setSelectedFields] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState({});
    const [chartType, setChartType] = useState('lines+markers');
    const [isTable, setIsTable] = useState(false);
    const [buckets, setBuckets] = useState<any[]>([])
    const [timeseriesList, setTimeseriesList] = useState<any[]>([])
    const [selectedBucket, setSelectedBucket] = useState("");
    const [selectedTs, setSelectedTs] = useState("");
    const [tsData, setTsData] = useState<any[any]>([]);
    const [newTsColumnsData, setNewTsColumnsData] = useState<any[]>([]);
    const [newTsTagsData, setNewTsTagsData] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isAllData, setIsAllData] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [step, setStep] = useState('1h');
    const [agrFn, setAgrFn] = useState('mean');


    const handleSetStartTime = (e) => {
        if (e.target.value === ''){
            setStartTime('')
        } else {
            setStartTime(e.target.value + ":00.000")
        }
    }

    const handleSetEndTime = (e) => {
        if (e.target.value === ''){
            setEndTime('')
        } else {
            setEndTime(e.target.value + ":00.000")
        }
    }

    const handleSetStep = (e) => {
        setStep(e.target.value)
    }

    const handleSetAgrFn = (e) => {
        setAgrFn(e.target.value)
    }

    const handleSetIsAllData = (e) => {
        setIsAllData(e.target.checked)
    }

    const handleToggleFields = async (item) => {
        if (selectedFields.includes(item)) {
            await setSelectedFields(selectedFields.filter((selectedItem) => selectedItem !== item));
        } else {
            await setSelectedFields([...selectedFields, item]);
        }
    };

    const handleTagSelectChange = async (event) => {
        const tag = event.target.name;
        const value = event.target.value;
        await setSelectedTags(prevTags => ({
            ...prevTags,
            [tag]: value,
        }));
    };


    const handleBucketSelect = async (bucketId) => {
        await setSelectedBucket(bucketId);
        fetchTimeSeriesList(bucketId)
    };

    const handleTimeSeriesSelect = async (tsId) => {
        await setSelectedTs(tsId);
        await setSelectedFields([]);
    };

    const fetchBuckets = async () => {
        try {
            const response = await axios.get(api.bucketList(), {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setBuckets(response.data);
            setSelectedBucket(response.data[0].id)
            fetchTimeSeriesList(response.data[0].id)
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    const fetchTsData = async () => {
        let query = ""
        if (startTime != ''){
            query += `from=${startTime + "Z"}&`
        }
        if (endTime != ''){
            query += `to=${endTime + "Z"}&`
        }
        query += `step=${step}&`

        query += `agrFn=${agrFn}`

        try {
            if (isTable && isAllData) {
                const response = await axios.get(api.timeSeries() + `/${selectedTs}/data/all`, {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setTsData(response.data);
                handleGetData(response.data);
            } else if (isTable && !isAllData) {
                const response = await axios.get(api.timeSeries() + `/${selectedTs}/data?${query}&pageSize=1000`, {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setTsData(response.data);
                handleGetData(response.data);
            } else if (!isTable && !isAllData) {
                const response = await axios.get(api.timeSeries() + `/${selectedTs}/data/all`, {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setTsData(response.data);
                handleGetData(response.data);
            } else {

                const response = await axios.get(api.timeSeries() + `/${selectedTs}/data?${query}&pageSize=1000000`, {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setTsData(response.data);
                handleGetData(response.data);
            }
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    const fetchTimeSeriesList = async (bucketId) => {
        try {
            const response = await axios.get(api.timeSeries() + `/bucket/${bucketId}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setTimeseriesList(response.data);
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    useEffect(() => {
        fetchBuckets()
    }, []);


    // Функция для обработки изменения состояния select
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    // Определение цветов для линий
    const colors = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf',
    ];

    const handleSwitchChange = (event) => {
        setIsTable(event.target.checked);
    };

    // Функция для обработки изменения состояния checkbox
    const handleFieldCheckboxChange = (event) => {
        const field = event.target.value;
        const isChecked = event.target.checked;
        // @ts-ignore
        setSelectedFields(prevFields => {
            if (isChecked) {
                return [...prevFields, field];
            } else {
                return prevFields.filter(f => f !== field);
            }
        });
    };

    // Функция для обработки изменения состояния select выбора тегов
    const handleGetData = (tsDataCur) => {

        if (tsDataCur.entities) {

            const tagOptions = {};

            tsDataCur.entities.forEach(entity => {
                Object.keys(entity.tags).forEach(tag => {
                    if (!tagOptions[tag]) {
                        tagOptions[tag] = [entity.tags[tag]];
                    } else if (!tagOptions[tag].includes(entity.tags[tag])) {
                        tagOptions[tag].push(entity.tags[tag]);
                    }
                });
            });

            const filteredData = tsDataCur.entities.filter((entity) => {
                return Object.keys(selectedTags).every((tag) => {
                    return entity.tags[tag] === selectedTags[tag] || selectedTags[tag] === 'all';
                });
            });

            // Извлечение данных из timeseriesData
            const data = selectedFields.map(field => {
                return {
                    x: filteredData.map(entity => moment(entity.timestamp, "DD.MM.YYYY H:mm:ss").toDate()),
                    y: filteredData.map(entity => entity.fields[field]),
                    name: field,
                };
            });

            console.log(data)

            setNewTsColumnsData(data);

            const data2 = Object.keys(selectedTags).map(tag => {
                const selectedValue = selectedTags[tag];
                const filteredEntities = tsDataCur.entities.filter(entity => {
                    if (selectedValue !== ('all' || '')) {
                        return entity.tags[tag] === selectedValue;
                    } else if (selectedValue === 'all') {
                        return entity.tags[tag]
                    } else {
                        return
                    }
                });
                const values = filteredEntities.map(entity => {
                    return entity.tags[tag];
                });
                return {
                    x: values,
                    name: tag,
                };
            });

            setNewTsTagsData(data2);
        }
    };

    // Использование данных для графика
    const plotDataFields = newTsColumnsData.map((d, index) => ({
        x: d.x,
        y: d.y,
        type: chartType,
        mode: chartType,
        fill: chartType.includes("fill") ? 'tozeroy' : '',
        line: {'shape': 'spline', 'smoothing': 0.65},
        // mode: 'lines+markers',
        marker: {color: colors[index % colors.length]},
        name: d.name,
    }));

    const plotDataTags = newTsTagsData.map((d, index) => ({
        x: d.x,
        type: chartType,
        mode: chartType,
        fill: chartType.includes("fill") ? 'tozeroy' : '',
        // mode: 'lines+markers',
        marker: {color: colors[index % colors.length]},
        name: d.name,
    }));


    const layout = {
        title: '',
        autosize: true,
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const TableTimeSeries = (table) => {
        return (
            Object.keys(table.table).length > 0 ?
                <Paper style={{width: '100%'}}>
                    <TableContainer style={{maxHeight: 280, border: "2px solid #3f88c5"}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Time</TableCell>
                                    {table.table.columns.map((column) => (
                                        <TableCell key={column}>{column}</TableCell>
                                    ))}
                                    {Object.keys(table.table.tags).map((tag) => (
                                        <TableCell key={tag}>{tag}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            {tsData && tsData.entities && tsData.entities.length > 0 ?
                                <TableBody>
                                    {tsData.entities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ts) => (
                                        <TableRow>
                                            <TableCell size={"small"}>{ts.timestamp}</TableCell>
                                            {Object.keys(ts.fields).map((field) => (
                                                <TableCell size={"small"} key={field}>{ts.fields[field]}</TableCell>
                                            ))}

                                            {Object.keys(ts.tags).map((tag) => (
                                                <TableCell size={"small"} key={tag}>{ts.tags[tag]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                                : <></>
                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={tsData.entities ? tsData.entities.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                : <></>

        );
    };

    const FieldsTS = (tsColumns) => {
        return (
            tsColumns && tsColumns.tsColumns && tsColumns.tsColumns.columns.length > 0 ?
                <>
                    <MyTitle variant="h6">Select Fields</MyTitle>
                    <MyList>
                        {tsColumns.tsColumns.columns.map((column) => (
                            <ListItem key={column} button onClick={() => handleToggleFields(column)}>
                                <Checkbox checked={selectedFields.includes(column)}/>
                                <ListItemText primary={column}/>
                            </ListItem>
                        ))
                        }
                    </MyList>
                </>
                : <></>
        )
    }

    const TagsTS = (tsTags) => {
        return (
            tsTags && tsTags.tsTags && Object.keys(tsTags.tsTags.tags).length > 0 ?
                <>
                    <MyTitle variant="h6">Select Tags</MyTitle>
                    <MyList>
                        {Object.keys(tsTags.tsTags.tags).map((tag) => (
                            <ListItem key={tag}>
                                <ListItemText primary={tag}/>
                                <Select
                                    value={selectedTags[tag] || ''}
                                    name={tag}
                                    onChange={handleTagSelectChange}
                                >
                                    <MenuItem key="all" value="all">All</MenuItem>
                                    <MenuItem key="none" value="none">-</MenuItem>
                                    {tsTags.tsTags.tags[tag].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </ListItem>
                        ))}
                    </MyList>
                </>
                : <></>
        )
    }


    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{'name': 'Data explorer'}]}/>
            <ContentWrapper style={{padding: "10px 20px"}}>
                <Grid container style={{alignItems: "center"}}>
                    <Grid item xs={12} sm={11}>
                        <FormControl style={{width: "200px"}}>
                            <InputLabel id="chart-type-label">Chart type</InputLabel>
                            <Select
                                defaultValue="lines-markers"
                                value={chartType}
                                label="Chart type"
                                onChange={handleChartTypeChange}
                            >
                                <MenuItem value="lines">Lines</MenuItem>
                                <MenuItem value="lines+markers">Lines and markers</MenuItem>
                                <MenuItem value="lines+fill">Lines and fill</MenuItem>
                                <MenuItem value="bar">Bar chart</MenuItem>
                                <MenuItem value="markers">Scatter plot</MenuItem>
                                <MenuItem value="histogram">Histogram tags</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={1} style={{textAlign: "right"}}>
                        <SaveWidgetForm />
                    </Grid>
                </Grid>

            </ContentWrapper>
            <ContentWrapper style={isTable ? {marginTop: 10, paddingBottom: 30} : {marginTop: 10}}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        {
                            (isTable && selectedTs != '') ? <>
                                <TableTimeSeries table={timeseriesList.find((ts) => ts.id === selectedTs)}
                                                 data={tsData}/>
                            </> : (chartType === 'histogram' ? <Plot
                                    data={plotDataTags.length > 0 ? plotDataTags : []}
                                    layout={layout}
                                    useResizeHandler
                                    style={{width: '100%', height: '100%'}}
                                /> :
                                <Plot
                                    data={plotDataFields.length > 0 ? plotDataFields : []}
                                    layout={layout}
                                    useResizeHandler
                                    style={{width: '100%', height: '100%'}}
                                />)
                        }
                    </Grid>
                </Grid>
            </ContentWrapper>
            <ContentWrapperSettings style={{marginTop: 10}}>
                <ContentControls>
                    <ContentControlsEnd>
                        <FormControlLabel style={{marginRight: 10}}
                                          value={isTable}
                                          control={<Switch checked={isTable} onChange={handleSwitchChange}
                                                           color="primary"/>}
                                          label="View Table Data"
                                          labelPlacement="start"
                        />
                        <TextField style={{marginRight: 10}}
                                   id="datetime-local"
                                   label="Start"
                                   type="datetime-local"
                                   defaultValue=""
                                   value={startTime}
                                   onChange={handleSetStartTime}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                        <TextField style={{marginRight: 10}}
                                   id="datetime-local"
                                   label="End"
                                   type="datetime-local"
                                   defaultValue=""
                                   value={endTime}
                                   onChange={handleSetEndTime}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                        <Button variant="contained" style={{background: "#3F88C5", color: "white", width: 150}}
                                onClick={fetchTsData}>
                            submit
                        </Button>
                    </ContentControlsEnd>
                </ContentControls>
                <ContentControlsSettings style={{height: "350px"}}>
                    <ContentChoose>
                        <Card>
                            <ScrollBarsWrapper>
                                <ScrollBarsContent>
                                    <ScrollList>
                                        <ScrollObject>
                                            <MyTitle variant="h6">Select Bucket</MyTitle>
                                            <MyList>
                                                {buckets.map((bucket) => (
                                                    <ListItem
                                                        key={bucket.id}
                                                        button
                                                        selected={bucket.id === selectedBucket}
                                                        onClick={() => handleBucketSelect(bucket.id)}
                                                    >
                                                        <ListItemIcon>
                                                            <Radio
                                                                edge="start"
                                                                checked={bucket.id === selectedBucket}
                                                                tabIndex={-1}
                                                                disableRipple
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText primary={bucket.name}/>
                                                    </ListItem>
                                                ))}
                                            </MyList>
                                        </ScrollObject>
                                        <ScrollObject style={!(timeseriesList.length > 0) ? {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        } : {}}>
                                            {timeseriesList.length > 0 ?
                                                <>
                                                    <MyTitle variant="h6">Select TimeSeries</MyTitle>
                                                    <MyList>
                                                        {timeseriesList.map((ts) => (
                                                            <ListItem
                                                                key={ts.id}
                                                                button
                                                                selected={ts.id === selectedTs}
                                                                onClick={() => handleTimeSeriesSelect(ts.id)}
                                                            >
                                                                <ListItemIcon>
                                                                    <Radio
                                                                        edge="start"
                                                                        checked={ts.id === selectedTs}
                                                                        tabIndex={-1}
                                                                        disableRipple
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText primary={ts.name}/>
                                                            </ListItem>
                                                        ))}
                                                    </MyList>
                                                </>
                                                : <div>Bucket is empty :(</div>
                                            }
                                        </ScrollObject>
                                        {
                                            timeseriesList.length > 0 ?
                                                <ScrollObject style={!(selectedTs !== '') ? {display: "none"} : {}}>
                                                    <FieldsTS
                                                        tsColumns={timeseriesList.find((ts) => ts.id === selectedTs)}/>
                                                </ScrollObject>
                                                : <></>
                                        }
                                        {
                                            timeseriesList.length > 0 ?
                                                <ScrollObject style={!(selectedTs !== '') ? {display: "none"} : {}}>
                                                    <TagsTS
                                                        tsTags={timeseriesList.find((ts) => ts.id === selectedTs)}/>
                                                </ScrollObject>
                                                : <></>
                                        }

                                        {timeseriesList.length > 0}
                                    </ScrollList>
                                </ScrollBarsContent>
                            </ScrollBarsWrapper>
                            <ContentChooseSettings>
                                <ScrollBarsWrapper>
                                    <ScrollBarsContent>
                                        <ScrollList>
                                            <ScrollObject style={{padding: "10px 5px 5px"}}>
                                                <FormControlLabel style={{marginRight: 10, width: "100%", justifyContent: "center"}}
                                                                  value={isAllData}
                                                                  control={<Switch checked={isAllData} onChange={handleSetIsAllData}
                                                                                   color="primary"/>}
                                                                  label="Convert Data"
                                                                  labelPlacement="start"
                                                />
                                                <InputLabel id="step-select" style={{marginTop: 10, fontSize: 12}}>STEP</InputLabel>
                                                <Select
                                                    disabled={!isAllData}
                                                    labelId="step-select"
                                                    fullWidth
                                                    value={step}
                                                    name="step"
                                                    onChange={handleSetStep}
                                                >
                                                    <MenuItem key="5s" value="5s">5s</MenuItem>
                                                    <MenuItem key="15s" value="15s">15s</MenuItem>
                                                    <MenuItem key="1m" value="1m">1m</MenuItem>
                                                    <MenuItem key="5m" value="5m">5m</MenuItem>
                                                    <MenuItem key="15m" value="15m">15m</MenuItem>
                                                    <MenuItem key="1h" value="1h">1h</MenuItem>
                                                    <MenuItem key="6h" value="6h">6h</MenuItem>
                                                    <MenuItem key="12h" value="12h">12h</MenuItem>
                                                    <MenuItem key="1d" value="1d">1d</MenuItem>
                                                    <MenuItem key="2d" value="2d">2d</MenuItem>
                                                    <MenuItem key="7d" value="7d">7d</MenuItem>
                                                    <MenuItem key="30d" value="30d">30d</MenuItem>
                                                </Select>
                                                <MyBr/>
                                                <InputLabel id="agrFn-select" style={{marginTop: 20, fontSize: 12}}>AGGREGATE FUNCTION</InputLabel>
                                                <Select
                                                    disabled={!isAllData}
                                                    labelId="agrFn-select"
                                                    fullWidth
                                                    value={agrFn}
                                                    name="agrFn"
                                                    onChange={handleSetAgrFn}
                                                >
                                                    <MenuItem key="mean" value="mean">mean</MenuItem>
                                                    <MenuItem key="median" value="median">median</MenuItem>
                                                    <MenuItem key="last" value="last">last</MenuItem>
                                                    <MenuItem key="max" value="max">max</MenuItem>
                                                    <MenuItem key="min" value="min">min</MenuItem>
                                                    <MenuItem key="sum" value="sum">sum</MenuItem>
                                                    <MenuItem key="stddev" value="stddev">stddev</MenuItem>
                                                    <MenuItem key="derivative" value="derivative">derivative</MenuItem>
                                                </Select>
                                            </ScrollObject>
                                        </ScrollList>
                                    </ScrollBarsContent>
                                </ScrollBarsWrapper>
                            </ContentChooseSettings>
                        </Card>
                    </ContentChoose>
                </ContentControlsSettings>
            </ContentWrapperSettings>
        </Sc.ContentWrapper>
    )
}

{/*{Object.keys(timeseriesData.entities[0].tags).map((tag) => (*/
}
{/*    <label key={tag}>*/
}
{/*        {tag}:*/
}
{/*        <select name={tag} value={selectedTags[tag] || ''}*/
}
{/*                onChange={handleTagSelectChange}*/
}
{/*                defaultValue=''>*/
}
{/*            <option value="">-</option>*/
}
{/*            <option value="all">All</option>*/
}
{/*            {tagOptions[tag].map(option => (*/
}
{/*                <option key={option} value={option}>{option}</option>*/
}
{/*            ))}*/
}
{/*        </select>*/
}
{/*    </label>*/
}
{/*))}*/
}

{/*{Object.keys(timeseriesData.entities[0].fields).map((field) => (*/
}
{/*    <label key={field}>*/
}
{/*        <input*/
}
{/*            type="checkbox"*/
}
{/*            value={field}*/
}
{/*            checked={selectedTags[field]}*/
}
{/*            onChange={handleFieldCheckboxChange}*/
}
{/*        />*/
}
{/*        {field}*/
}
{/*    </label>*/
}
{/*))}*/
}

const timeseriesData = {
    "entities": [
        {
            "timestamp": "01.04.2023 10:00:10",
            "fields": {
                "x": 6,
                "y": -9,
                "z": 2,
            },
            "tags": {
                "cpuk": "three",
                "wtf": "true",
                "jpt": "false"
            }
        },
        {
            "timestamp": "01.04.2023 10:01:10",
            "fields": {
                "x": 5,
                "y": -4,
                "z": 3,
            },
            "tags": {
                "cpuk": "two",
                "wtf": "false",
                "jpt": "false"
            }
        },
        {
            "timestamp": "01.04.2023 10:02:10",
            "fields": {
                "x": 4,
                "y": 9,
                "z": 4,
            },
            "tags": {
                "cpuk": "three",
                "wtf": "true",
                "jpt": "true"
            },
        },
    ]
};


export default ExplorerData;