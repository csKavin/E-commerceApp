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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig" // Import your Firebase config

export default function SignUpScreen() {
    const history = useHistory();
    const [loader, setLoader] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Sign-up function
    const handleSignUp = async () => {
        setLoader(true);
        setError("");

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            setLoader(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoader(false);
            return;
        }

        try {
            // Firebase Auth - Create user
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            // Add user to Firestore
            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                email: formData.email,
                role: 'USER', // You can change role as needed
                createdAt: new Date(),
            });

            // Redirect to home after successful sign-up
            history.push("/home");
        } catch (error: any) {
            setError(error.message);
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
                        <Typography variant="h5" align="center">Sign Up</Typography>

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
                                onChange={handleChange}
                                className='mt-4'
                            />
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className='mt-4'

                            />
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                placeholder="Re-enter your password"
                                onChange={handleChange}
                                className='mt-4'

                            />
                            <Typography color='primary' onClick={() => history.push("/login")}>Already have a Account please sign up</Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, py: 1.5 }}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </IonContent>
        </IonPage>
    );
}
