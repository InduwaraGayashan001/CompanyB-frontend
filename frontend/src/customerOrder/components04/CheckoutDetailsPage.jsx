import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    makeStyles,
    Button,
    Checkbox,
    Dialog,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
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
    ratingButton: {
        marginRight: '10px', // Adjust the margin right as needed
    },
    selectedRatingButton: {
        backgroundColor: theme.palette.primary.main, // Customize the selected button color
        color: theme.palette.primary.contrastText, // Customize the selected button text color
        marginRight: '10px', // Adjust the margin right as needed
    },
}));

export function CheckoutDetailsPage() {
    const classes = useStyles();
    const [designChecked1, setDesignChecked1] = useState(false);
    const [designChecked2, setDesignChecked2] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false); // New state for submitted rating
    const navigate = useNavigate();

    const onSubmitForm = () => {
        var isValid = true;
        if (isValid) {
            navigate('/')
        }
    }

    const { id } = useParams()
    console.log(id)

    const handleDesignCheck1 = (event) => {
        setDesignChecked1(event.target.checked);
    };
    const handleDesignCheck2 = (event) => {
        setDesignChecked2(event.target.checked);
    };

    const handleOpenFeedback = () => {
        setOpenFeedback(true);
    };

    const handleCloseFeedback = () => {
        setOpenFeedback(false);
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleFeedbackSubmit = () => {
        // Handle feedback submission logic here
        // For example, you can set a submitted state to true
        setSubmitted(true);
    };

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        console.log("sddklmlsmd")
        const fetchData = async () => {
            try {
                setIsLoading(true)
                console.log(id)
                const response = await fetch(`http://localhost:8090/customer/order/${id}`)
                if (!response.ok) {
                    throw new Error("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah")
                }
                const jsonData = await response.json()
                setData(jsonData)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
        fetchData()
    }, [id])
    if (isLoading) {
        return (

            <div>Loading</div>

        )
    }
    console.log(data)
    // const deliveryChecked = data.deliveryStatus != null ? true : false
    // const manufactureChecked = data.manufactureDone != null ? true : false
    return (
        <>
            <br></br>
            <br></br>
            <Typography variant="h5" alignItems="center">Checkout Details</Typography>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ display: 'flex' }}>
                <Typography variant="h6">Manufucturing status</Typography>
                <Checkbox checked={true} />
            </div>
            <br></br>
            <div style={{ display: 'flex' }}>
                <Typography variant="h6">Delivery Status</Typography>
                <Checkbox checked={false} />
            </div>
            <br></br>
            <Grid container spacing={2} alignItems="center">
                <Typography sx={{ ml: 2 }} variant="h6">Order ID</Typography>
                <Grid item>
                    <TextField type="number" value={data.orderID} disabled variant="outlined" />
                </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2} alignItems="center">
                <Typography variant="h6">Address</Typography>
                <Grid item>
                    <TextField type="text" value={data.deliveryAddress} multiline rows={4} variant="outlined" />
                </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2} alignItems="center">
                <Typography variant="h6">payment</Typography>
                <Grid item>
                    <TextField type="number" value={data.payment} variant="outlined" />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleOpenFeedback} className={classes.submitButton}>
                feedback
            </Button>
            <Dialog open={openFeedback} onClose={handleCloseFeedback}>
                <DialogTitle>Feedback</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Rate your experience:</Typography>
                    <Box>
                        {[...Array(10)].map((_, index) => (
                            <Button
                                key={index + 1}
                                variant={rating === index + 1 ? "contained" : "outlined"}
                                color={rating === index + 1 ? "primary" : "default"}
                                className={rating === index + 1 ? classes.selectedRatingButton : classes.ratingButton}
                                onClick={() => handleRatingClick(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Box>
                    {submitted && <Typography variant="body2">Thank you for your feedback!</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFeedbackSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
