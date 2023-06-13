import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import * as HpS from '../HomePage.styles';
import * as UpS from './UserProfile.styles';
import grp from '../../../assets/image/grp.png';
import {HOME, LOGIN, PAGE_USER_HISTORY} from '../../../constants/routes';
import {ContentWrapper, InputRow} from "../HomePage.styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {
    MyButton,
    Error, FormWrapper,
    InputFormWrapper,
    LoadIndicator,
    NavLinkWrapper,
    Transfer
} from "../../login/components/forms/FormsStyles";
import {useForm} from "react-hook-form";
import useActions from "../../../hooks/useAction";
import {updateUser} from "../../../actions/profileAction";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";

import {
    Button, FormControl, Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField
} from "@material-ui/core";
import {AiFillDelete, IoCopy} from "react-icons/all";

const UserProfile = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const {handleSubmit, register, errors} = useForm();
    const [submitAction] = useActions([updateUser]);
    const [apikeyList, setApikeyList] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [description, setDescription] = useState('');


    const submit = (data) => {
        if (data.firstName !== '' && data.lastName !== '') {
            submitAction(data.userId, data.firstName, data.lastName).then(async (e) => {

                window.location.reload(false);

            });
        }
    };

    const fetchApiKeys = async () => {
        try {
            const response = await axios.get(api.apikeyList(), {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            setApikeyList(response.data.entities);
            console.log(response.data.entities)
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteApiKey = async (apikey) => {
        try {
            const response = await axios.delete(api.apikeyList() + `/${apikey}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("ApiKey deleted successfully", {
                autoHideDuration: 2000,
                variant: "success"
            })
            fetchApiKeys()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    async function handleCreateApiKey(description) {
        const requestBody = {
            "description": description
        }

        try {
            const response = await axios.post(api.apikeyList(), requestBody, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("Apikey created successfully", {
                autoHideDuration: 2000,
                variant: "success"
            })
            fetchApiKeys()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    return (
        <HpS.ContentWrapper>
            <UpS.UserProfileInfo>My profile</UpS.UserProfileInfo>
            <UpS.GeneralInfoWrapper style={{padding: "10px 25px 25px"}}>
                <UpS.GIWImage src={grp}/>
                <UpS.GIInfoContainer>
                    <UpS.GIInfoTitle>General information</UpS.GIInfoTitle>
                    <HpS.ColWrapper>
                        <HpS.Col style={{marginRight: '30px'}}>
                            <HpS.InnerCol style={{marginLeft: '30px'}}>
                                <FormWrapper onSubmit={handleSubmit(submit)}>
                                    <InputFormWrapper style={{position: "absolute", left: "-9999px", top: "-9999px"}}>
                                        <label htmlFor="userId"/>
                                        <input defaultValue={user?.id} id="userId" name="userId"
                                               ref={register({
                                                   required: 'required',
                                               })}
                                        />
                                    </InputFormWrapper>
                                    <InputFormWrapper>
                                        <label htmlFor="firstName" style={{color: "black"}}>First Name:</label>
                                        <input
                                            defaultValue={user?.firstName}
                                            ref={register({
                                                required: 'required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]*$/i,
                                                    message: 'invalid first name',
                                                },
                                            })}
                                            id="firstName"
                                            name="firstName"
                                        />
                                        <Error>{errors.firstName && errors.firstName.message}</Error>
                                    </InputFormWrapper>
                                    <br/>
                                    <InputFormWrapper>
                                        <label htmlFor="lastName" style={{color: "black"}}>Last Name:</label>
                                        <input
                                            defaultValue={user?.lastName}
                                            ref={register({
                                                required: 'required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]*$/i,
                                                    message: 'invalid last name',
                                                },
                                            })}
                                            name="lastName"
                                            id="lastName"
                                        />
                                        <Error>{errors.lastName && errors.lastName.message}</Error>
                                    </InputFormWrapper>
                                    <br/>
                                    <MyButton type="submit">Update</MyButton>
                                </FormWrapper>
                            </HpS.InnerCol>
                        </HpS.Col>
                        <HpS.Col>
                            <HpS.InnerCol style={{borderLeft: `1px solid #3f88c5`, paddingLeft: `20px`}}>
                                <HpS.Row>e-mail:</HpS.Row>
                                <HpS.Row>
                                    <Link to={PAGE_USER_HISTORY}>Analytics history...</Link>
                                </HpS.Row>
                                <HpS.Row>
                                    Download as <Link><span>CSV</span></Link> / <Link><span>JSON</span></Link> ...
                                </HpS.Row>
                            </HpS.InnerCol>
                            <HpS.InnerCol style={{marginLeft: '30px'}}>
                                <HpS.Row>{user?.email}</HpS.Row>
                                <HpS.Row/>
                                <HpS.Row/>
                            </HpS.InnerCol>
                        </HpS.Col>
                    </HpS.ColWrapper>
                </UpS.GIInfoContainer>
            </UpS.GeneralInfoWrapper>
            <UpS.GeneralInfoWrapper style={{padding: "10px 25px 25px", marginTop: "20px"}}>
                <UpS.GIInfoContainer>
                    <UpS.GIInfoTitle>API access keys</UpS.GIInfoTitle>
                    <HpS.ColWrapper>
                        <Paper style={{width: '100%', overflow: 'hidden'}}>
                            <TableContainer style={{maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                #
                                            </TableCell>
                                            <TableCell style={{width: '30%'}}>
                                                Description
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                Key
                                            </TableCell>
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {apikeyList
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((apikey, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell align={"center"}>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{width: '30%'}}>
                                                            {apikey.description}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {apikey.key}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => {
                                                                navigator.clipboard.writeText(apikey.key)
                                                            }}><IoCopy/></Button>
                                                            <Button onClick={() => {
                                                                handleDeleteApiKey(apikey.id)
                                                            }}><AiFillDelete/></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 20]}
                                component="div"
                                count={apikeyList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <dl/>
                        </Paper>
                    </HpS.ColWrapper>
                    <HpS.ColWrapper>
                        <Paper style={{width: '100%', overflow: 'hidden', display: "flex"}}>
                            <FormControl style={{width: '100%', padding: "20px"}} fullWidth>
                                <Grid container spacing={3} style={{alignItems: "center"}}>
                                    <Grid item xs={12} sm={12}>
                                        <UpS.GIInfoTitleSmall>Add new API key</UpS.GIInfoTitleSmall>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            id="description"
                                            label="Please add description for the new API key"
                                            style={{width: '100%'}}
                                            value={description} onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button style={{backgroundColor: "#3F88C5", color: "white"}} variant="contained"
                                                onClick={() => handleCreateApiKey(description)}>Create</Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </Paper>
                    </HpS.ColWrapper>
                </UpS.GIInfoContainer>
            </UpS.GeneralInfoWrapper>
        </HpS.ContentWrapper>
    );
};

export default UserProfile;
