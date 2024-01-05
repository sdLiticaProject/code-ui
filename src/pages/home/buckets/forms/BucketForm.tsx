import {Box, Button, Modal, Select, TextField, Tooltip, Typography} from "@material-ui/core";
import {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import MenuItem from "@material-ui/core/MenuItem";

const BucketForm = ({formVisible, onCancel, onFinish, title, initialValues = undefined}): JSX.Element => {

    const defaultValues = {
        name: '',
        description: '',
        retention: '1h',
        customRetention: '',
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

    const retentionValues = [
        {
            name: "1 hour", value: "1h"
        },
        {
            name: "2 hour", value: "2h"
        },
        {
            name: "6 hour", value: "6h"
        },
        {
            name: "12 hour", value: "12h"
        },
        {
            name: "24 hour", value: "24h"
        },
        {
            name: "2 days", value: "2d"
        },
        {
            name: "7 days", value: "7d"
        },
        {
            name: "14 days", value: "14d"
        },
        {
            name: "30 days", value: "30d"
        },
        {
            name: "1 year", value: "1y"
        },
        {
            name: "Forever", value: "0s"
        }

    ]

    return (
        <>
            <Modal
                open={formVisible}
                onClose={onCancel}
                title={title}
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Typography variant="h6">{title}</Typography>
                        <Button onClick={onCancel} style={{position: "absolute", left: "92%", top: "5px", fontWeight: 700, minWidth: "30px"}}>
                            &#10005;
                        </Button>
                    </div>

                    <Formik initialValues={initialValues || defaultValues} onSubmit={onFinish}>
                        <Form>
                            <Field name="name">
                                {({ field }) => (
                                    <TextField
                                        required={true}
                                        {...field}
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                            </Field>

                            <Field name="description">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                            </Field>

                            <Field name="retention">
                                {({ field }) => (
                                    <div>
                                        <label htmlFor="retention">Retention:</label>
                                        <Select
                                            required={true}
                                            {...field}
                                            id="retention"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        >
                                            {retentionValues.map((retention) => (
                                                <MenuItem value={retention.value}>{retention.name}</MenuItem>
                                            ))}
                                            <MenuItem value="custom">Custom</MenuItem>
                                        </Select>
                                        {field.value === 'custom' && (
                                            <Tooltip title="Enter a custom retention value">
                                                <Field name="retentionPeriod">
                                                    {({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            required={true}
                                                            label="Custom Retention"
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            inputProps={{
                                                                pattern: "^((\\d+)(s|h|d|y)\\s?)+$",
                                                                title: "Invalid retention format. Valid examples: 1h, 20h, 2d, 60d, 1y, 100y, 10d 20h, 10y 2d 3h",
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Tooltip>
                                        )}
                                    </div>
                                )}
                            </Field>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <Button onClick={onCancel} variant="contained" color="secondary" style={{ marginRight: '8px' }}>
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

export default BucketForm;