import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom';

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles';
import {
    Box,
    Icon,
    List,
    ListItemText
} from '@mui/material';

import ColoredListItem from './ColoredListItem';


const PREFIX = 'SidebarLinks';
const classes = {
    root:       `${PREFIX}-root`,
    list:       `${PREFIX}-list`,
    item:       `${PREFIX}-item`,
    bottomItem: `${PREFIX}-bottomItem`,
    itemIcon:   `${PREFIX}-itemIcon`,
    itemText:   `${PREFIX}-itemText`,
};

const Root = styled( Box, {
    shouldForwardProp: (prop) => prop !== 'rtlActive',
})(({ rtlActive, theme }) => ({
    [`&.${classes.root}`]: {
        zIndex: '3',
    },
    [`& .${classes.list}`]: {
        marginTop: '20px',
        paddingLeft: '0',
        paddingTop: '0',
        paddingBottom: '0',
        marginBottom: '0',
        listStyle: 'none',
        position: 'unset'
    },
    [`& .${classes.item}`]: {
        //color: theme.palette.common.white,
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        // '&:hover': { color: theme.palette.common.white },
        // '&:focus': { color: theme.palette.common.white },
        // '&:visited': { color: theme.palette.common.white },
    },
    [`& .${classes.bottomItem}`]: {
        //color: theme.palette.common.white,
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        '&:hover': { textTransform: 'uppercase' },
        '&:focus': { color: theme.palette.common.black },
        '&:visited': { color: theme.palette.warning.dark },
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            width: '100%',
            bottom: '13px'
        }
    },
    [`& .${classes.itemIcon}`]: {
        width: '24px',
        height: '30px',
        fontSize: '24px',
        lineHeight: '30px',
        textAlign: 'center',
        verticalAlign: 'middle',
        //color: 'inherit',
        //color: `${alpha( theme.palette.common.white, 0.8 )}`,
        ...(rtlActive ? {
            float: 'right',
            marginRight: '3px',
            marginLeft: '15px',
        } : {
            float: 'left',
            marginRight: '15px',
            marginLeft: '3px', // Добавил для симметрии, результат - ???
        }),
    },
    [`& .${classes.itemText}`]: {
        //...defaultFont,
        margin: '0',
        lineHeight: '30px',
        fontSize: '14px',
        //color: 'inherit',
        //color: theme.palette.common.white,
        ...(rtlActive && {
            textAlign: 'right'
        }),
    },
}));


export default function SidebarLinks ({
    hue,
    routes,
    rtlActive
}) {
    // verifies if routeName is the one active (in browser input)
    function isActiveRoute (routeName) {
        return window.location.href.includes( routeName );
    }

    return (<Root className={classes.root}>
        <List className={classes.list}>

            {routes.map( (route, key) => {

                let isProButton = false;
                let colored = false;
                const fullroute = route.layout + '/' + route.path;
                const isActiveButton = isActiveRoute( fullroute );

                if( ['upgrade-to-pro', 'uis-dash'].includes( route.path )) {
                    colored = isProButton = true;
                }
                else {
                    colored = isActiveButton;
                }

                const selectedClasses = isActiveButton ?
                    { color: 'common.white' } : {}
                ;

                const Badge = (props) => typeof route.icon === 'string' ? (
                    <Icon {...props}> { route.icon } </Icon>
                ) : (
                    <route.icon {...props} />
                );


                return (
                    <NavLink
                        to = { fullroute }
                        className = { isProButton ? classes.bottomItem : classes.item }
                        key = { key }
                    >
                        <ColoredListItem
                            button
                            hue = {hue}
                            colored = {colored}
                        >
                            <Badge
                                sx = { selectedClasses }
                                className = { classes.itemIcon }
                            />
                            <ListItemText
                                primary = { rtlActive ? route.rtlName : route.name }
                                sx = { selectedClasses }
                                className = { classes.itemText }
                                disableTypography = { true }
                            />
                        </ColoredListItem>
                    </NavLink>
                );
            })}
        </List>
    </Root>);
}


SidebarLinks.propTypes = {
    hue: PropTypes.oneOf([ 'purple', 'blue', 'green', 'orange', 'red' ]),
    routes: PropTypes.arrayOf( PropTypes.object ),
    rtlActive: PropTypes.bool,
};
