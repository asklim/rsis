import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { alpha, styled } from "@mui/material/styles";
import {
    grayColor,
    //hexToRgb
} from "assets/jss/m-d-r/material-dashboard-react.js";

const PREFIX = 'BrandLogo';
const classes = {
    root: `${PREFIX}-root`,
    // logoLink: `${PREFIX}-logoLink`,
    // logoImageWrapper: `${PREFIX}-imageWrapper`,
    // logoImage: `${PREFIX}-logoImage`,
};

// eslint-disable-next-line no-unused-vars
const Root = styled('div')( ({ theme }) => ({
    [`&.${classes.root}`]: { // `&.${...` without spaces
        position: "relative",
        padding: "15px 15px",
        //zIndex: "4",
        "&::after": {
            // separator between logo and NavLink`s list
            content: '""',
            position: "absolute",
            bottom: "0",
            height: "1px",
            right: "15px",
            width: "calc(100% - 30px)",
            backgroundColor: `${alpha( grayColor[6], 0.3 )}`,
        }
    }
}));

const LogoLink = styled('a', {
    shouldForwardProp: (prop) => prop !== 'isRTL',
})( ({ isRTL, theme }) => ({
    ...theme.typography.h5,
    //textTransform: "uppercase",
    textDecoration: "none",
    textAlign: (isRTL ? "right" : "left"),
    backgroundColor: "transparent",
    color: 'inherit', //theme.palette.common.white,
    display: "block",
    fontSize: "18px",
    lineHeight: "30px",
    padding: "5px 0",
    "&:hover": {
        color: theme.palette.info.main
    },
}));

const LogoImageWrapper = styled('div')({
    width: "30px",
    display: "inline-flex", //"inline-block",
    maxHeight: "30px",
    marginLeft: "10px",
    marginRight: "15px"
});

const LogoImage = styled('img')({
    width: '35px',
    position: 'absolute',
    top: '22px',
    verticalAlign: 'middle',
    border: '0'
});


export default function BrandLogo ({
    logo,
    logoText,
    rtlMode,
    ...rest
}) {
    return (
        <Root
            className={classes.root}
            { ...rest }
        >
            <LogoLink
                isRTL ={ rtlMode }
                href = { window.location.origin }
                target = ""//"_blank"
            >
                { rtlMode && logoText }
                <LogoImageWrapper>
                    <LogoImage src ={ logo } alt = "logo" />
                </LogoImageWrapper>
                { !rtlMode && logoText }
            </LogoLink>
        </Root>
    );
}

BrandLogo.propTypes = {
    logo: PropTypes.string,
    logoText: PropTypes.string,
    rtlMode: PropTypes.bool,
};
