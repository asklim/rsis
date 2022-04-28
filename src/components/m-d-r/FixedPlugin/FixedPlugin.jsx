import * as React from 'react';
//import { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*/ Google Material-UI/core
import {
  Icon,
} from '@mui/material';*/
// Google Material-UI/icons
import SettingsIcon from "@mui/icons-material/Settings";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "../CustomButtons/Button.jsx";

export default function FixedPlugin({
    bgColor,
    fixedClasses,
    handleColorClick,
    handleImageClick,
    rtlActive,
    ...rest
}) {
    //const [classes, setClasses] = React.useState( "dropdown show" );
    //const [bg_checked, setBg_checked] = React.useState( true );
    const [bgImage, setBgImage] = React.useState( rest.bgImage );

    const handleClick = () => rest.handleFixedClick();

    const pluginClasses = classnames( "fixed-plugin", {
        "rtl-fixed-plugin": rtlActive
    });

    return (<div className={pluginClasses} >
        <div id="fixedPluginClasses" className={fixedClasses}>
            <div onClick={handleClick}>
                <SettingsIcon fontSize="large"></SettingsIcon>
                <i className="fa fa-cog">AK</i>
            </div>
            <ul className="dropdown-menu">
                <li className="header-title">SIDEBAR FILTERS</li>
                <li className="adjustments-line">
                    <a className="switch-trigger">
                        <div>
                            <span
                                className={ bgColor === "purple" ?
                                    "badge filter badge-purple active"
                                    : "badge filter badge-purple"
                                }
                                data-color="purple"
                                onClick={() => handleColorClick("purple")}
                            />
                            <span
                                className={ bgColor === "blue" ?
                                    "badge filter badge-blue active"
                                    : "badge filter badge-blue"
                                }
                                data-color="blue"
                                onClick={() => handleColorClick("blue")}
                            />
                            <span
                                className={ bgColor === "green" ?
                                    "badge filter badge-green active"
                                    : "badge filter badge-green"
                                }
                                data-color="green"
                                onClick={() => handleColorClick("green")}
                            />
                            <span
                                className={ bgColor === "red" ?
                                    "badge filter badge-red active"
                                    : "badge filter badge-red"
                                }
                                data-color="red"
                                onClick={() => handleColorClick("red")}
                            />
                            <span
                                className={ bgColor === "orange" ?
                                    "badge filter badge-orange active"
                                    : "badge filter badge-orange"
                                }
                                data-color="orange"
                                onClick={() => handleColorClick("orange")}
                            />
                        </div>
                    </a>
                </li>
                <li className="header-title">Images</li>
                <li className={bgImage === imagine1 ? "active" : ""}>
                    <a
                        className="img-holder switch-trigger"
                        onClick={() => {
                            setBgImage( imagine1 );
                            handleImageClick( imagine1 );
                        }}
                    >
                        <img src={imagine1} alt="..." />
                    </a>
                </li>
                <li className={bgImage === imagine2 ? "active" : ""}>
                    <a
                        className="img-holder switch-trigger"
                        onClick={() => {
                            setBgImage( imagine2 );
                            handleImageClick( imagine2 );
                        }}
                    >
                        <img src={imagine2} alt="..." />
                    </a>
                </li>
                <li className={bgImage === imagine3 ? "active" : ""}>
                    <a
                        className="img-holder switch-trigger"
                        onClick={() => {
                            setBgImage( imagine3 );
                            handleImageClick( imagine3 );
                        }}
                    >
                        <img src={imagine3} alt="..." />
                    </a>
                </li>
                <li className={bgImage === imagine4 ? "active" : ""}>
                    <a
                        className="img-holder switch-trigger"
                        onClick={() => {
                            setBgImage( imagine4 );
                            handleImageClick( imagine4 );
                        }}
                    >
                        <img src={imagine4} alt="..." />
                    </a>
                </li>

                <li className="button-container">
                    <div className="button-container">
                        <Button
                            color="success"
                            href="https://www.creative-tim.com/product/material-dashboard-react?ref=mdr-fixed-plugin"
                            target="_blank"
                            fullWidth
                        >Download free!
                        </Button>
                    </div>
                </li>
                <li className="button-container">
                    <div className="button-container">
                        <Button
                            color="warning"
                            href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mdr-fixed-plugin"
                            target="_blank"
                            fullWidth
                        >Get PRO version
                        </Button>
                    </div>
                </li>
                <li className="button-container">
                    <Button
                        color="info"
                        fullWidth
                        href="https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial?ref=mdr-fixed-plugin"
                        target="_blank"
                    >Documentation
                    </Button>
                </li>
                <li className="adjustments-line" />
            </ul>
        </div>
    </div>
    );
}

FixedPlugin.propTypes = {
    bgImage: PropTypes.string,
    handleFixedClick: PropTypes.func,
    rtlActive: PropTypes.bool,
    fixedClasses: PropTypes.string,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    handleColorClick: PropTypes.func,
    handleImageClick: PropTypes.func
};
