import {AiFillPlusCircle, MdSettings} from "react-icons/all";
import {Button, ButtonBucket} from "../Buckets.style";
import React, {useEffect, useState} from "react";
import {enqueueSnackbar, useSnackbar} from "notistack";
import BucketForm from "./BucketForm";
import axios from "axios";
import * as api from "../../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";

const UpdateBucketForm = ({onOk, bucketId}): JSX.Element => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const showModifyBucketModal = () => {
        setIsUpdateBucketModalOpen(true)
        showUpdateBucketModal(bucketId)
    }
    const handleUpdateBucketOk = () => {
        setIsUpdateBucketModalOpen(false)
        onOk()
    }
    const handleUpdateBucketCancel = () => {setIsUpdateBucketModalOpen(false)}
    const [initialValues, setInitialValues] = useState(undefined);
    const [isUpdateBucketModalOpen, setIsUpdateBucketModalOpen] = useState(false);

    const onFormSubmit = async (e) => {
        console.log("data-bucket:", e)

        const requestBody = {
            "name": e.name,
            "description": e.description,
            "retentionPeriod": e.retention !== 'custom' ? convertRetentionToSeconds(e.retention) : convertRetentionToSeconds(e.retentionPeriod)
        }

        try {
            const response = await axios.post(api.bucketList() + `/${bucketId}`, requestBody,{
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("Bucket update successfully ", {
                autoHideDuration: 2000,
                variant: "success"
            })
            handleUpdateBucketOk()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    const showUpdateBucketModal = async (bucketId) => {
        try {
            const response = await axios.get(api.bucketList() + `/${bucketId}`, {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            response.data["retention"] = "custom"
            response.data["retentionPeriod"] = response.data["retentionPeriod"] + "s"
            setInitialValues(response.data)
            setIsUpdateBucketModalOpen(true)
            console.log(response.data)

        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    }

    // useEffect(() => {
    //     showUpdateBucketModal(bucketId);
    // }, []);

    function convertRetentionToSeconds(retention) {
        const regex = /(\d+)([shdy])/g;
        let seconds = 0;

        console.log(retention)

        retention.replace(regex, function (match, value, unit) {
            value = parseInt(value);

            if (unit === 's'){
                seconds += value;
            } else if (unit === 'h') {
                seconds += value * 60 * 60;
            } else if (unit === 'd') {
                seconds += value * 24 * 60 * 60;
            } else if (unit === 'y') {
                seconds += value * 365 * 24 * 60 * 60;
            }

            return match;
        });

        return seconds;
    }

    return (
        <>
            <Button color={"white"} onClick={showModifyBucketModal}>
                <MdSettings/>
                Settings
            </Button>
            <BucketForm formVisible={isUpdateBucketModalOpen && initialValues !== undefined}
                        onCancel={handleUpdateBucketCancel}
                        onFinish={onFormSubmit}
                        title={"Update Bucket"}
                        initialValues={initialValues}
            />
        </>
    )
}

export default UpdateBucketForm;