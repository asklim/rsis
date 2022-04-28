import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// core components
import Card from "../Card/Card.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";

import styles from "assets/jss/m-d-r/components/customTabsStyle.js";

const useStyles = makeStyles(styles);


export default function CustomTabs({
    headerColor,
    plainTabs,
    tabs,
    title,
    rtlActive
}) {
    const cls = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, value) => {
        setValue(value);
    };

    const cardTitle = classNames({
        [cls.cardTitle]: true,
        [cls.cardTitleRTL]: rtlActive
    });

    return (
        <Card plain={plainTabs}>
            <CardHeader color={headerColor} plain={plainTabs}>
                {title !== undefined ?
                    <div className={cardTitle}>{title}</div> : null}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{
                        root: cls.tabsRoot,
                        indicator: cls.displayNone,
                        scrollButtons: cls.displayNone
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabs.map((prop, key) => {
                        var icon = {};
                        if (prop.tabIcon) {
                            icon = {
                                icon: <prop.tabIcon />
                            };
                        }
                        return (
                            <Tab
                                classes={{
                                    root: cls.tabRootButton,
                                    selected: cls.tabSelected,
                                    wrapper: cls.tabWrapper
                                }}
                                key={key}
                                label={prop.tabName}
                                {...icon}
                            />
                        );
                    })}
                </Tabs>
            </CardHeader>
            <CardBody>
                {tabs.map((prop, key) => {
                    if (key === value) {
                        return <div key={key}>{prop.tabContent}</div>;
                    }
                    return null;
                })}
            </CardBody>
        </Card>
    );
}

CustomTabs.propTypes = {
    headerColor: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    plainTabs: PropTypes.bool,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabName: PropTypes.string.isRequired,
            tabIcon: PropTypes.object,
            tabContent: PropTypes.node.isRequired
        })
    ),
    title: PropTypes.string,
    rtlActive: PropTypes.bool,
};
