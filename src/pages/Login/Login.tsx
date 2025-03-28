import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import InputField from "../../components/InputField/index";
import Lottie from "react-lottie";
import animationData from "../../Assests/login/Animation - 1729704510007.json";
import Loader from '../../components/ProfilePage/TurboLoader/TurboLoader';
import { useHistory } from 'react-router';
import { IonContent, IonPage } from '@ionic/react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Import your Firebase config

export default function SignInScreen() {
    const history = useHistory();
    const [loader, setLoader] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>("");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, "sfjn");

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Sign-in function
    const handleSignIn = async () => {
        setLoader(true);
        setError("");

        if (!formData.email || !formData.password) {
            setError("All fields are required.");
            setLoader(false);
            return;
        }
        console.log(formData, "dlfjkndfjo");


        try {
            // Firebase Auth - Sign in user
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

            // Get User ID
            const userId = userCredential.user.uid;
            console.log("User ID:", userId);
            localStorage.setItem("userId",userId)
            // Redirect to home after successful sign-in
            history.push("/home");
        } catch (error: any) {
            setError("Invalid email or password. Please try again.");
        }

        setLoader(false);
    };

    return (
        <IonPage>
            <IonContent>
                <Container component="main" maxWidth="xs">
                    <Loader loading={loader} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: "100%",
                        }}
                    >
                        <Lottie options={defaultOptions} width={250} />
                        <Typography variant="h5" align="center">Sign In</Typography>

                        {error && <Typography color="error" align="center">{error}</Typography>}

                        <Box component="div" sx={{ mt: 2 }}>
                            <TextField
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                            />

                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                variant="outlined"
                                onChange={handleChange}
                                className='mt-4'
                            />
                            <Typography color='primary' onClick={() => history.push("/signUp")}>Don't have a Account please sign up</Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, py: 1.5 }}
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </IonContent>
        </IonPage>
    );
}
