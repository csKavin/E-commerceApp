import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  footerNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '0.5px solid #ccc',
  },
  navActionRoot: {
    padding: '6px 12px',
    minWidth: 'auto',
    flex: 'none',
    borderRadius: '19px',
    margin: '0 4px',
  },
  navActionSelected: {},
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '26px',
  },
  activeIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '19px',
    padding: '6px 16px',
  },
  activeLabel: {
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: '8px',
    color: '#212120',
  },
  footer: {
    '--background': '#1E1E1E',
    '--border-radius': '16px 16px 0 0',
  },
  toolbar: {
    padding: '0 8px',
    '--padding-top': '4px',
    '--padding-bottom': '4px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    '--color': 'rgba(255, 255, 255, 0.5)',
    '--color-activated': 'white',
    '--background': 'transparent',
    '--background-activated': 'transparent',
    '--background-focused': 'transparent',
    '--padding-top': '8px',
    '--padding-bottom': '8px',
  },
  activeButton: {
    '--background': '#2C2C2C',
    '--border-radius': '50%',
    width: '56px',
    height: '56px',
    marginTop: '-28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  label: {
    fontSize: '8px',
    marginTop: '2px',
  },
  [theme.breakpoints.down('md')]: {
    nav: {
      flexDirection: 'column', // Stack on smaller screens
    },
    profileStyle: {
      flexDirection: 'column', // Align items vertically on mobile
    },
    headBackIcons: {
      margin: '5px 0', // Reduce margin on smaller screens
    },
  },
}));
