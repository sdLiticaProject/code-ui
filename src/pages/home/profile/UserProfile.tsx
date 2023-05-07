import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import * as HpS from '../HomePage.styles';
import * as UpS from './UserProfile.styles';
import grp from '../../../assets/image/grp.png';
import {HOME, LOGIN, PAGE_USER_HISTORY} from '../../../constants/routes';
import {ContentWrapper, InputRow} from "../HomePage.styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {
    Button,
    Error, FormWrapper,
    InputFormWrapper,
    LoadIndicator,
    NavLinkWrapper,
    Transfer
} from "../../login/components/forms/FormsStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useForm} from "react-hook-form";
import useActions from "../../../hooks/useAction";
import {UPDATE_FAIL, UPDATE_LOADING, UPDATE_SUCCESS, updateUser} from "../../../actions/profileAction";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";

const UserProfile = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user);
    const {handleSubmit, register, errors} = useForm();
    const [submitAction] = useActions([updateUser]);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    const submit = (data) => {
        if (data.firstName !== '' && data.lastName !== '') {
            submitAction(data.userId, data.firstName, data.lastName).then(async (e) => {

                window.location.reload(false);

            });
        }
    };

    return (
        <HpS.ContentWrapper>
            <UpS.UserProfileInfo>My profile</UpS.UserProfileInfo>
            <UpS.GeneralInfoWrapper>
                <UpS.GIWImage src={grp}/>
                <UpS.GIInfoContainer>
                    <UpS.GIInfoTitle>General information</UpS.GIInfoTitle>
                    <HpS.ColWrapper>
                        <HpS.Col style={{marginRight: '30px'}}>
                            <HpS.InnerCol style={{marginLeft: '30px'}}>
                                <FormWrapper onSubmit={handleSubmit(submit)} >
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
                                    <Button type="submit">Update</Button>
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
                                    Download as <span>CSV</span> / <span>JSON</span> ...
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
            <UpS.GeneralInfoWrapper>
                <UpS.GIInfoContainer>
                    <UpS.GIInfoTitle>API access keys</UpS.GIInfoTitle>
                </UpS.GIInfoContainer>
            </UpS.GeneralInfoWrapper>
        </HpS.ContentWrapper>
    );
};

export default UserProfile;
