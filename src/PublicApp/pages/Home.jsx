import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';

// mui core components
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    Paper
    , Toolbar
    , Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import logo from 'assets/img/reactlogo.png';
import BrandLogo from 'components/Sidebar/BrandLogo.jsx';

const PREFIX = 'HomeView';
const classes = {
    root: `${PREFIX}-root`,
};

const Root = styled( 'div' )( ({ theme }) => ({
    [`&.${classes.root}`]: {
        // `&.${...` without spaces (root styles)
        height: '100%',
        backgroundColor: theme.palette.background.body,
    },
}));


export default function HomePage () {

    return (<>
        <ButtonAppBar position='sticky' />
        <Root className={classes.root}>
            <Grid container><Grid item xs={12} sm={10} md={8} lg={6}>
                <Block level={6} sx={{ m: 2 }}/>
                <Block level={10} sx={{ m: 3 }}/>
                <Block level={14} sx={{ m: 4 }}/>
            </Grid>
            </Grid>
        </Root>
    </>);
}

/************************ */

const SxPaper = styled( Paper )( ({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //height: 60,
    lineHeight: '60px',
}));


function Block ({ level, ...rest }) {
    return (
        <SxPaper
            elevation={level}
            {...rest}
        >
            <Typography variant='h3' component='div' gutterBottom
            >h3. Heading
            </Typography>
            <Typography variant='h4' component='div' gutterBottom
            >h4. Heading
            </Typography>

            <BrandLogo
                style = {{
                // Most prioritet
                    color: 'orangered',
                    border: '3px dotted',
                }}
                sx = {{
                    [`&`]: {
                    //border: 1,
                    //borderTop: 0,
                        borderRadius: '24px',
                        borderColor: 'info.dark',
                    },
                    [`&${' '}a`]: {
                        color: 'success.dark',
                    //border: '1px solid orangered',
                    }
                }}
                logo = {logo}
                logoText = {'warning.dark LogoText'}
                rtlMode = {false}
            />

            <Typography variant='h5' component='div' gutterBottom
            >h5. Heading
            </Typography>

            <BrandLogo
                style = {{
                //color: 'orangered',
                //border: '3px solid green',
                }}
                sx = {{
                    border: 1,
                    borderColor: 'red',
                    [`&`]: {
                        borderTop: 0,
                        borderRadius: '25%',
                        borderColor: 'blue',
                    },
                    [`&${' '}a`]: {
                        color: 'secondary.dark',
                        border: '1px solid blue',
                    }
                }}
                logo = {logo}
                logoText = {'RtoL-LogoText'}
                rtlMode
            />

            <Typography variant='body1' gutterBottom
            >body1. This is a Home Page of AK side-project.
            </Typography>
            <NavLink to='/loginsignup'
            >Login or SignUp
            </NavLink>
        </SxPaper>);
}
Block.propTypes = {
    level: PropTypes.number,
};


function ButtonAppBar({...rest}) {

    const navigate = useNavigate();

    const handleLogInClick = () => navigate('loginsignup');

    const handleKebabMenuClick = () => navigate('admin');

    // position='static'
    return (<Box sx={{ flexGrow: 1 }} {...rest} >
        <AppBar>
            <Toolbar>
                <IconButton
                    size = 'large'
                    edge = 'start'
                    color = 'inherit'
                    aria-label = 'menu'
                    sx = {{ mr: 2 }}
                    onClick = {handleKebabMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant = 'h6'
                    component = 'div'
                    sx = {{ flexGrow: 1 }}
                >News
                </Typography>
                <Button
                    color = 'inherit'
                    onClick = {handleLogInClick}
                >Login
                </Button>
            </Toolbar>
        </AppBar>
    </Box>);
}
