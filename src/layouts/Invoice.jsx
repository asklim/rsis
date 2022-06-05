import * as React from 'react';
import { Outlet, } from 'react-router-dom';

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles'; //v.5
import {
    Box,
} from '@mui/material';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// core components
import Footer from '../components/Footer/Footer.jsx';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin.jsx';

import Navbar from '../components/Navbars/Navbar.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png'; // must be an image

import routes from './invoice-routes.js';

//const useStyles = makeStyles( styles );
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md

const PREFIX = 'InvoiceLayout';
const classes = {
    root:        `${PREFIX}-root`,
    mainPanel:   `${PREFIX}-mainPanel`,
    scrollCntnr: `${PREFIX}-scrollCntnr`,
    content:     `${PREFIX}-content`,
    container:   `${PREFIX}-container`,
};

// eslint-disable-next-line no-unused-vars
const LayoutSxDiv = styled('div')( ({ theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces (root styles)
        display: 'flex',
        height: '100vh',
        position: 'relative',
        top: '0',
    },
}));

const MainPanel = styled('div')( ({ theme }) => {
    const { drawerWidth, transition } = theme.ctmdr;
    const navbarHeight = 84;
    return ({
        [`&.${classes.mainPanel}`]: {
            // `&.${...` without spaces (root styles)
            flexShrink: 0,
            float: 'right',
            maxHeight: '100%',
            overflow: 'hidden',
            position: 'relative',
            top: 0,
            transition: transition,
            width: '100%',
            WebkitOverflowScrolling: 'touch',
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`
            },
        },
        [`&${' '}.${classes.scrollCntnr}`]: {
            height: `calc(100vh - ${navbarHeight}px)`,
            //marginTop: '0px',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
        },
        [`&${' '}.${classes.container}`]: {
            //marginTop: '70px',
            minHeight: 'calc(100vh - 123px)',
            padding: '30px 15px',
        },
        [`&${' '}.${classes.content}`]: {
            marginTop: '0px',
        },
    });
});

let ps;


export default function InvoiceBoard ({ ...rest }) {

    // states and functions
    const [ image, setImage ] = React.useState( bgImage );
    const [ hue, setHue ] = React.useState('blue');

    const [ mobileOpen, setMobileOpen ] = React.useState( false );
    const handleDrawerToggle = () =>  setMobileOpen( !mobileOpen );
    const resizeFunction = () =>
        (window.innerWidth > MD_BREAKPOINT) && setMobileOpen( false );

    const [ menuShow, toggleMenuShow ] = React.useReducer( (x) => !x, false );
    // const handleFixedClick = () => setMenuShow( !menuShow );

    // ref to help us initialize PerfectScrollbar on windows devices
    const layoutRef = React.createRef();

    React.useEffect(() => {
        // initialize and destroy the PerfectScrollbar plugin
        const isWinPlatform = navigator?.userAgent?.includes('Win');

        if( isWinPlatform ) {
            let ctx = layoutRef.current.querySelector(`.${classes.scrollCntnr}`);
            ps = new PerfectScrollbar( ctx, {
                suppressScrollX: true,
                //suppressScrollY: false
            });
            document.body.style.overflow = 'hidden';
        }
        window.addEventListener('resize', resizeFunction );
        // Specify how to clean up after this effect:
        return (
            function cleanup() {
                if( isWinPlatform ) {
                    ps?.destroy();
                    ps = null;
                }
                window.removeEventListener('resize', resizeFunction );
            }
        );
    }, [ layoutRef ]);


    return (<LayoutSxDiv className={classes.root} ref={layoutRef}>
        <Sidebar
            routes = {routes}
            logoText = {'Invoice Board'}
            logo = {logo}
            image = {image}
            handleDrawerToggle = {handleDrawerToggle}
            open = {mobileOpen}
            hue = {hue}
            {...rest}
        />
        <MainPanel className={classes.mainPanel}>
            <Navbar
                hue = {hue}
                routes = {routes}
                handleDrawerToggle = {handleDrawerToggle}
                {...rest}
            />

            <Box className={classes.scrollCntnr}>

                <div className={classes.container}>
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                </div>
                <Footer appVersion={window.document.rsis.appVersion} />
            </Box>

            <FixedPlugin
                bgImage = {image}
                handleColorClick = {(hue) => setHue( hue )}
                handleFixedClick = {toggleMenuShow}
                handleImageClick = {(image) => setImage( image )}
                hue = {hue}
                menuShow = {menuShow}
            />
        </MainPanel>
    </LayoutSxDiv>);
}

