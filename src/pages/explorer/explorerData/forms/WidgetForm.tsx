import {Box, Button, Modal, Select, TextField, Tooltip, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import * as api from "../../../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";

const WidgetForm = ({formVisible, onCancel, onFinish}): JSX.Element => {
    const [dashboards, setDashboards] = useState<any[]>([])

    const defaultValues = {
        title: '',
        targetDashboard: '',
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const fetchDashboards = async () => {
        try {
            const response = await axios.get(api.dashboard(), {
                headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
            });
            console.log(response.data)
            setDashboards(response.data);
        } catch (error) {
            enqueueSnackbar("Some problems", {
                autoHideDuration: 5000,
                variant: "error"
            })
        }
    };

    useEffect(() => {
        fetchDashboards();
    }, []);

    return (
        <>
            <Modal
                open={formVisible}
                onClose={onCancel}
            >
                <Box sx={style}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                        <Typography variant="h6">Save As</Typography>
                        <Button onClick={onCancel} style={{
                            position: "absolute",
                            left: "92%",
                            top: "5px",
                            fontWeight: 700,
                            minWidth: "30px"
                        }}>
                            &#10005;
                        </Button>
                    </div>

                    <Formik onSubmit={onFinish} initialValues={defaultValues}>
                        <Form>
                            <Field name="title">
                                {({ field }) => (
                                <TextField
                                    required={true}
                                    {...field}
                                    label="Widget Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                )}
                            </Field>


                            <Field name="targetDashboard">
                                {({ field }) => (
                                <div>
                                        <label htmlFor="targetDashboard">Dashboard:</label>
                                        <Select
                                            required={true}
                                            {...field}
                                            id="targetDashboard"
                                            variant="outlined"
                                            fullWidth
                                        >
                                            {dashboards.map((dashboard) => (
                                                <MenuItem value={dashboard.id}>{dashboard.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                )}
                            </Field>

                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
                                <Button onClick={onCancel} variant="contained" color="secondary"
                                        style={{marginRight: '8px'}}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}

export default WidgetForm;