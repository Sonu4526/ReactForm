import React, { useState } from "react";
import {
    TextField,
    Box,
    Grid,
    InputLabel,
    Typography,
    Button
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GeoLocation from "./Geolocation";

const Demo = () => {
    const [count, setCount] = useState(0);
    const [content, setContent] = useState();
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const onSubmit = (data) => {
        console.log({ data: data, countryID: country, stateID: state, cityID: city, Message: content })
    }

    const handleContent = (value) => {
        console.log(value)
        setContent(value)
        const getNormalisedString = (str) => (str ?? '').replace(/<\/?[^>]+(>|$)/g, "");
        setCount(getNormalisedString(value).length);
    };

    const { register, handleSubmit, errors } = useForm();
    // if (country == null) {
    //     errors.country = ""
    // } else {
    //     console.log("Ok")

    //     errors.country = {
    //         "message": "Please select Country",
    //         "ref": "input#combo-box-demo.MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input.MuiAutocomplete-inputFocused.MuiInputBase-inputAdornedEnd.MuiOutlinedInput-inputAdornedEnd.MuiInputBase-inputMarginDense.MuiOutlinedInput-inputMarginDense",
    //         "type": "required"
    //     }
    // }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={1}></Grid>
                    <Grid item md={5} xs={10} spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                placeholder="Enter Your Name"
                                variant="outlined"
                                margin="normal"
                                label="Enter Your Name"
                                fullWidth
                                // className={classes.inputField}
                                name="name"
                                inputRef={register({
                                    required: "Name is required.",
                                })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField
                                // className={classes.textfield}
                                placeholder="Enter Your Email"
                                label="Enter Your Email"
                                type="email"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                name="email"
                                inputRef={register({
                                    required: "Email Address is required.",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                placeholder="Enter Your Phone Number"
                                label="Phone Number"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                // className={classes.inputField}
                                name="phone"
                                inputRef={register({
                                    required: "Phone Number is required.",
                                    pattern: {
                                        value: /^[0-9\b]+$/,
                                        message: 'Invalid number',
                                    },
                                    min: {
                                        value: 1000000000,
                                        message: 'Mobile Number should be 10 digits',
                                    },
                                })}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12} sm={12} md={12}>
                            <GeoLocation
                                locationTitle="Country"
                                isCountry
                                onChange={setCountry}
                                inputRef={register({
                                    required: "Country is required.",
                                })}
                                error={Boolean(errors.country)}
                                helperText={errors.country?.message}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12} sm={12} md={12}>
                            <GeoLocation
                                locationTitle="State"
                                onChange={setState}
                                geoId={country}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12} sm={12} md={12}>
                            <GeoLocation
                                locationTitle="City"
                                onChange={setCity}
                                geoId={state}
                            />
                        </Grid>
                        <br />
                        {/* description textfield */}
                        <Grid item xs={12} sm={12}  >
                            <Box mb={4}>
                                <InputLabel required>message</InputLabel>
                                <br />
                                <ReactQuill
                                    style={{
                                        height: "70px",
                                        lineHeight: "0px",
                                    }}
                                    theme="snow"
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', { 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ],
                                    }}
                                    formats={[
                                        'bold', 'italic', 'underline',
                                        'list', 'bullet',
                                    ]}
                                    placeholder="Please add your requirments you're looking for"
                                    onChange={(value) => handleContent(value)}
                                />
                            </Box>
                            <br />
                            <Typography align="right" variant="body2">
                                {" "}
                                {count}/1000
                            </Typography>
                        </Grid>
                        <Grid >
                            <Button variant="contained" fullWidth type="submit" >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid >
            </form>
        </div>
    )
};

export default Demo;


