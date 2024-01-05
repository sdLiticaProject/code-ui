import {Box, Button, Grid} from "@material-ui/core";
import {AiFillDelete, BiRefresh, BsFillGrid3X3GapFill} from "react-icons/all";
import React from "react";
import styled from "styled-components";
import {SaveAlt} from "@material-ui/icons";
import axios from "axios";
import * as api from "../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";

const SpecGrid = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '5px',
    border: "1px solid #3F88C5",
    padding: "10px",
    background: "white",

    boxZizing: "border-box",

    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
});

const Panel = (): JSX.Element => {

    const onSumbitSave = async () => {
        enqueueSnackbar("Dashboard saved successfully", {
            autoHideDuration: 2000,
            variant: "success"
        })
    };

    return (
        <SpecGrid>
            <Grid item xs={12} sm={1}>
                <Button variant="contained">
                    Add Widget
                </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
                <Button variant="contained" style={{width: 118, height: 36}}>
                    <BiRefresh/>
                </Button>
            </Grid>
            <Grid item xs={12} sm={8}/>
            <Grid item xs={12} sm={2} style={{textAlign: "right"}}>
                <Button variant="contained" onClick={onSumbitSave}>
                    SAVE
                </Button>
            </Grid>
        </SpecGrid>
    )
}

export default Panel;