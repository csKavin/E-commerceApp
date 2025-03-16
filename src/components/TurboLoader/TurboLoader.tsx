import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import loader from "../../Assests/login/Animation - 1729705082809.json"
import Lottie from "react-lottie";

const useStyles: any = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
export default function Loader({ loading }: { loading: boolean }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          scale: 0.5, 
        },
      };
    return (
        <div>
            {
                loading ?
                    < div style={useStyles} data-testId='KenLoader'>
                        {/* <CircularProgress sx={{ color: 'white' }} /> */}
                        <Lottie options={defaultOptions}  width={200}  height={200}/>
                    </div>
                    : null

            }

        </div >
    );
}
