import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Link,
    IconButton,
    Divider,
} from '@mui/material';
import InputField from "../../components/InputField/index";
import fb from "../../Assests/login/fb.svg";
import goole from "../../Assests/login/google.svg";
import Lottie from "react-lottie";
import animationData from "../../Assests/login/Animation - 1729704510007.json";
import Loader from '../../components/ProfilePage/TurboLoader/TurboLoader';
import { useHistory } from 'react-router';
import { IonContent, IonPage } from '@ionic/react';


export default function LoginScreen() {
    const history = useHistory();
    const [loader, setLoader] = React.useState<boolean>(false)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            scale: 0.5,
        },
    };

    const handleSubmit = () => {
        setLoader(true);
        setTimeout(() => {
            history.push("/home");
        }, 2000); // Delay of 2000 milliseconds (2 seconds)
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
                            // overflowY : "scroll",
                            // minHeight: "100vh"
                        }}
                    >

                        <Lottie options={defaultOptions} width={250} />


                        <Box component="div" sx={{ mt: 1 }} className='w-100'>
                            <InputField
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter your email address"
                                autoFocus
                            />
                            <InputField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                placeholder="Email your Password"
                                sx={{ background: '#F1F4FF', color: "#626262" }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                                onClick={() => handleSubmit()}
                            >
                                Sign in
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </IonContent>
        </IonPage>
    );
}