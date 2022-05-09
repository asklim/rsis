import * as React from 'react';
import { Outlet, } from 'react-router-dom';

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// core components
import Footer from 'components/m-d-r/Footer/Footer.jsx';
import FixedPlugin from 'components/m-d-r/FixedPlugin/FixedPlugin.jsx';

import Navbar from 'components/Navbars/Navbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

import routes from './admin-routes.js';

//const useStyles = makeStyles( styles );
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md

const PREFIX = 'AdminLayout';
const classes = {
    root: `${PREFIX}-root`,
    mainPanel: `${PREFIX}-mainPanel`,
    content: `${PREFIX}-content`,
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
    [`&.${classes.mainPanel}`]: {
        // `&.${...` without spaces (root styles)
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


export default function Admin ({ ...rest }) {


    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    // states and functions
    const [ image, setImage ] = React.useState( bgImage );
    const [ color, setColor ] = React.useState( 'blue' );
    const [ fixedClasses, setFixedClasses ] = React.useState( 'dropdown' );
    const [ mobileOpen, setMobileOpen ] = React.useState( false );

    const handleImageClick = (image) => setImage( image );

    const handleColorClick = (color) => setColor( color );

    const handleFixedClick = () => setFixedClasses(
        fixedClasses === 'dropdown' ? 'dropdown show' : 'dropdown'
    );

    const handleDrawerToggle = () => setMobileOpen( !mobileOpen );

    const isNotMaps = () => {
        return window.location.pathname !== '/admin/maps';
    };

    const resizeFunction = () => {
        if( window.innerWidth > MD_BREAKPOINT ) {
            setMobileOpen( false );
        }
    };

    React.useEffect( () => {
        /**
         *  initialize and destroy the PerfectScrollbar plugin
         */
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
                isWinPlatform && ps?.destroy();
                window.removeEventListener( 'resize', resizeFunction );
            }
        );
    }, [ mainPanel ]);

    return (<Root className={classes.root}>
        <MainPanel className={classes.mainPanel}
            ref = {mainPanel}
        >
            <Sidebar
                routes = {routes}
                logoText = {'Creative AsKlim'}
                logo = {logo}
                image = {image}
                handleDrawerToggle = {handleDrawerToggle}
                open = {mobileOpen}
                color = {color}
                {...rest}
            />
            <Navbar
                routes = {routes}
                handleDrawerToggle = {handleDrawerToggle}
                {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible
             if the content and container classes are present because they have some paddings
             which would make the map smaller */}
            { isNotMaps() ? (
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div className={classes.content}>
                    <Outlet />
                </div>
            )}
            <Footer
                appVersion ={window.document.rsis.appVersion}
            />
            <FixedPlugin
                handleImageClick = {handleImageClick}
                handleColorClick = {handleColorClick}
                bgColor = {color}
                bgImage = {image}
                handleFixedClick = {handleFixedClick}
                fixedClasses = {fixedClasses}
            />
        </MainPanel>
    </Root>);
}
