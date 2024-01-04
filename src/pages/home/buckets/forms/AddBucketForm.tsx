import {AiFillPlusCircle} from "react-icons/all";
import {ButtonBucket} from "../Buckets.style";
import React, {useState} from "react";
import {enqueueSnackbar, useSnackbar} from "notistack";
import BucketForm from "./BucketForm";
import axios from "axios";
import * as api from "../../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";

const AddBucketForm = ({onOk}): JSX.Element => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [isAddBucketModalOpen, setIsAddBucketModalOpen] = useState(false)
    const showModifyBucketModal = () => {setIsAddBucketModalOpen(true)}
    const handleAddBucketOk = () => {
        setIsAddBucketModalOpen(false)
        onOk()
    }
    const handleAddBucketCancel = () => {setIsAddBucketModalOpen(false)}

    const onFormSubmit = async (e) => {
        console.log("data-bucket:", e)
        if (e.retention !== 'custom') {
            console.log(convertRetentionToSeconds(e.retention))
        } else {
            console.log(convertRetentionToSeconds(e.customRetention))
        }

        const requestBody = {
            "name": e.name,
            "description": e.description,
            "retentionPeriod": e.retention !== 'custom' ? convertRetentionToSeconds(e.retention) : convertRetentionToSeconds(e.retentionPeriod)
        }

        try {
            const response = await axios.post(api.bucketList(), requestBody,{
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            enqueueSnackbar("Bucket created successfully ", {
                autoHideDuration: 2000,
                variant: "success"
            })
            handleAddBucketOk()
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }

    }

    function convertRetentionToSeconds(retention) {
        const regex = /(\d+)([hdy])/g;
        let seconds = 0;

        retention.replace(regex, function (match, value, unit) {
            value = parseInt(value);

            if (unit === 'h') {
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
            <ButtonBucket onClick={showModifyBucketModal}>
                <AiFillPlusCircle style={{width: "25px", height: "25px"}}/>
                New
            </ButtonBucket>
            <BucketForm formVisible={isAddBucketModalOpen}
                        onCancel={handleAddBucketCancel}
                        onFinish={onFormSubmit}
                        title={"Create Bucket"}
            />
        </>
    )
}

export default AddBucketForm;