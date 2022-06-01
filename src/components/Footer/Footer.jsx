import * as React from 'react';
import PropTypes from 'prop-types';

// Google Material-UI/core components
import { styled } from '@mui/material/styles'; //v.5
import {
    List,
    ListItem,
} from '@mui/material';

const PREFIX = 'Footer';
const classes = {
    root:      `${PREFIX}-root`,
    container: `${PREFIX}-container`,
    left:      `${PREFIX}-left`,
    list:      `${PREFIX}-list`,
    copyright: `${PREFIX}-copyright`,
    vendor:    `${PREFIX}-vendor`,
};

const Root = styled( 'footer' )( ({ theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces (root styles)
        bottom: '0',
        borderTop: `1px solid ${theme.palette.grey[400]}`,
        height: '24px',
        padding: '15px 0',
        position: 'relative',
        ...theme.ctmdr.defaultFont,
    },
    [`&${' '}.${classes.container}`]: {
        ...theme.ctmdr.container,
    },
    [`&${' '}.${classes.left}`]: {
        display: 'block',
        float: 'left !important',
    },
    [`&${' '}.${classes.list}`]: {
        marginBottom: '0',
        padding: '0',
        marginTop: '0'
    },
}));


export default function Footer ({ appVersion }) {

    return (<Root className={classes.root}
    >
        <div className={classes.container}>
            <div className={classes.left}>
                <List className={classes.list}>
                    <FooterLink link={'#home'}>Home</FooterLink>
                    <FooterLink link={'#company'}>Company</FooterLink>
                    <FooterLink link={'#portfolio'}>Portfolio</FooterLink>
                    <FooterLink link={'#blog'}>Blog</FooterLink>
                </List>
            </div>
            <Copyright appVersion={appVersion} />
        </div>
    </Root>);
}
Footer.propTypes = {
    appVersion: PropTypes.string,
};


function FooterLink({ link, children }) {
    return (
        <ListItem
            sx = {{
                display: 'inline-block',
                padding: '0px',
                width:   'auto',
            }}
        >
            <a href={link}
                sx = {{
                    borderRadius: '3px',
                    color: 'inherit',
                    display: 'block',
                    fontSize: '12px',
                    //fontWeight: '500',
                    padding: '15px',
                    position: 'relative',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    typography: 'h6',
                }}
            >{children}</a>
        </ListItem>
    );
}
FooterLink.propTypes = {
    link: PropTypes.string,
    children: PropTypes.string,
};


const CopyrightRoot = styled( 'p' )( ({ theme }) => ({
    [`&.${classes.copyright}`]: {
        fontSize: '14px',
        float: 'right !important',
        margin: '0',
        padding: '15px 0',
    },
    [`&${' '}.${classes.vendor}`]: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        backgroundColor: 'transparent',
    },
}));


function Copyright({ appVersion, /*children*/ }) {
    return (
        <CopyrightRoot className={classes.copyright}
        >
            <span> &copy; {1900 + new Date().getYear()}{' '}
                <a
                    href = 'https://www.creative-tim.com?ref=mdr-footer'
                    target = '_blank'
                    className = {classes.vendor}
                    rel = 'noreferrer'
                >Creative Tim</a>
                {`, made with love for a better web, v.${appVersion}`}
            </span>
        </CopyrightRoot>
    );
}
Copyright.propTypes = {
    appVersion: PropTypes.string,
    //children: PropTypes.string,
};
