import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Google Material-UI/core components
//import { /*alpha,*/ styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
    FormControl,
    Input,
    InputLabel,
} from '@mui/material';

// Google Material-UI/icons
import Clear from '@mui/icons-material/Clear';
import Check from '@mui/icons-material/Check';
// core components
import styles from 'assets/jss/m-d-r/components/customInputStyle.js';

const useStyles = makeStyles(styles);


export default function CustomInput({
    formControlProps,
    labelText,
    labelProps,
    id,
    inputProps,
    error,
    success
}) {
    const cls = useStyles();

    const labelClasses = classNames({
        [' ' + cls.labelRootError]: error,
        [' ' + cls.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [cls.underlineError]: error,
        [cls.underlineSuccess]: success && !error,
        [cls.underline]: true
    });
    const marginTop = classNames({
        [cls.marginTop]: labelText === undefined
    });

    const handlerOnChange = (event) => console.log( event.target.value );
    const handlerOn = (event) => console.log( `ended: ${event.target.value}` );

    return (
        <FormControl
            {...formControlProps}
            className={formControlProps.className + ' ' + cls.formControl}
        >
            {labelText !== undefined && (
                <InputLabel
                    className={cls.labelRoot + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            )}
            <Input
                classes={{
                    root: marginTop,
                    disabled: cls.disabled,
                    underline: underlineClasses
                }}
                onChange = {handlerOnChange}
                onEnded = {handlerOn}
                id={id}
                {...inputProps}
            />
            {error ? (
                <Clear className={cls.feedback + ' ' + cls.labelRootError} />
            ) : success ? (
                <Check className={cls.feedback + ' ' + cls.labelRootSuccess} />
            ) : null}
        </FormControl>
    );
}

CustomInput.propTypes = {
    formControlProps: PropTypes.object,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
};
