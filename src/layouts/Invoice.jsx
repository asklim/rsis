
import * as React from "react";
//import PropTypes from "prop-types";
import { Outlet, } from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

// core components
import Navbar from "components/m-d-r/Navbars/Navbar.jsx";
import Footer from "components/m-d-r/Footer/Footer.jsx";
import FixedPlugin from "components/m-d-r/FixedPlugin/FixedPlugin.jsx";
import Sidebar from "components/rsis/Sidebar/Sidebar.jsx";

import styles from "assets/jss/m-d-r/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png"; // must be an image

//import Whoops404 from "components/misc/Whoops404.js";
import routes from "./invoice-routes.js";

let ps;
const useStyles = makeStyles( styles );


export default function InvoiceBoard({ ...rest }) {

    // styles
    const classes = useStyles();

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [image, setImage] = React.useState( bgImage );
    const [color, setColor] = React.useState( "blue" );
    const [fixedClasses, setFixedClasses] = React.useState( "dropdown show" );
    const [mobileOpen, setMobileOpen] = React.useState( false );
    //hasImage: true

    const handleImageClick = (image) => {
        setImage( image );
    };

    const handleColorClick = (color) => {
        setColor( color );
    };

    const handleFixedClick = () => {
        if( fixedClasses === "dropdown" ) {
            setFixedClasses( "dropdown show" );
        }
        else {
            setFixedClasses( "dropdown" );
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen( !mobileOpen );
    };

    const resizeFunction = () => {
        if( window.innerWidth >= 960 ) {
            setMobileOpen( false );
        }
    };

    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        const isWinPlatform = navigator.platform.indexOf("Win") > -1;
        if( isWinPlatform ) {
            ps = new PerfectScrollbar( mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener( "resize", resizeFunction );
        // Specify how to clean up after this effect:
        return function cleanup() {
            if( isWinPlatform ) {
                ps?.destroy();
            }
            window.removeEventListener( "resize", resizeFunction );
        };
    }, [mainPanel]);


    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Invoice Board"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            {/* eslint-disable-next-line react/no-string-refs */}
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />

                <div className={classes.content}>
                    <div className={classes.container}>
                        <Outlet />
                    </div>
                </div>

                <Footer
                    appVersion ={window.document.rsis.appVersion}
                />
                <FixedPlugin
                    handleImageClick={handleImageClick}
                    handleColorClick={handleColorClick}
                    bgColor={color}
                    bgImage={image}
                    handleFixedClick={handleFixedClick}
                    fixedClasses={fixedClasses}
                />
            </div>
        </div>
    );
}

