import React, { useState, useEffect, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';



/* Theme variables */
import './theme/variables.css';
import { lightTheme, darkTheme } from './theme/theme';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Login from './pages/Login/Login';
import LandingPage from './pages/home/home';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getData } from './Utils/service';
import { collections } from './firebaseConfig';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        // Notify the user or perform an action when new content is available
        console.log('New content is available. Please refresh.');
      },
      onSuccess: (registration) => {
        // When the service worker is successfully registered
        console.log('Service Worker has been successfully registered.');
      },
    });
  }, []);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   return savedTheme === 'dark';
  // });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/custom-service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', 'dark');
  }, [isDarkMode]);


  const toggleTheme = () => {
    // setIsDarkMode(prevMode : any => !prevMode);
    setIsDarkMode(!isDarkMode);
  };

  const fetchData = () => {
    getData(collections.PRODUCTS,"").then((res) => {
      console.log(res,"dfoihdsfiou");
      
    }).catch((err) => {
        console.log(err);
 
    })
    getData(collections.TYPES,"").then((res) => {
      console.log(res,"dfoihdsfiodsfdsu");
      
    }).catch((err) => {
        console.log(err);
    
    })
}

useEffect(() => {
    fetchData();
}, [])
  return (
    <ThemeProvider theme={!isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Suspense>
              <Route exact path="/login" render={() => {
                return (
                  <Login />
                )
              }}>
              </Route>
              <Route exact path="/home" render={() => {
                return (
                  <LandingPage />
                )
              }}>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </Suspense>
          </IonRouterOutlet>
        </IonReactRouter>
        {/* <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> */}
      </IonApp>
    </ThemeProvider>
  );
};



export default App;
