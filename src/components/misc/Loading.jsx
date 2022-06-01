import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    SnackbarContent,
} from '@mui/material';

// core components
// import SnackbarContent from 'components/m-d-r/Snackbar/SnackbarContent.jsx';

// Google Material-UI/icons
import AddAlert from '@mui/icons-material/AddAlert';

const Loading = ({
    msg='Loading ... wait please ...'
}) => <Grid container>
    <Grid item xs={12} sm={10} md={8} lg={6}>
        <SnackbarContent
            message = {<div>
                <AddAlert />
                <span>{`${msg}`}</span>
            </div>}
            sx = {{
                color: 'common.white',
                backgroundColor: 'info.main',
                typography: 'h6',
            }}
            action={[]}
        />
    </Grid>
</Grid>;
Loading.propTypes = {
    msg: PropTypes.string,
};

export default Loading;

// color = 'info'