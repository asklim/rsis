import * as React from 'react';
import { Outlet, } from 'react-router-dom';

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles'; //v.5

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
    root:      `${PREFIX}-root`,
    mainPanel: `${PREFIX}-mainPanel`,
    content:   `${PREFIX}-content`,
    container: `${PREFIX}-container`,
};

// eslint-disable-next-line no-unused-vars
const Root = styled('div')( ({ theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces (root styles)
        height: '100vh',
        position: 'relative',
        top: '0',
    },
}));

const MainPanel = styled('div')( ({ theme }) => ({
    // `&.${...` without spaces (root styles)
    [`&.${classes.mainPanel}`]: {
        float: 'right',
        maxHeight: '100%',
        overflow: 'auto',
        overflowScrolling: 'touch',
        position: 'relative',
        transition: theme.ctmdr.transition,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.ctmdr.drawerWidth}px)`
        },
    },
    [`& .${classes.container}`]: {
        marginTop: '70px',
        padding: '30px 15px',
        minHeight: 'calc(100vh - 123px)',
    },
    [`& .${classes.content}`]: {
        marginTop: '0px',
    },
}));

let ps;


export default function InvoiceBoard({ ...rest }) {


    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    // states and functions
    const [image, setImage] = React.useState( bgImage );
    const [hue, setHue] = React.useState( 'blue' );
    const [ menuShow, setMenuShow ] = React.useState( false );
    const [mobileOpen, setMobileOpen] = React.useState( false );
    //hasImage: true

    const handleImageClick = (image) => setImage( image );

    const handleColorClick = (hue) => setHue( hue );

    const handleFixedClick = () => setMenuShow( !menuShow );

    const handleDrawerToggle = () =>  setMobileOpen( !mobileOpen );

    const resizeFunction = () =>
        (window.innerWidth > MD_BREAKPOINT) && setMobileOpen( false );

    React.useEffect(() => {
        // initialize and destroy the PerfectScrollbar plugin
        const isWinPlatform = navigator?.userAgent?.includes( 'Win' );

        if( isWinPlatform ) {
            ps = new PerfectScrollbar( mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = 'hidden';
        }
        window.addEventListener( 'resize', resizeFunction );
        // Specify how to clean up after this effect:
        return (
            function cleanup() {
                if( isWinPlatform ) {
                    ps?.destroy();
                }
                window.removeEventListener( 'resize', resizeFunction );
            }
        );
    }, [ mainPanel ]);


    return (<Root className={classes.root}>
        <MainPanel
            className = {classes.mainPanel}
            ref = {mainPanel}
        >
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
            <Navbar
                hue = {hue}
                routes = {routes}
                handleDrawerToggle = {handleDrawerToggle}
                {...rest}
            />

            <div className={classes.container}>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>

            <Footer
                appVersion ={window.document.rsis.appVersion}
            />
            <FixedPlugin
                bgImage = {image}
                handleColorClick = {handleColorClick}
                handleFixedClick = {handleFixedClick}
                handleImageClick = {handleImageClick}
                hue = {hue}
                menuShow = {menuShow}
            />
        </MainPanel>
    </Root>);
}

