// import { debug } from 'utils/debuggers.js';
import * as React from 'react';
import PropTypes from 'prop-types';

import { toKebabCase } from 'utils/';

// Google Material-UI/core components
import { /*alpha,*/ styled } from '@mui/material/styles';
import {
    Box,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import Button from 'components/CustomButtons/Button.jsx';

const PREFIX = 'LiquidLinks';
const classes = {
    root:       `${PREFIX}-root`,
    popupMenu:  `${PREFIX}-popupMenu`,
    buttonLink: `${PREFIX}-buttonLink`,
    linkText:   `${PREFIX}-linkText`,
    icons:      `${PREFIX}-icons`,
    counter:    `${PREFIX}-counter`,
};

const RootSxDiv = styled( 'div', {
    shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => {
    // eslint-disable-next-line no-unused-vars
    const ctmdrColors = theme.ctmdr.palette?.[ color ];
    return ({
        [`&.${classes.root}`]: {
            display: 'inline-block',
            zIndex: '4',
            [theme.breakpoints.down('md')]: {
                width: '100%'
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
        [`&${' '}.${classes.counter}`]: {
            zIndex: '4',
            [theme.breakpoints.up('md')]: { //'md'
                background: theme.ctmdr.palette.danger[0],
                borderRadius: '10px',
                border: `1px solid ${theme.palette.common.white}`,
                color: theme.palette.common.white,
                display: 'block',
                fontSize: '9px',
                height: '16px',
                lineHeight: '16px',
                minWidth: '16px',
                position: 'absolute',
                right: '4px',
                textAlign: 'center',
                top: '2px',
                verticalAlign: 'middle',
            },
            [theme.breakpoints.down('md')]: { //'sm'
                ...theme.ctmdr.defaultFont,
                background: theme.ctmdr.palette.danger[0],
                borderRadius: '12px',
                fontSize: '14px',
                marginRight: '8px',
                minWidth: '24px',
            }
        },
    });
});

const PopupMenuSxPopper = styled( Popper
    //, { shouldForwardProp: (prop) => prop !== 'open', }
)(({ open, theme }) => {
    // debug( `PopupMenu open is ${open}` );
    const { /*common,*/ error } = theme.palette;
    return ({
        //zIndex: 1401,
        ...( !open && ({ pointerEvents: 'none' })),
        [theme.breakpoints.down('md')]: { //'sm'
            left: 'unset !important',
            position: 'static !important',
            top: 'unset !important',
            transform: 'none !important',
            willChange: 'unset !important',
            '& > div': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                marginLeft: '0rem',
                marginRight: '0rem',
                marginTop: '0px !important',
                marginBottom: '0px !important',
                padding: '0px !important',
                transition: 'none !important',
                '& ul li': {
                    //color: `${common.white} !important`,
                    color: `${error.main} !important`,
                    margin: '10px 15px 0!important',
                    padding: '10px 15px !important',
                    '&:hover': {
                        backgroundColor: 'hsla( 0, 0%, 78%, .2)',
                        boxShadow: 'none'
                    }
                }
            }
        }
    });
});

const PopupMenuItem = styled( MenuItem )(({theme}) => ({
    ...theme.ctmdr.defaultFont,
    borderRadius: '2px',
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143rem',
    color: theme.ctmdr.palette.gray[8],
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
    '&:hover': {
        backgroundColor: theme.ctmdr.palette.primary[0],
        color: theme.palette.common.white,
        boxShadow: theme.ctmdr.boxShadow.primary
    }
}));


export default function LiquidPopupLinks ({
    enablePopup,
    anchorEl,      // [object HTMLButtonElement] or undefined
    icon: TheIcon, // [object Object]
    title,
    clickHandler,
    closeHandler,
    content,
    disableCounter,
}) {
    const opened = Boolean( anchorEl );
    const popperId = `${toKebabCase( title )}-menu-list-grow`;
    // debug('TheIcon', TheIcon?.toString());
    // debug('anchorEl', anchorEl?.toString());

    return (<RootSxDiv className={classes.root}>
        <Button
            color = {enablePopup ? 'transparent' : 'white'}
            justIcon = {enablePopup}
            simple = {!enablePopup}
            aria-describedby = {opened ? popperId : null}
            aria-haspopup = 'true'
            onClick = {clickHandler}
            className = {classes.buttonLink}
        >
            <TheIcon className={classes.icons} />
            { !disableCounter ? (
                <span className={classes.counter}>
                    {content?.filter((x)=>!x.type).length ?? 0}
                </span>) : null }
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <p
                    className = {classes.linkText}
                    onClick = {closeHandler}
                >{title}
                </p>
            </Box>
        </Button>

        <PopupMenuSxPopper
            id = {popperId}
            open = {opened}
            anchorEl = {anchorEl}
            transition = {false}
            placement = 'bottom-end'
            disablePortal = {true}
            className = {classes.popupMenu}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    in = {opened}
                    {...( opened ? {timeout: 300} : {})}
                    style ={ placement === 'bottom' ?
                        { transformOrigin:'center top'}
                        : { transformOrigin: 'center bottom'}
                    }
                >
                    <Paper>
                        <ClickAwayListener onClickAway={closeHandler}>
                            <MenuList role='menu'>
                                {content?.map( (item,index) => {
                                    // debug( item.type );
                                    // not undefined for React.Component
                                    return item.type ? (
                                        item
                                    ) : (
                                        <PopupMenuItem
                                            key = {index}
                                            onClick ={(event) => {
                                                closeHandler( event );
                                                item.action?.();
                                            }}
                                        > {item.title}
                                        </PopupMenuItem>
                                    );
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </PopupMenuSxPopper>
    </RootSxDiv>);
}
LiquidPopupLinks.propTypes = {
    enablePopup: PropTypes.bool,
    anchorEl: PropTypes.object,
    icon: PropTypes.object,
    title: PropTypes.string,
    clickHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    content: PropTypes.arrayOf( PropTypes.object ),
    disableCounter: PropTypes.bool,
};
