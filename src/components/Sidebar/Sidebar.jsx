import * as React from 'react';
//import classNames from 'classnames';
import PropTypes from 'prop-types';
import { /*NavLink,*/ useLocation } from 'react-router-dom';

// Google Material-UI/core components
import { styled } from '@mui/material/styles';
import {
    Drawer,
    SwipeableDrawer,
    // Hidden,
    //Icon,
    //List,
    //ListItem,
    //ListItemText
} from '@mui/material';

// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.jsx';
import RTLNavbarLinks from 'components/Navbars/RTLNavbarLinks.jsx';

import BrandLogo from './BrandLogo.jsx';
import SidebarLinks from './SidebarLinks.jsx';


const PREFIX = 'SideBar';
const classes = {
    background: `${PREFIX}-background`,
    backgroundLayer: `${PREFIX}-backgroundLayer`,
    navLinksWrapper: `${PREFIX}-navLinksWrapper`,
    logoWrapper: `${PREFIX}-brandLogoWrapper`,
};

const Root = styled( 'div' )( ({ theme }) => ({
    [`& .${classes.navLinksWrapper}`]: {
        // `& .${...` with space (nested styles)
        height: "calc(100vh - 75px)",
        overflow: "auto",
        overflowScrolling: "touch",
        width: `${theme.ctmdr.drawerWidth}px`,  //"260px",
        position: "relative",
        zIndex: "4",
    },
}));

const BackgroundLayer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'bgImage',
})(({ bgImage, theme }) => ({
    [`&.${classes.backgroundLayer}`]: {
        // `&.${...` without spaces (root styles)
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
        height: "100%",
        top: "0",
        left: "0",
        position: "absolute",
        width: "100%",
        zIndex: "1",
        "&::after": {
            background: theme.palette.common.black,
            content: '""',
            display: "block",
            height: "100%",
            opacity: ".8",
            position: "absolute",
            width: "100%",
            zIndex: "2",
        }
    },
}));

const LogoWrapper = styled('div')(({ theme }) => ({
    [`&.${classes.logoWrapper}`]: {
        // `&.${...` without spaces (root styles)
        color: theme.palette.secondary.dark,
        height: "75px",
        overflow: 'hidden',  //"auto",
        overflowScrolling: "touch",
        position: "relative",
        width: `${theme.ctmdr.drawerWidth}px`,  //"260px",
        zIndex: "5",
    }
}));

function drawerPaperStyles (isRTL) {
    return (
        (theme) => ({
            [`& .MuiDrawer-paper`]: {
                border: "none",
                bottom: "0",
                boxShadow: theme.ctmdr.boxShadow.default,
                height: "100%",
                left: "0",
                position: "fixed",
                top: "0",
                width: `${theme.ctmdr.drawerWidth}px`,
                //zIndex: "1",
                [theme.breakpoints.up('md')]: {
                    height: "100%",
                    position: "fixed",
                    width: `${theme.ctmdr.drawerWidth}px`,
                    //width: drawerWidth,
                    ...(isRTL ? {
                        left: "auto !important",
                        right: "0 !important",
                    } : {
                        left: "0",
                        right: "auto",
                    }),
                },
                [theme.breakpoints.down('md')]: { //"sm"
                    //boxShadow: theme.ctmdr.boxShadow.default,
                    borderTop: "none",
                    display: "block",
                    height: "100vh",
                    //zIndex: "1032",
                    visibility: "visible",
                    overflowY: "visible",
                    textAlign: "left",
                    paddingRight: "0px",
                    paddingLeft: "0",
                    position: "fixed",
                    top: "0",
                    transform: `translate3d(${theme.ctmdr.drawerWidth}px, 0, 0)`,
                    transition: theme.ctmdr.transition,
                    width: `${theme.ctmdr.drawerWidth}px`,
                    //width: drawerWidth,
                    ...(isRTL ? {
                        left: "0 !important",
                        right: "auto !important",
                    } : {
                        left: "auto",
                        right: "0",
                    }),
                },
            },
        })
    );
}

export default function Sidebar ({
    color,
    logo,
    logoText,
    image,
    routes,
    rtlActive,
    ...rest
}) {
    const location = useLocation();

    // Чтобы обновлялись нажатые кнопки.
    React.useEffect( () => {
        //console.log( location );
    }, [ location ]);

    return (<Root>
        {/* For a small screen size (hidden from mdUp)*/}
        {/*variant = {'temporary'}
            ModalProps = {{
                keepMounted: true // Better open performance on mobile.
            }}*/}
        <SwipeableDrawer
            sx = {[
                { display: { xs: 'block', md: 'none', }},
                drawerPaperStyles( rtlActive ),
            ]}
            anchor = { rtlActive ? 'left' : 'right' }
            open = { rest.open }
            onOpen = { rest.handleDrawerToggle }
            onClose = { rest.handleDrawerToggle }
        >
            { /*false &&*/ image && <BackgroundLayer
                className = {classes.backgroundLayer}
                bgImage = {image}
            />}

            <LogoWrapper className={classes.logoWrapper}>
                <BrandLogo
                    logo ={logo}
                    logoText ={logoText}
                    rtlMode ={rtlActive}
                />
            </LogoWrapper>

            <div className = { classes.navLinksWrapper }>
                { false && (rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />) }
                <SidebarLinks
                    color={color}
                    routes={routes}
                    rtlActive={rtlActive}
                />
            </div>
        </SwipeableDrawer>

        {/* For a wide screen size (hidden from smDown)*/}
        <Drawer
            sx = {[
                { display: { xs: 'none', md: 'block' }},
                drawerPaperStyles( rtlActive ),
            ]}
            variant = 'permanent'
            anchor = { rtlActive ? 'right' : 'left' }
            open
        >
            { image && <BackgroundLayer
                className = {classes.backgroundLayer}
                bgImage = {image}
            />}

            <LogoWrapper className={classes.logoWrapper}>
                <BrandLogo
                    logo ={logo}
                    logoText ={logoText}
                    rtlMode ={rtlActive}
                />
            </LogoWrapper>

            <div className = { classes.navLinksWrapper }>
                <SidebarLinks
                    color={color}
                    routes={routes}
                    rtlActive={rtlActive}
                />
            </div>
        </Drawer>
    </Root>);
}

Sidebar.propTypes = {
    color: PropTypes.oneOf([ 'purple', 'blue', 'green', 'orange', 'red' ]),
    handleDrawerToggle: PropTypes.func,
    image: PropTypes.string,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    open: PropTypes.bool,
    routes: PropTypes.arrayOf( PropTypes.object ),
    rtlActive: PropTypes.bool,
};
