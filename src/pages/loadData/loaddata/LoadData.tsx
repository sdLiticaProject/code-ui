import Layout from "../../../components/layout/Layout";
import React, {useEffect, useState} from "react";
import Breadcrumb from "../../../components/BreadCrumb";
import * as Sc from '../../home/HomePage.styles';
import ProgressBar from "../progress-bar/ProgressBar";
import {CircleComplete, ContentWrapper} from "../progress-bar/ProgressBar.styles";
import {LargePlot, SelectTypeButton, TitlePlot} from "./LoadData.styles";
import {AiFillFile, CiStreamOn, MdAdd, MdPhotoCamera} from "react-icons/all";
import {Box, Button, Fab, FormControl, Grid, InputLabel, Select, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {enqueueSnackbar} from "notistack";
import {Image} from "@material-ui/icons";
import {loadingImg} from "../../../assets";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";

const LoadData = (): JSX.Element => {
    const [progress, setProgress] = useState(0);
    const [typeLoad, setTypeLoad] = useState('');
    const [formData, setFormData] = useState<any>({});
    const [bucket, setBucket] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [buckets, setBuckets] = useState<any[]>([])
    const [timeSeriesId, setTimeSeriesId] = useState('')
    const [apikey, setApikey] = useState('')
    const [tsLink, setTsLink] = useState('')

    useEffect(() => {
        const fetchBucket = async () => {
            try {
                const response = await axios.get(api.bucketList(), {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setBuckets(response.data);
            } catch (error) {
                enqueueSnackbar("Some problems", {
                    autoHideDuration: 5000,
                    variant: "error"
                })
            }
        };
        fetchBucket();

    }, []);

    async function handleTypeChange(event) {
        const value = event.currentTarget.querySelector('input[type="hidden"]').getAttribute('data-value')
        await setTypeLoad(value)
        await handleCreateTimeSeries(value);
        handleButtonNextClick()
    }

    function handleButtonNextClick() {
        setProgress(progress + 1)
    }

    function handleButtonBackClick() {
        setProgress(progress - 1)
    }

    const handleOnFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    async function handleCreateTimeSeries(type) {
        const requestBody = {
            "name": formData.name,
            "description": formData.description,
            "bucketId": formData.bucket,
            "type": type
        }

        try {
            await axios.post(api.timeSeries(), requestBody,
                {
                    headers: {
                        Authorization: `cloudToken ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                setTimeSeriesId(res.data.id);
                handleGetLink(res.data.id, type);
            });
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    async function handleGetLink(tsId, type) {

        try {
            const response = await axios.get(api.timeSeries() + `/${tsId}/link?typeLink=${type}`,
                {
                    headers: {
                        Authorization: `cloudToken ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
            setApikey(response.data.apiKey)
            setTsLink(response.data.uri)
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    function handeFormSave(event) {
        event.preventDefault();
        const fields = event.currentTarget.form.querySelectorAll('input, select, textarea');
        const newFormData = {};
        fields.forEach((field) => {
            newFormData[field.name] = field.value;
        });

        if (newFormData["name"] === '') {
            enqueueSnackbar("Name required", {
                autoHideDuration: 5000,
                variant: "error"
            })
        } else if (newFormData["bucket"] === '') {
            enqueueSnackbar("Bucket required", {
                autoHideDuration: 5000,
                variant: "error"
            })
        } else {
            setFormData(newFormData);
            handleButtonNextClick()
        }
    }

    function handleGoBuckets(event) {
        event.preventDefault()
        window.location.replace('/home/buckets');
    }

    function handleUploadData(event) {
        event.preventDefault()
        handleButtonNextClick()
    }

    async function starUploadHandler() {
        const formData = new FormData();
        formData.append('formFile', file);

        try {
            const response = await axios.post(api.timeSeries() + "/" + timeSeriesId + "/data/file", formData,
                {
                    headers: {
                        Authorization: `cloudToken ${Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
            console.log(response.data)
            handleButtonNextClick();
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    const SelectType = () => {
        return (
            <>
                <SelectTypeButton onClick={handleTypeChange}>
                    <input type="hidden" value="file" data-value="file"/>
                    <AiFillFile style={{width: 80, height: 80}}/>
                    <span>Create new time-series from uploaded CSV-file</span>
                </SelectTypeButton>
                <SelectTypeButton onClick={handleTypeChange}>
                    <input type="hidden" value="rest" data-value="rest"/>
                    <MdPhotoCamera style={{width: 80, height: 80}}/>
                    <span>Create a new time-series by uploading through the JTS format using REST API.</span>
                </SelectTypeButton>
                <SelectTypeButton onClick={handleTypeChange}>
                    <input type="hidden" value="stream" data-value="stream"/>
                    <CiStreamOn style={{width: 80, height: 80}}/>
                    <span>Configure input stream to accept data pushed from outside (using WebSocket)</span>
                </SelectTypeButton>
            </>
        );
    };

    const FormInfo = () => {
        return (
            <LargePlot>
                <TitlePlot>General information about new time-series</TitlePlot>
                <Box component={"form"} style={{marginTop: 20}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Name:
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Description:
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                id="description"
                                name="description"
                                label="Content"
                                multiline
                                fullWidth
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <InputLabel
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: 700
                                }}
                            >
                                Bucket:
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="bucket">Bucket</InputLabel>
                                <Select
                                    labelId="bucket"
                                    id="bucket"
                                    name="bucket"
                                    label="Select bucket"
                                >
                                    {buckets.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}/>
                        <Grid item xs={12} sm={8}/>
                        <Grid item xs={12} sm={4} style={{textAlign: "right"}}>
                            <Button variant="outlined" style={{margin: 10, paddingLeft: "10%", paddingRight: "10%"}}
                                    onClick={handleButtonBackClick}>
                                Back
                            </Button>
                            <Button variant="contained" style={{
                                margin: 10,
                                paddingLeft: "10%",
                                paddingRight: "10%",
                                color: "white",
                                background: "#3F88C5"
                            }} onClick={handeFormSave}>
                                Create
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5}/>
                    </Grid>
                </Box>
            </LargePlot>
        )
    }

    const FormForData = () => {
        return (
            <LargePlot>
                <TitlePlot>{
                    {
                        'file': <><AiFillFile style={{width: "60px", height: "60px", marginRight: 50}}/>Please, specify
                            data snapshot file to upload it</>,
                        'stream': <><CiStreamOn style={{width: "60px", height: "60px", marginRight: 50}}/>Please, use
                            this WebSocket to upload your data</>,
                        'rest': <><MdPhotoCamera style={{width: "60px", height: "60px", marginRight: 50}}/>Please, use
                            this URL to upload your data via the REST API</>,
                    }[typeLoad]
                }
                </TitlePlot>
                <Box component="form" style={{marginTop: 20}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}/>
                        {
                            {
                                'file':
                                    <Grid item xs={12} sm={12} style={{textAlign: "center", padding: "90px"}}>
                                        <label>
                                            <input
                                                style={{display: "none"}}
                                                type={"file"}
                                                id={"csvFileInput"}
                                                accept={".csv"}
                                                onChange={handleOnFileChange}
                                            />
                                            <Fab
                                                color="secondary"
                                                size="small"
                                                component="span"
                                                aria-label="add"
                                                variant="extended"
                                                style={{padding: 20}}
                                            >
                                                <MdAdd style={{width: 20, height: 20, marginRight: 5}}/> Upload CSV-file
                                            </Fab>
                                        </label>
                                    </Grid>,
                                'stream': <>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="url"
                                            name="url"
                                            label="URL"
                                            fullWidth
                                            value={tsLink}
                                            size="small"
                                            disabled={true}
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="apikey"
                                            name="apikey"
                                            label="API KEY"
                                            fullWidth
                                            value={apikey}
                                            size="small"
                                            disabled={true}
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </>,
                                'rest': <>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="url"
                                            name="url"
                                            label="URL"
                                            fullWidth
                                            value={tsLink}
                                            size="small"
                                            disabled={true}
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="apikey"
                                            name="apikey"
                                            label="API KEY"
                                            fullWidth
                                            value={apikey}
                                            size="small"
                                            disabled={true}
                                            autoComplete="off"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </>
                            }[typeLoad]
                        }
                        <Grid item xs={12} sm={12}/>
                        <Grid item xs={12} sm={8}/>
                        <Grid item xs={12} sm={4} style={{textAlign: "right"}}>
                            <Button variant="outlined" style={{margin: 10, paddingLeft: "10%", paddingRight: "10%"}}
                                    onClick={handleButtonBackClick}>
                                Back
                            </Button>
                            {
                                (typeLoad === 'file') ? <Button variant="contained" style={{
                                    margin: 10,
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    color: "white",
                                    background: "#3F88C5"
                                }} onClick={handleUploadData}>
                                    Continue
                                </Button> : <Button variant="contained" style={{
                                    margin: 10,
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    color: "white",
                                    background: "#3F88C5"
                                }} onClick={handleButtonNextClick}>
                                    Continue
                                </Button>
                            }
                        </Grid>
                        <Grid item xs={12} sm={5}/>
                    </Grid>
                </Box>
            </LargePlot>
        )
    }

    const ConfirmationForm = () => {
        return (
            <LargePlot>
                <TitlePlot>{
                    {
                        'file': <><AiFillFile style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                        'stream': <><CiStreamOn style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                        'rest': <><MdPhotoCamera style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                    }[typeLoad]
                }
                </TitlePlot>
                <Box style={{marginTop: 20}}>
                    <Grid container spacing={3} style={styleSettings1}>
                        <Grid item xs={12} sm={10}/>
                        <Grid item xs={12} sm={12}>
                            Gotcha!
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                {
                                    'file': 'We will create a static time-series instance from the file you selected.',
                                    'stream': 'We will create a dynamic instance of a time series that will be updated via WebSocket.',
                                    'rest': 'We will create an instance of a dynamic time series that can be updated by sending data to the selected data endpoint.',
                                }[typeLoad]
                            }
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                {
                                    'file': 'It will not change over time, but you will be able to visualize it and apply variety of available analytical instruments with parametrization that fits best your needs.',
                                    'stream': 'This time series will change over time depending on the availability of new data in the tracking source. You will be able to visualize this and apply various available analytical tools with parameterization that best suits your needs. It will also be possible to run customized analytical chains when updating data.',
                                    'rest': 'This time series will change over time as new pieces of data are transferred to the new endpoint. You will be able to visualize this and apply various available analytical tools with parameterization that best suits your needs. It will also be possible to run customized analytical chains when updating data.',
                                }[typeLoad]
                            }
                        </Grid>
                        <Grid item xs={12} sm={8}/>
                        <Grid item xs={12} sm={4} style={{textAlign: "right"}}>
                            <Button variant="outlined" style={{margin: 10, paddingLeft: "10%", paddingRight: "10%"}}
                                    onClick={handleButtonBackClick}>
                                Back
                            </Button>
                            <Button variant="contained" style={{
                                margin: 10,
                                paddingLeft: "10%",
                                paddingRight: "10%",
                                color: "white",
                                background: "#3F88C5"
                            }} onClick={handleButtonNextClick}>
                                Continue
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5}/>
                    </Grid>
                </Box>
            </LargePlot>
        )
    }

    const ProcessingForm = () => {

        if (file !== '' && typeLoad === 'file') {
            starUploadHandler()
        }

        return (
            <LargePlot>
                <TitlePlot>{
                    {
                        'file': <><AiFillFile style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                        'stream': <><CiStreamOn style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                        'rest': <><MdPhotoCamera style={{width: "60px", height: "60px", marginRight: 50}}/></>,
                    }[typeLoad]
                }
                </TitlePlot>
                <Box style={{marginTop: 20}}>
                    <Grid container spacing={3} style={styleSettings1}>
                        <Grid item xs={12} sm={12}>
                            {
                                {
                                    'file': 'Working on it!',
                                    'stream': 'Almost done!',
                                    'rest': 'Almost done!',
                                }[typeLoad]
                            }
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {
                                {
                                    'file': 'We are trying to make initial data pull into our cloud',
                                    'stream': 'Now you can try pushing data to the newly created WS:\n' + tsLink,
                                    'rest': 'Now you can try pushing data to the newly created URL:\n' + tsLink,
                                }[typeLoad]
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
                            <img src={loadingImg} alt={"Loading data..."} style={{width: "50px"}}/>
                        </Grid>
                        <Grid item xs={12} sm={12}/>
                        {
                            {
                                'file': <></>,
                                'stream': <Grid item xs={12} sm={12} style={{textAlign: "right"}}>
                                    <Button variant="contained" style={{
                                        margin: 10,
                                        paddingLeft: "5%",
                                        paddingRight: "5%",
                                        color: "white",
                                        background: "#3F88C5"
                                    }} onClick={handleButtonNextClick}>
                                        Skip
                                    </Button>
                                </Grid>,
                                'rest': <Grid item xs={12} sm={12} style={{textAlign: "right"}}>
                                    <Button variant="contained" style={{
                                        margin: 10,
                                        paddingLeft: "5%",
                                        paddingRight: "5%",
                                        color: "white",
                                        background: "#3F88C5"
                                    }} onClick={handleButtonNextClick}>
                                        Skip
                                    </Button>
                                </Grid>,
                            }[typeLoad]
                        }
                    </Grid>
                </Box>
            </LargePlot>
        )
    }

    const Finish = () => {
        return (
            <LargePlot>
                <Box style={{marginTop: 20}}>
                    <Grid container spacing={3} style={{textAlign: "center"}}>
                        <Grid item xs={12} sm={12}/>
                        <Grid item xs={12} sm={12}/>
                        <Grid item xs={12} sm={12}>
                            <TitlePlot style={{display: "inline"}}>You are all set!</TitlePlot>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <CircleComplete style={{width: "100px", height: "100px"}}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" style={{
                                margin: 10,
                                paddingLeft: "5%",
                                paddingRight: "5%",
                                color: "white",
                                background: "#3F88C5"
                            }} onClick={handleGoBuckets}>
                                Close
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5}/>
                    </Grid>
                </Box>
            </LargePlot>
        )
    }

    return (
        <Sc.ContentWrapper>
            <Breadcrumb routeSegments={[{'name': 'Load data'}]}/>
            <ProgressBar progress={progress}/>
            <ContentWrapper>
                {
                    {
                        0: <FormInfo/>,
                        1: <SelectType/>,
                        2: <FormForData/>,
                        3: <ConfirmationForm/>,
                        4: <ProcessingForm/>,
                        5: <Finish/>
                    }[progress]
                }
            </ContentWrapper>
        </Sc.ContentWrapper>
    );
};

const styleSettings1 = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "28px",
    color: "#000000",
}

export default LoadData;