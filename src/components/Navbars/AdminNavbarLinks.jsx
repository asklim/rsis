// import { debug } from 'utils/debuggers.js';
import * as React from 'react';
import PropTypes from 'prop-types';
import { /*NavLink,*/ useNavigate, } from 'react-router-dom';

// Google Material-UI/core components
import { styled } from '@mui/material/styles'; //v.5
import {
    Box,
} from '@mui/material';
// Google Material-UI/icons
import {
    Dashboard,
    Notifications,
    Person,
    Search,
} from '@mui/icons-material';
// core components
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import LiquidPopupLinks from './LiquidPopupLinks';
import ContentFetch from './ContentFetch';


const PREFIX = 'NavBarLinks';
const classes = {
    root:          `${PREFIX}-root`,
    searchWrapper: `${PREFIX}-searchWrapper`,
    search:        `${PREFIX}-search`,
    buttonLink:    `${PREFIX}-buttonLink`,
    linkText:      `${PREFIX}-linkText`,
    icons:         `${PREFIX}-icons`,
};

const RootSxDiv = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => {
    // eslint-disable-next-line no-unused-vars
    const ctmdrColors = theme.ctmdr.palette?.[ color ];
    return ({
        [`&.${classes.root}`]: {
        // `&.${...` without spaces
        },
        [`&${' '}.${classes.searchWrapper}`]: {
            display: 'inline-block',
            zIndex: '4',
            [theme.breakpoints.down('md')]: { //'sm'
                width: '-webkit-fill-available',
                margin: '10px 15px 0'
            },
        },
        [`&${' '}.${classes.search}`]: {
            margin: '0',
            zIndex: '4',
            [theme.breakpoints.down('md')]: { //'sm'
                margin: '10px 15px !important',
                float: 'none !important',
                paddingTop: '1px',
                paddingBottom: '1px',
                padding: '0 !important',
                width: '60%',
                marginTop: '40px',
                '& input': {
                    color: theme.palette.common.white,
                }
            },
            '& > div': {
                marginTop: '0'
            },
        },
        [`&${' '}.${classes.buttonLink}`]: {
            zIndex: '14',
            [theme.breakpoints.down('md')]: { //'sm'
                display: 'flex',
                margin: '10px 15px 0',
                width: '-webkit-fill-available',
                [`&${' '}svg`]: {
                    width: '24px',
                    height: '30px',
                    marginRight: '15px',
                    marginLeft: '-15px'
                },
                [`&${' '}.MuiSvgIcon-root, &${' '}.MuiIcon-root`]: {
                    fontSize: '24px',
                    lineHeight: '30px',
                    width: '24px',
                    height: '30px',
                    marginRight: '15px',
                    marginLeft: '-15px'
                },
                [`&${' '}.fab,&${' '}.fas,&${' '}.far,&${' '}.fal,&${' '}.material-icons`]: {
                    fontSize: '24px',
                    lineHeight: '30px',
                    width: '24px',
                    height: '30px',
                    marginRight: '15px',
                    marginLeft: '-15px'
                },
                '& > span': {
                    justifyContent: 'flex-start',
                    width: '100%'
                }
            },
        },
        [`&${' '}.${classes.linkText}`]: {
            zIndex: '4',
            ...theme.ctmdr.defaultFont,
            fontSize: '14px',
            margin: '0px'
        },
        [`&${' '}.${classes.icons}`]: {
            width: '17px',
            zIndex: '4'
        },
    });
});

//import styles from 'assets/jss/m-d-r/components/headerLinksStyle.js';
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md


export default function AdminNavbarLinks() {


    const [openNotification, setOpenNotification] = React.useState( null );
    const [openProfile, setOpenProfile] = React.useState( null );

    const handleClickNotification = (event) =>
        openNotification?.contains?.( event.target ) ?
            setOpenNotification( null )
            : setOpenNotification( event.currentTarget )
    ;

    const handleCloseNotification = (event) => {
        setOpenNotification( null );
        console.log(`textContent: ${event.target.textContent}, event:`, event );
    };

    const handleClickProfile = (event) =>
        openProfile?.contains?.( event.target ) ?
            setOpenProfile( null )
            : setOpenProfile( event.currentTarget )
    ;
    const handleCloseProfile = () => setOpenProfile( null );

    const isWideWindow = () => window.innerWidth > MD_BREAKPOINT;

    const [ query, setQuery ] = React.useState('');
    const handlerOnChange = (event) => {
        const { value, textContent, outerText } = event.target;
        setQuery( value );
        console.log(`input char: ${value?.at(-1) ?? 'undefined'}`,
            `textContent: ${textContent}, outerText: ${outerText}`
        );
    };
    const actionStartSearch = (event) => console.log(`entered: '${query}', event:`, event );
    const handlerOnKeyUp = (event) => event.code == 'Enter' && actionStartSearch( event );

    const rootRef = React.createRef();

    // const notificationRef = React.useRef( [] );
    // React.useEffect( () => {
    //     notificationRef.current = getNotificationsList();
    // }, [ rootRef ]);

    // const profilePopupRef = React.useRef( [] );
    // React.useEffect( () => {
    //     profilePopupRef.current = getProfilePopupList();
    // }, [ rootRef ]);

    const navigate = useNavigate();

    const NotificationLinks = ( props ) => (
        <LiquidPopupLinks
            enablePopup = {isWideWindow()}
            anchorEl = {openNotification}
            icon = {Notifications}
            title = 'Notification'
            clickHandler = {handleClickNotification}
            closeHandler = {handleCloseNotification}
            content = {props.data}
        />
    );
    NotificationLinks.propTypes = {
        data: PropTypes.object,
    };

    const ProfileLinks = ({ data }) => (
        <LiquidPopupLinks
            enablePopup = {isWideWindow()}
            anchorEl = {openProfile}
            icon = {Person}
            title = 'Profile'
            clickHandler = {handleClickProfile}
            closeHandler = {handleCloseProfile}
            content = {data}
            disableCounter
        />
    );
    ProfileLinks.propTypes ={
        data: PropTypes.object,
    };


    return (<RootSxDiv className={classes.root}>
        <div className={classes.searchWrapper}>
            <CustomInput
                formControlProps = {{ className: classes.search }}
                inputProps = {{
                    placeholder: 'Search',
                    inputProps: { [`aria-label`]: 'Search', },
                    onChange: handlerOnChange,
                    onKeyUp: handlerOnKeyUp,
                    inputRef: rootRef,
                }}
            />
            <Button color='white' aria-label='edit'
                justIcon round
                onClick = {actionStartSearch}
            >
                <Search />
            </Button>
        </div>

        <Button
            color ={isWideWindow() ? 'transparent' : 'white'}
            justIcon ={isWideWindow()}
            simple ={!(isWideWindow())}
            aria-label ='Dashboard'
            className ={classes.buttonLink}
        >
            <Dashboard className={classes.icons} />
            <Box sx={{ display: { xs: 'block', md: 'none' } }}
                onClick = {() => navigate('admin/dashboard')}
            >
                <p className={classes.linkText}>Dashboard</p>
            </Box>
        </Button>

        <ContentFetch
            uri = 'notifications'
            render = {NotificationLinks}
        />

        <ContentFetch
            uri = 'profile'
            render = {ProfileLinks}
        />

        {/* <LiquidPopupLinks
            enablePopup = {isWideWindow()}
            anchorEl = {openNotification}
            icon = {Notifications}
            title = 'Notification'
            clickHandler={handleClickNotification}
            closeHandler={handleCloseNotification}
            content = {notificationRef.current}
        /> */}

        {/* <LiquidPopupLinks
            enablePopup = {isWideWindow()}
            anchorEl = {openProfile}
            icon = {Person}
            title = 'Profile'
            clickHandler={handleClickProfile}
            closeHandler={handleCloseProfile}
            content = {profilePopupRef.current}
            disableCounter
        /> */}
    </RootSxDiv>);
}
