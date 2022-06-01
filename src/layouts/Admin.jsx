import * as React from 'react';
import { Outlet, } from 'react-router-dom';

import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory( 'debug:admin' );

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles';
import {
    Box,
    //Paper,
} from '@mui/material';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
//import 'perfect-scrollbar/css/perfect-scrollbar.css';

// core components
import Footer from '../components/Footer/Footer.jsx';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin.jsx';

import Navbar from '../components/Navbars/Navbar.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

import routes from './admin-routes.js';

//const useStyles = makeStyles( styles );
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md

const PREFIX = 'AdminLayout';
const classes = {
    root:        `${PREFIX}-root`,
    mainPanel:   `${PREFIX}-mainPanel`,
    scrollCntnr: `${PREFIX}-scrollCntnr`,
    container:   `${PREFIX}-container`,
    content:     `${PREFIX}-content`,
};

// eslint-disable-next-line no-unused-vars
const Layout = styled('div')( ({ theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces (root styles)
        height: '100%',
        position: 'relative',
        top: '0',
    },
}));

const MainPanel = styled('div')( ({ theme }) => {
    const { drawerWidth } = theme.ctmdr;
    const navbarHeight = 84;
    return ({
        [`&.${classes.mainPanel}`]: {
        // `&.${...` without spaces (root styles)
            float: 'right',
            maxHeight: '100%',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            transition: theme.ctmdr.transition,
            width: '100%',
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
        //marginTop: '36px',
            minHeight: 'calc(100vh - 123px)',
            padding: '30px 15px',
        //position: 'relative',
        },
        [`&${' '}.${classes.content}`]: {
            marginTop: '0px',
        },
    });
});

var ps;


export default function Admin ({ ...rest }) {

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    // states and functions
    const [ image, setImage ] = React.useState( bgImage );
    const [ hue, setHue ] = React.useState( 'blue' );
    const [ menuShow, toggleMenuShow ] = React.useReducer( (x) => !x, false );
    const handleImageClick = (image) => setImage( image );
    const handleColorClick = (hue) => setHue( hue );
    //const handleFixedClick = () => setMenuShow( !menuShow );

    const [ mobileOpen, setMobileOpen ] = React.useState( false );
    const handleDrawerToggle = () => setMobileOpen( !mobileOpen );

    React.useLayoutEffect( () => {
        /**
         *  initialize and destroy the PerfectScrollbar plugin
         */
        const isWinPlatform = navigator?.userAgent?.includes( 'Win' );
        const resizeFunction = () => {
            (window.innerWidth > MD_BREAKPOINT) && setMobileOpen( false );
            ps?.update();
        };

        if( isWinPlatform ) {
            //debug('mainPanel', mainPanel, 'current is', mainPanel.current.toString());
            let ctx = mainPanel.current.querySelector(`.${classes.scrollCntnr}`);
            ps = new PerfectScrollbar( ctx, {
                suppressScrollX: true,
                //suppressScrollY: false //default
            });
            debug(`ps`, ps );
            document.body.style.overflow = 'hidden';
        }
        window.addEventListener( 'resize', resizeFunction );
        // Specify how to clean up after this effect:
        return (
            function cleanup() {
                ps?.destroy();
                ps = null;
                window.removeEventListener( 'resize', resizeFunction );
            }
        );
    }, [ mainPanel ]);

    const isMapsView = () => {
        return window.location.pathname === '/admin/maps';
    };


    return (<Layout className={classes.root}
        ref = {mainPanel}
    >
        <Sidebar
            routes = {routes}
            logoText = {'Creative AsKlim'}
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
                {/* On the /maps route we want the map to be on full screen - this is not
                    possible if the content and container classes are present because they
                    have some paddings which would make the map smaller */}
                { isMapsView() ? (
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                ) : (
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <Outlet />
                        </div>
                    </div>
                )}
                <Footer appVersion={window.document.rsis.appVersion} />
            </Box>
            <FixedPlugin
                bgImage = {image}
                handleColorClick = {handleColorClick}
                handleFixedClick = {toggleMenuShow}
                handleImageClick = {handleImageClick}
                hue = {hue}
                menuShow = {menuShow}
            />
        </MainPanel>
    </Layout>);
}

