import * as React from 'react';
import PropTypes from 'prop-types';
//import { debug } from 'utils/debuggers.js';

// Google Material-UI/core
import { styled } from '@mui/material/styles'; //v.5

import RegularButton from '../CustomButtons/Button.jsx';


const PREFIX = 'RefPad';
const classes = {
    root:      `${PREFIX}-root`,
    title:     `${PREFIX}-title`,
    container: `${PREFIX}-container`,
    button:    `${PREFIX}-button`,
};

const SxSection = styled('section')( ({ theme }) => {
    const { pxToRem } = theme.typography;
    return ({
        [`&.${classes.root}`]: {
            // `&.${...` without spaces (root styles)
        },
        [`&${' '}.${classes.title}`]: {
            fontSize: pxToRem( 12 ),
            fontWeight: 600,
            height: pxToRem( 30 ),
            lineHeight: pxToRem( 25 ),
            marginTop: pxToRem( 10 ),
            minHeight: 'inherit',
            padding: '0',
            textAlign: 'center',
            textTransform: 'uppercase',
            width: '100%',
        },
        [`&${' '}.${classes.container}`]: {
            height: '50px',
            marginBottom: '5px',
            minHeight: 'inherit',
            padding: '0',
            width: '100%',
        },
        [`&${' '}.${classes.button}`]: {
            '&:hover': {
                textDecoration: 'overline',
            }
        },
    });
});


export default function ReferencePad ({ references }) {
    return (<SxSection className={classes.root}>
        <div className={classes.title}>References</div>
        {references.map( (ref, key) => {
            return (
                <div className={classes.container} key={key}>
                    <RegularButton
                        className = {classes.button}
                        sx={{
                            '&:focus': {
                                textDecoration: 'underline',
                            }
                        }}
                        color = {ref.color}
                        href = {ref.href}
                        target='_blank'
                        fullWidth
                    >{ref.caption}
                    </RegularButton>
                </div>
            );
        })}
    </SxSection>);
}
ReferencePad.propTypes = {
    references: PropTypes.arrayOf( PropTypes.object ),
};
