import React, {useState} from "react";
import {useSnackbar} from "notistack";
import axios from "axios";
import * as api from "../../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import WidgetForm from "./WidgetForm";
import {Button} from "@material-ui/core";

const SaveWidgetForm = (): JSX.Element => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const showWidgetModal = () => {
        setIsWidgetModalOpen(true)
    }
    const handleUpdateBucketOk = () => {
        setIsWidgetModalOpen(false)
    }
    const handleWidgetCancel = () => {
        setIsWidgetModalOpen(false)
    }
    const [initialValues, setInitialValues] = useState(undefined);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);

    const onFormSubmit = async (e) => {
        console.log("widget-data:", e)
        handleUpdateBucketOk()
        enqueueSnackbar("Widget saved successfully ", {
            autoHideDuration: 2000,
            variant: "success"
        })

        // const requestBody = {
        //     "name": e.name,
        //     "description": e.description,
        //     "retentionPeriod": e.retention !== 'custom' ? convertRetentionToSeconds(e.retention) : convertRetentionToSeconds(e.retentionPeriod)
        // }

        // try {
        //     const response = await axios.post(api.bucketList() + `/${bucketId}`, requestBody,{
        //         headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
        //     });
        //     enqueueSnackbar("Bucket update successfully ", {
        //         autoHideDuration: 5000,
        //         variant: "success"
        //     })
        //     handleUpdateBucketOk()
        // } catch (error) {
        //     enqueueSnackbar("Some problems", {
        //         autoHideDuration: 5000,
        //         variant: "error"
        //     })
        // }
    }


    return (
        <>
            <Button variant="contained" onClick={showWidgetModal}>
                Save As
            </Button>
            <WidgetForm formVisible={isWidgetModalOpen}
                        onCancel={handleWidgetCancel}
                        onFinish={onFormSubmit}
            />
        </>
    )
}

export default SaveWidgetForm;