
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// mui core components
import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    Paper
    , Toolbar
    , Typography
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/styles';

const Item = styled( Paper )( ({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //height: 60,
    lineHeight: '60px',
}));


export default function HomePage () {

    return (<>
        <ButtonAppBar />
        <Grid container><Grid item xs={12} sm={10} md={8} lg={6}>
            <Item elevation={8}>
                <Typography variant="h3" component="div" gutterBottom>
                    h3. Heading
                </Typography>
                <Typography variant="h4" gutterBottom component="div">
                    h4. Heading
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                    h5. Heading
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. This is a Home Page of AK side-project.
                </Typography>
                <NavLink to="/loginsignup" >
                    Login or SignUp
                </NavLink>
            </Item>
        </Grid>
        </Grid>
    </>);
}


function ButtonAppBar() {

    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate( "loginsignup" );
        //console.log('HomeAppBar LoginButton click');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >News
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={handleLogInClick}
                    >Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}