import {
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { HiArrowsRightLeft } from "react-icons/hi2";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
  BottomNavigationAction,
  BottomNavigation
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
//   import Images from "../../assests/assetHelper";
//   import { ReactChildren } from "../../interfaces/Common";
//   import { clearStorage } from "../../utils/Storage";
//   import routes from "../../utils/routes";
import { useStyles } from "./styles";
//   import Logo from "../../assests/Logo.png"
//   import Switcher from "./toggleSwitch";
//   import { isIos } from "../../utils/helpers";
import HomeIcon from '@mui/icons-material/Home';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShopIcon from '@mui/icons-material/Shop';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AppLayout: React.FunctionComponent<any & { showFooter?: boolean }> = ({ children, showFooter = true }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const isMobile = true;
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    const currentRoute = location.pathname;
    const currentIndex = menuItems.findIndex(item => item.route === currentRoute);
    if (currentIndex !== -1) {
      setValue(currentIndex);
    }
  }, [location.pathname]);

  // console.log(children, "dataChild")

  const handleLogout: () => void = async () => {
    //   await clearStorage();
    history.push("/");
  };

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const menuItems = [
    {
      name: "Home", icon: <HomeOutlinedIcon />,
      route: "/home"
    },
    {
      name: "Orders", icon: <ShopIcon />,
      route: "/order"
    },
    {
      name: "Profile", icon: <AccountCircleIcon />,
      route: "/profile"
    }
  ];
  // temp static data
  const userProfile = {
    name: "Rubina",
    avatarUrl: "path/to/avatar.png",
    profileCompletion: 0
  };
  // mobile
  const [value, setValue] = useState(0);

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    history.push(menuItems[newValue].route);
  };
  return (
    <>
      {isMobile ? (
        <>
          <div style={{ display: "flex", flexDirection: "column"}}>
            <IonContent style={{ flex: 1, background: "#F6F8FB" }}>
              <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>) => {
                setTimeout(() => {
                  event.detail.complete();
                }, 2000);
              }}>
                <IonRefresherContent />
              </IonRefresher>
              {children}
            </IonContent>
            {showFooter && (
              <IonFooter>
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => handleNavigation(newValue)}
                  showLabels
                  className={classes.footerNav}
                >
                  {menuItems.map((item, index) => (
                    <BottomNavigationAction
                      key={index}
                      sx={{ "& .Mui-selected": { display: "none" } }}
                      label={value === index ? item.name : ''}
                      icon={
                        <Box className={value === index ? classes.activeIconWrapper : classes.iconWrapper}>
                          {item.icon}
                          {value === index && (
                            <div className="font-14-bluegrey-600 px-1">
                              {item.name}
                            </div>
                          )}
                        </Box>
                      }
                      className={value === index ? classes.navActionSelected : classes.navActionRoot}
                    />
                  ))}
                </BottomNavigation>
              </IonFooter>
            )}
          </div>

          {showFooter && (
            <IonFooter>
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => handleNavigation(newValue)}
                showLabels
                className={classes.footerNav}
              //   style={{ height: isIos() ? '4.5rem' : '3.5rem' }}
              >
                {menuItems.map((item, index) => (
                  <BottomNavigationAction
                    key={index}
                    sx={{ "& .Mui-selected": { display: "none" } }}
                    label={value === index ? item.name : ''}
                    icon={
                      <Box className={value === index ? classes.activeIconWrapper : classes.iconWrapper}
                      // style={{ marginBottom: isIos() ? '10px' : '' }}
                      >
                        {item.icon}
                        {/* <img src={item.icon} alt={item.name} className={classes.icon} style={{ height: 20 }} /> */}
                        {value === index && (
                          <div className="font-14-bluegrey-600 px-1">
                            {item.name}
                          </div>
                        )}
                      </Box>
                    }
                    className={value === index ? classes.navActionSelected : classes.navActionRoot}
                  />
                ))}
              </BottomNavigation>
            </IonFooter>
          )}
        </>
      ) : (
        <>
          <Grid
            container
            direction="row"
            sx={{ height: '100vh', overflow: 'hidden' }}
          >
            <Grid item>
              <Grid container sx={{ px: 20, py: 4 }}>
                <Grid item md={2} className={classes.nav}>
                  {/* <img src={Logo} className={classes.headBack} /> */}
                </Grid>

                <Grid item md={5}>
                  <Box className={`${classes.nav} ${classes.headBack} ${classes.textColor} ${classes.navFontSize}`}>
                    {menuItems.map((item, index) => (
                      <Button
                        key={index}
                        sx={{ flex: 1, textAlign: 'center' }}
                        color="inherit"
                      >
                        <Typography variant="button">{item.name}</Typography>
                      </Button>
                    ))}
                  </Box>
                </Grid>

                <Grid item md={1}></Grid>

                <Grid item xs={12} md={4}>
                  <Box className={classes.nav}>
                    {/* <Switcher /> */}
                    <HiArrowsRightLeft
                      style={{ fontSize: '24px' }}
                      className={`${classes.headBackIcons} ${classes.textColor}`}
                    />
                    <NotificationsNoneOutlinedIcon
                      style={{ fontSize: '24px' }}
                      className={`${classes.headBackIcons} ${classes.textColor}`}
                    />

                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      className={`${classes.profileStyle} ${classes.textColor}`}
                    >
                      <Avatar
                        src={userProfile.avatarUrl}
                        sx={{ width: '60px', height: '60px' }}
                      />
                      <Box sx={{ marginLeft: 2 }}>
                        <Typography variant="body1" className={classes.profileName}>
                          {userProfile.name}
                        </Typography>
                        <Typography variant="body2">
                          <span className={classes.profileComple}>Complete Profile</span>
                          <Box component="span" className={classes.percentage}>
                            {userProfile.profileCompletion}%
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 1, overflow: 'auto' }}>
              {children}
            </Grid>
          </Grid>
        </>
      )
      }
    </>
  );
};

export default AppLayout;