import {
    defaultFont,
    dangerColor,
    whiteColor
} from "../material-dashboard-react.js";

import dropdownStyle from "../dropdownStyle.js";

const headerLinksStyle = theme => ({
    ...dropdownStyle(theme),
    linkText: {
        zIndex: "4",
        ...defaultFont,
        fontSize: "14px",
        margin: "0px"
    },
    buttonLink: {
        zIndex: '14',
        [theme.breakpoints.down("md")]: { //'sm'
            display: "flex",
            margin: "10px 15px 0",
            width: "-webkit-fill-available",
            "& svg": {
                width: "24px",
                height: "30px",
                marginRight: "15px",
                marginLeft: "-15px"
            },
            "& .MuiSvgIcon-root,& .MuiIcon-root": {
                fontSize: "24px",
                lineHeight: "30px",
                width: "24px",
                height: "30px",
                marginRight: "15px",
                marginLeft: "-15px"
            },
            "& .fab,& .fas,& .far,& .fal,& .material-icons": {
                fontSize: "24px",
                lineHeight: "30px",
                width: "24px",
                height: "30px",
                marginRight: "15px",
                marginLeft: "-15px"
            },
            "& > span": {
                justifyContent: "flex-start",
                width: "100%"
            }
        }
    },
    icons: {
        width: "17px",
        zIndex: "4"
    },
    searchWrapper: {
        [theme.breakpoints.down("md")]: { //'sm'
            width: "-webkit-fill-available",
            margin: "10px 15px 0"
        },
        display: "inline-block",
        zIndex: '24',
    },
    search: {
        "& > div": {
            marginTop: "0"
        },
        [theme.breakpoints.down("md")]: { //'sm'
            margin: "10px 15px !important",
            float: "none !important",
            paddingTop: "1px",
            paddingBottom: "1px",
            padding: "0 !important",
            width: "60%",
            marginTop: "40px",
            "& input": {
                color: whiteColor
            }
        }
    },
    // searchButton: {
    //     [theme.breakpoints.down("md")]: { //'sm'
    //         top: "-50px !important",
    //         marginRight: "22px",
    //         float: "right"
    //     }
    // },
    // searchIcon: {
    //     width: "17px",
    //     zIndex: "4"
    // },
    margin: {
        zIndex: "4",
        margin: "0"
    },
    notifications: {
        zIndex: "4",
        [theme.breakpoints.up("md")]: { //'md'
            background: dangerColor[0],
            borderRadius: "10px",
            border: "1px solid " + whiteColor,
            color: whiteColor,
            display: "block",
            fontSize: "9px",
            height: "16px",
            lineHeight: "16px",
            minWidth: "16px",
            position: "absolute",
            right: "4px",
            textAlign: "center",
            top: "2px",
            verticalAlign: "middle",
        },
        [theme.breakpoints.down("md")]: { //'sm'
            ...defaultFont,
            background: dangerColor[0],
            borderRadius: "12px",
            fontSize: "14px",
            marginRight: "8px",
            minWidth: "24px",
        }
    },
    manager: {
        [theme.breakpoints.down("md")]: { //'sm'
            width: "100%"
        },
        display: "inline-block",
        zIndex: '24',
    },
});

export default headerLinksStyle;
