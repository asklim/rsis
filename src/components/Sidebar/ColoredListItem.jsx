import * as React from 'react';
import PropTypes from 'prop-types';
import { debug } from 'utils/debuggers.js';

// Google Material-UI/core components
import { alpha, styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';

const PREFIX = 'ColoredListItem';
const classes = {
    root: `${PREFIX}-root`,
};

const Root = styled( ListItem, {
    shouldForwardProp: (prop) => prop !== 'hue' && prop !== 'colored',
})(({ hue, colored, theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces
        width: 'auto',
        transition: 'all 300ms linear',
        margin: '10px 15px 0',
        borderRadius: '3px',
        position: 'relative',
        display: 'block',
        padding: '10px 15px',
        backgroundColor: 'transparent',
        ...theme.ctmdr.defaultFont,
        ...(coloredClasses( hue, colored, theme )),
    },
}));


export default function ColoredListItem ({
    hue,
    colored,
    children,
    ...rest
}) {
    return (<Root className={classes.root}
        hue = {hue}
        colored = {colored}
        { ...rest }
    >
        { children }
    </Root>);
}
ColoredListItem.propTypes = {
    hue: PropTypes.oneOf([ 'purple', 'blue', 'green', 'orange', 'red' ]),
    colored: PropTypes.bool,
    children: PropTypes.node,
};


function coloredClasses (hue, isColored, theme) {

    if( !hue ) {
        debug(`ColoredListItem.jsx: '!hue color' condition: ${hue}`);
        return ({});
    }

    const shadow = (color) =>
        `0 12px 20px -10px ${alpha( color, 0.28)}` +
        `,0 4px 20px 0 ${alpha( theme.palette.common.black, 0.12 )}` +
        `,0 7px 8px -5px ${alpha( color , 0.2 )}`
    ;

    const color = theme.ctmdr.colorsMatrix[ hue ];
    const ctmdrColors = theme.ctmdr.palette[ color ];
    //console.log(`key: ${key} colors: ${ctmdrColors}`);

    const classes = {
        colored: {
            color: theme.palette.common.white,
            backgroundColor: ctmdrColors[0],
            boxShadow: shadow( ctmdrColors[0] ),
            '&:hover, &:focus': {
                //backgroundColor: ctmdrColors[0],
                boxShadow: shadow( ctmdrColors[0] ),
            },
        },
        transparent: {
            color: ctmdrColors[1] ,
            //backgroundColor: alpha( theme.palette.common.black, .05 ),
            boxShadow: shadow( ctmdrColors[3] ),
            '&:hover, &:focus': {
                textTransform: 'uppercase',
                backgroundColor: alpha( theme.palette.common.black, .1 ),
                boxShadow: shadow( ctmdrColors[0] ),
            },
            '&:visited': {
                backgroundColor: alpha( theme.palette.common.black, .1 ),
                boxShadow: shadow( theme.palette.error.dark ),
            },
        },
    };
    //debug('Colored Sidebar listItem', classes[`colored`] );

    return isColored ? classes.colored : classes.transparent;
}
