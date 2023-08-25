import { alpha, } from '@mui/material/styles';
import {
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
    blackColor,
} from 'assets/jss/m-d-r/material-dashboard-react.js';

const ctmdrTheme = {
    defaultFont: {
        fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
        fontWeight: '300',
        lineHeight: '1.5em',
    },
    boxShadow: {
        default:
            `0 10px 30px -12px ${alpha( blackColor, 0.42 )}` +
            `, 0 4px 25px 0px ${alpha( blackColor, 0.12 )}` +
            `, 0 8px 10px -5px ${alpha( blackColor, 0.2 )}`,
        primary:
            `0 4px 20px 0 ${alpha('#000', .14)}, ` +
            `0 7px 10px -5px ${alpha(primaryColor[0], .4)}`,
    },
    palette: {
        danger:   dangerColor,
        info:       infoColor,
        primary: primaryColor,
        secondary:  roseColor,
        success: successColor,
        warning: warningColor,
        gray: [
            '#999999', '#777777', '#3c4858', '#aaaaaa',
            '#d2d2d2', '#dddddd', '#b4b4b4', '#555555',
            '#333333', '#a9afbb', '#eeeeee', '#e7e7e7',
        ],
    },
    colorsMatrix: {
        /* color to hue */
        danger:     'red',
        info:      'blue',
        primary: 'purple',
        success:  'green',
        warning: 'orange',
        /* hue to color */
        blue:      'info',
        green:  'success',
        orange: 'warning',
        purple: 'primary',
        red:     'danger',
    },
    container: {
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    drawerWidth: 260,
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

export default ctmdrTheme;
