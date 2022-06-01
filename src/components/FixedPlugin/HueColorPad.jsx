import * as React from 'react';
import PropTypes from 'prop-types';
//import { debug } from 'utils/debuggers.js';

// Google Material-UI/core
import { styled } from '@mui/material/styles'; //v.5

const hueColors = [ 'purple', 'blue', 'green', 'orange', 'red' ];

const PREFIX = 'HueColorPad';
const classes = {
    root:       `${PREFIX}-root`,
    title:      `${PREFIX}-title`,
    adjustment: `${PREFIX}-adjustment`,
    container:  `${PREFIX}-container`,
    button:     `${PREFIX}-button`,
};

const SxSection = styled( 'section', {
    shouldForwardProp: (prop) => prop !== 'hue',
// eslint-disable-next-line no-unused-vars
})(({ hue, theme }) => ({
    [`&.${classes.root}`]: {
        borderBottom: '1px solid #ddd',
        borderRadius: 0,
    },
    [`&${' '}.${classes.title}`]: {
        fontSize: theme.typography.pxToRem( 12 ),
        fontWeight: 600,
        height: theme.typography.pxToRem( 30 ),
        lineHeight: theme.typography.pxToRem( 25 ),
        marginTop: theme.typography.pxToRem( 10 ),
        minHeight: 'inherit',
        padding: '4px 0px',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: '100%',
    },
    [`&${' '}.${classes.adjustment}`]: {
        color: 'transparent',
        height: '44px',
        //margin: 0,
        // marginBottom: '5px',
        minHeight: 'inherit',
        padding: '0px',
        paddingTop: '6px',
        textAlign: 'center',
        textDecoration: 'none',
        width: '100%',
        '&:hover, &:focus': {
            color: 'transparent',
            //boxShadow: 'none',
            boxShadow: theme.ctmdr.boxShadow.default,
            transition: 'all 0.34s',
            MozTransition: 'all 0.34s',
            WebkitTransition: 'all 0.34s',
        },
    },
}));


const HueBadge = styled( 'span', {
    shouldForwardProp: (prop) => prop !== 'hue' && prop !== 'current',
// eslint-disable-next-line no-unused-vars
})( ({ hue, current, theme }) => {
    const borderHues = {
        purple: '#9c27b0',
        blue:   '#00bcd4',
        green:  '#4caf50',
        orange: '#ff9800',
        red:    '#f44336'
        ,
        'true': '#e547bc',
        'false': theme.palette.common.white,
    };
    return ({
        //backgroundColor: 'rgba(30, 30, 30, 0.97)',
        backgroundColor: borderHues[ hue ],
        border: '3px solid',
        borderColor: borderHues[ current ?? 'false' ],
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'inline-block',
        height: theme.typography.pxToRem( 24 ),
        marginRight: theme.typography.pxToRem( 5 ),
        marginTop: theme.typography.pxToRem( (40-24-3*2)/2 ),
        position: 'relative',
        textDecoration: 'none',
        width: theme.typography.pxToRem( 24 ),
        transition: 'all 0.34s',
        WebkitTransition: 'all 0.34s',
        MozTransition: 'all 0.34s',
        [`&:hover`]: {
            borderColor: '#33bbff',
        }
    });
});


export default function HueColorPad ({
    hue,
    handleColorClick,
}) {
    return (<SxSection className={classes.root}>
        <div className={classes.title}>Sidebar Color</div>
        <div className={classes.adjustment}>
            <div>
                {hueColors.map( (color, index) => {
                    return (
                        <HueBadge
                            hue = {color}
                            current = {hue === color}
                            key = {index}
                            data-color = {color}
                            onClick = {() => handleColorClick( color )}
                        />
                    );}
                )}
            </div>
        </div>
    </SxSection>);
}
HueColorPad.propTypes = {
    handleColorClick: PropTypes.func,
    hue: PropTypes.oneOf( hueColors ),
};

