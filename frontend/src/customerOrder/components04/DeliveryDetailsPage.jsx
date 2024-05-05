import React, { useState } from 'react';
import { Typography, Grid, TextField, Box, makeStyles, Button, Checkbox, Paper } from "@material-ui/core";
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    smallBox: {
        width: '150px', // Adjust the width as needed
        height: '50px', // Adjust the height as needed
        padding: '10px', // Adjust the padding as needed
        border: '1px solid #ccc', // Adjust the border style as needed
        borderRadius: '5px', // Adjust the border radius as needed
    },
    submitButton: {
        marginTop: '20px', // Adjust the margin top as needed
    },
}));


export function DeliveryDetailsPage({ setPage }) {
    const classes = useStyles();
    const [designChecked1, setDesignChecked1] = useState(false);
    const [designChecked2, setDesignChecked2] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams()

    const onSubmitForm = () => {
        var isValid = true;
        if (isValid) {
            setPage(2);
        }
    }

    const [formData, setFormData] = useState({
        address: "",
        cNumber: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDesignCheck1 = (event) => {
        setDesignChecked1(event.target.checked);
    };
    const handleDesignCheck2 = (event) => {
        setDesignChecked2(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(id)
        const apiAddresUrl = `http://localhost:8090/customer/order/${id}/setAddress`;
        console.log(formData)
        try {
            const response = await fetch(apiAddresUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData.address
            })

            if (response.ok) {
                const resData = await response.json()
                console.log(resData)
                alert('Form submitted successfully!');

                // navigate("/customer-order/delivery-details/"+ resData.orderID)

            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            alert('Failed to submit form.');
        }
    };

    return (
        <div style={{marginLeft:'20%'}}>
            <br></br>
            <br></br>
            <Paper style={{padding: 50, width: 900 }} elevation={5} >
            <Typography variant="h5" alignItems="center">Delivery Details</Typography>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">Delivery Address:</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField type="textBox" name="address" value={formData.address} onChange={handleChange} multiline rows={4} variant="outlined" />
                    </Grid>
                </Grid>
                <br></br>
                {/* <div style={{display:'flex'}} >
           
            <Grid container spacing={2} alignItems="center">
            <Typography variant="h6">City</Typography>
                <Grid item>
                    <TextField type="textBox" variant="outlined" />
                </Grid>
            </Grid>
            <br></br>
            
            <Grid container spacing={2} alignItems="center">
            <Typography variant="h6">country</Typography>
                <Grid item>
                    <TextField type="textBox" variant="outlined" />
                </Grid>
            </Grid>
            </div> */}
                <br></br>
                <div style={{ display: 'flex' }} >

                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="h6">Contact number</Typography>
                        <Grid item>
                            <TextField type="number" name="cNumber" value={formData.cNumber} onChange={handleChange} variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>

                    {/* <Grid container spacing={2} alignItems="center">
            <Typography variant="h6">contact person number</Typography>
                <Grid item>
                    <TextField type="number" variant="outlined" />
                </Grid>
            </Grid> */}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Typography variant="h6">Your order</Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Typography variant="h6">Total ($) = </Typography>
                <Button variant="contained" color="primary" type='submit' className={classes.submitButton}>
                    Pay now
                </Button>
            </form>
            </Paper>
        </div>
    )
}

export function SamplePage() {
    return <Typography variant="h5">Resume Page Content Customer Order</Typography>;
}

export function ProfilePage() {
    return <Typography variant="h5">Portfolio Page Content</Typography>;
}

export function LogoutPage() {
    return <Typography variant="h5">Contacts Page Content</Typography>;
}
