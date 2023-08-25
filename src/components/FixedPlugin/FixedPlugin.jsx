import * as React from 'react';
import PropTypes from 'prop-types';
// import { debug } from 'utils/debuggers.js';

// Google Material-UI/core
import { styled } from '@mui/material/styles'; //v.5
import {
    Box,
    //Icon,
} from '@mui/material';
// Google Material-UI/icons
import SettingsIcon from '@mui/icons-material/Settings';

import image1 from 'assets/img/sidebar-1.jpg';
import image2 from 'assets/img/sidebar-2.jpg';
import image3 from 'assets/img/sidebar-3.jpg';
import image4 from 'assets/img/sidebar-4.jpg';


import HueColorPad from './HueColorPad';
import ImagesPad from './ImagesPad';
// import ReferencePad from './ReferencePad';

const images = [
    image1,
    image2,
    image3,
    image4
];
//debug('images', images ); // Array of  String: `/images/0a127c5829ff5a63fc0a.jpg`
const hues = [ 'purple', 'blue', 'green', 'orange', 'red' ];

// const referenceList = [
//     {
//         color: 'success',
//         href: 'https://www.creative-tim.com/product/material-dashboard-react?ref=mdr-fixed-plugin',
//         caption: 'Download free!',
//     },
//     {
//         color: 'warning',
//         href: 'https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mdr-fixed-plugin',
//         caption: 'Get PRO version',
//     },
//     {
//         color: 'info',
//         href: 'https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial?ref=mdr-fixed-plugin',
//         caption: 'Documentation',
//     },
// ];

const PREFIX = 'FixedPlugin';
const classes = {
    root:      `${PREFIX}-root`,
    label:     `${PREFIX}-label`,
    container: `${PREFIX}-container`,
    plugin:    `${PREFIX}-plugin`,
    space:    `${PREFIX}-space`,
};

const SxDiv = styled('div', {
    shouldForwardProp: (prop) => prop !== 'menuShow' && prop !== 'rtlActive',
})(({ menuShow, rtlActive, theme }) => {
    const { pxToRem } = theme.typography;
    const { common, primary } = theme.palette;
    return ({
        [`&.${classes.root}`]: {
            background: 'rgba(0, 0, 0, 0.3)',
            fontWeight: 300,
            lineHeight: '1.5em',
            position: 'fixed',
            textAlign: 'center',
            top: pxToRem( 180 ),
            width: pxToRem( 64 ),
            zIndex: 1400, /*snackbar*/
            ...( rtlActive ? {
                right: 'auto',
                left: '0px',
                borderRadius: '0 8px 8px 0',
            } : {
                right: 0,
                borderRadius: '8px 0 0 8px',
            }),
        },
        [`&${' '}.${classes.label}`]: {
            color: primary.main,
            paddingTop: '10px',
            '& .fa-cog': {
                color: common.white,
                padding: '10px',
                borderRadius: '0 0 6px 6px',
                width: 'auto',
            }
        },
        [`&${' '}.${classes.plugin}`]: {
            background: common.white,
            borderRadius: '0.1875rem',
            boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
            padding: '0 10px',
            width: pxToRem( 290 ),
            /* color: rgba(0, 0, 0, 0.87); */
            display: 'inline-block',
            // [`&::before, &::after`]: {
            //     borderBottom: '0.4em solid transparent',
            //     borderTop: '0.4em solid transparent',
            //     content: `""`,
            //     display: 'inline-block',
            //     position: 'absolute',
            //     right: '-16px',
            //     top: '46px',
            //     width: '16px',
            //     transform: 'translateY(-50%)',
            //     WebkitTransform: 'translateY(-50%)',
            //     MozTransform: 'translateY(-50%)',
            // },
            // [`&::before`]: {
            //     borderLeft: '0.4em solid rgba(0, 0, 0, 0.2)',
            // },
            // [`&::after`]: {
            //     borderLeft: `0.4em solid ${common.white}`,
            // },
        },
        [`&${' '}.${classes.container}`]: {
            position: 'absolute',
            top: '27px',
            ...( rtlActive ? {
                right: 'auto',
                left: '80px',
            } : {
                right: pxToRem( 80 ),
                left: 'auto',
            }),
            zIndex: '1300', /*modal*/
            ...( menuShow ? {
                display: 'block',
                opacity: 1,
                visibility: 'visible',
                transformOrigin: '0 0',
                transform: 'translateY(-13%)',
                WebkitTransform: 'translateY(-13%)',
                MozTransform: 'translateY(-13%)',
                OTransform: 'translateY(-13%)',
                MsTransform: 'translateY(-13%)',
            } : {
                display: 'none',
                opacity: '0',
                transformOrigin: '0 0',
                transform: 'translateY(-15%)',
                WebkitTransform: 'translateY(-15%)',
                MozTransform: 'translateY(-15%)',
                OTransform: 'translateY(-15%)',
                MsTransform: 'translateY(-15%)',
            }),
        },
        [`&${' '}.${classes.space}`]: {
            height: '50px',
            marginBottom: '5px',
            minHeight: 'inherit',
            padding: '0',
            width: '100%',
        },
    });
});


export default function FixedPlugin({
    bgImage,
    hue,
    handleColorClick,
    handleFixedClick,
    handleImageClick,
    menuShow,
    rtlActive,
    ...rest
}) {
    const [currentBgImage, setCurrentBgImage] = React.useState( bgImage );

    return (<SxDiv
        rtlActive = {rtlActive}
        menuShow = {menuShow}
        className = {classes.root}
        {...rest}
    >
        <div
            onClick = {() => handleFixedClick?.()}
            className = {classes.label}
        >
            <SettingsIcon fontSize='large'></SettingsIcon>
            <i className='fa fa-cog'>AK</i>
        </div>
        <article className={classes.container}>
            <Box className={classes.plugin}>
                <HueColorPad
                    hue = {hue}
                    handleColorClick = {handleColorClick}
                />
                <ImagesPad
                    image = {currentBgImage}
                    handleClick = {(image) => {
                        setCurrentBgImage( image );
                        handleImageClick?.( image );
                    }}
                    images = {images}
                />
                {/* <ReferencePad references={referenceList}/> */}
                <div className={classes.space} />
            </Box>
        </article>
    </SxDiv>
    );
}
FixedPlugin.propTypes = {
    bgImage: PropTypes.string,
    handleColorClick: PropTypes.func,
    handleFixedClick: PropTypes.func,
    handleImageClick: PropTypes.func,
    hue: PropTypes.oneOf( hues ),
    menuShow: PropTypes.bool,
    rtlActive: PropTypes.bool,
};
