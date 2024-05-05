import React, { useState } from 'react';
import { Typography, Grid, TextField, Box, makeStyles, Button, Checkbox } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { DeliveryDetailsPage } from './DeliveryDetailsPage';
import { CheckoutDetailsPage } from './CheckoutDetailsPage';


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





export function DashboardPage() {
    const classes = useStyles();
    const [designChecked1, setDesignChecked1] = useState(false);
    const [designChecked2, setDesignChecked2] = useState(false);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        layers: 0,
        thickness: 0,
        quantity: 0,
        width: 0,
        height: 0,


    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmitForm = () => {
        var isValid = true;
        if (isValid) {
            setPage(1);
        }
    }

    const handleDesignCheck1 = (event) => {
        setDesignChecked1(event.target.checked);
    };
    const handleDesignCheck2 = (event) => {
        setDesignChecked2(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = 'http://localhost:8090/customer/order';
        console.log(formData)
        try {
            const data = {
                layers: formData.layers,
                thickness: formData.thickness,
                quantity: formData.quantity,
                dimensions: [
                    formData.width,
                    formData.height,
                ]
            }
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const resData = await response.json()
                console.log(resData)
                console.log('Form submitted successfully:', response.data);
                alert('Form submitted successfully!');
                
                navigate("/customer-order/delivery-details/"+ resData.orderID)

            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            alert('Failed to submit form.');
        }
    };


    return (
        <>{
            page === 0 ? <>
                <br></br>
                <br></br>
                <Typography variant="h5">Order Details</Typography>
                <br></br>
                <input type="file" />
                <br></br>
                <br></br>
                <br></br>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="h6">Layers</Typography>
                        <Grid item>
                            <TextField type="number" name="layers" value={formData.layers} onChange={handleChange} variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="h6">Quantity</Typography>
                        <Grid item>
                            <TextField type="number" name="quantity" value={formData.quantity} onChange={handleChange} variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="h6">Thickness(mm)</Typography>
                        <Grid item>
                            <TextField type="number" name="thickness" value={formData.thickness} onChange={handleChange} variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2} alignItems="center">
                        <Typography variant="h6">Dimensions(mm<sup>2</sup>)</Typography>
                        <Grid item>
                            <TextField type="number" name="width" value={formData.width} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Typography variant="h6">*</Typography>
                        <Grid item>
                            <TextField type="number" name="height" value={formData.height} onChange={handleChange} variant="outlined" />
                        </Grid>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" type='submit' className={classes.submitButton}>
                        Submit
                    </Button>
                </form>
                <br></br>
                <br></br>
                <div style={{ display: 'flex' }} >
                    <Typography variant="h6">Design check</Typography>
                    <Checkbox checked={designChecked1} onChange={handleDesignCheck1} />
                </div>
                <br></br>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6">purts check</Typography>
                    <Checkbox checked={designChecked2} onChange={handleDesignCheck2} />
                </div>
            </> : page === 1 ? <DeliveryDetailsPage setPage={setPage} /> : <CheckoutDetailsPage setPage={setPage} />
        }
        </>
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



