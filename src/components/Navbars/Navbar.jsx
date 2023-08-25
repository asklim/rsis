import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory('-----debug:navbar');

import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// Google Material-UI/core components
import { styled } from '@mui/material/styles'; //v.5
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    //Hidden,
} from '@mui/material';
// Google Material-UI/icons
import { Menu } from '@mui/icons-material';

// core components
import AdminNavbarLinks from './AdminNavbarLinks.jsx';
import RTLNavbarLinks from './RTLNavbarLinks.jsx';
import RegularButton from 'components/CustomButtons/Button.jsx';

const PREFIX = 'NavBar';
const classes = {
    root:  `${PREFIX}-root`,
    title: `${PREFIX}-title`,
};

const Root = styled( AppBar, {
    shouldForwardProp: (prop) => prop !== 'hue',
})(({ hue, theme }) => {
    const color = theme.ctmdr.colorsMatrix[ hue ];
    const ctmdrColors = theme.ctmdr.palette?.[ color ];
    //color && console.log(`color: ${color}`);
    debug('ctmdrColors', ctmdrColors );
    return ({
        [`&.${classes.root}`]: {
        // `&.${...` without spaces
            border: '0',
            borderRadius: '3px',
            borderBottom: '0',
            display: 'flow-root',
            marginBottom: '0',
            minHeight: '50px',
            padding: '10px 0',
            //position: 'absolute',
            position: 'sticky',
            top: 0,
            transition: 'all 150ms ease 0s',
            width: '100%',
            //zIndex: '1029',
            ...( hue ? {
                backgroundColor: ctmdrColors[0],
                boxShadow: theme.ctmdr.boxShadow.default,
                color: theme.palette.common.white,
            } : {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                color: theme.palette.grey[700],
            }),
        },
    });
});


const ViewTitle = styled( RegularButton )( ({ theme }) => ({
    [`&.${classes.title}`]: {
        borderRadius: '3px',
        color: 'inherit',
        ...theme.typography.h6,
        letterSpacing: 'unset',
        lineHeight: '30px',
        margin: '0',
        //fontSize: '1.25rem', //'18px',
        //fontWeight: '500',
        textTransform: 'none',
        '&:hover, &:focus': {
            background: 'transparent'
        }
    },
}));


export default function Navbar ({
    hue,
    routes,
    rtlActive,
    ...rest
}) {
    const navbarRef = React.createRef();
    const location = useLocation();

    function getRouteTitle () {
        const route = routes.filter( (item) => {
            const fullroute = item?.layout + '/' + item?.path;
            return window.location.href.includes( fullroute );
        })?.[0];
        const name = rtlActive ? route?.rtlName : route?.name;
        //console.log(`getRouteTitle is ${name}`);
        return name;
    }

    React.useEffect( () => {}, [ location, navbarRef ]);
    debug(`argument-hue: ${hue}`);

    return (
        <Root className = {classes.root}
            hue = {hue}
        >
            <Toolbar sx={(theme) => ({
                ...theme.ctmdr.container,
                minHeight: '50px',
            })}>
                <Box sx={{ flex: 1 }}>
                    {/* Here we create navbar brand, based on route name */}
                    <ViewTitle className={classes.title}
                        color = 'transparent'
                        href = '#'
                    >
                        {getRouteTitle()}
                    </ViewTitle>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    {rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                </Box>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton
                        color = 'inherit'
                        aria-label = 'open drawer'
                        onClick = {rest.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Box>
            </Toolbar>
        </Root>
    );
}

Navbar.propTypes = {
    handleDrawerToggle: PropTypes.func,
    hue: PropTypes.oneOf([ 'purple', 'blue', 'green', 'orange', 'red' ]),
    routes: PropTypes.arrayOf( PropTypes.object ),
    rtlActive: PropTypes.bool,
};
