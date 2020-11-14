import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
  typography: {
    h6: {
      fontWeight: 'bold',
      lineHeight: 1.65,
    },
    subtitle1: {
      lineHeight: 1.25,
    },
    overline: {
      color: 'black',
      lineHeight: 0.25,
    },
  },
});

export default theme;
