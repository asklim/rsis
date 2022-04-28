import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

// core components
import styles from "assets/jss/m-d-r/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer ({ appVersion }) {

    const cls = useStyles();

    return (<footer className={cls.footer}>
        <div className={cls.container}>
            <div className={cls.left}>
                <List className={cls.list}>
                    <ListItem className={cls.inlineBlock}>
                        <a href="#home" className={cls.block}
                        >Home
                        </a>
                    </ListItem>
                    <ListItem className={cls.inlineBlock}>
                        <a href="#company" className={cls.block}
                        >Company
                        </a>
                    </ListItem>
                    <ListItem className={cls.inlineBlock}>
                        <a href="#portfolio" className={cls.block}
                        >Portfolio
                        </a>
                    </ListItem>
                    <ListItem className={cls.inlineBlock}>
                        <a href="#blog" className={cls.block}
                        >Blog
                        </a>
                    </ListItem>
                </List>
            </div>
            <p className={cls.right}>
                <span> &copy; {1900 + new Date().getYear()}{" "}
                    <a
                        href="https://www.creative-tim.com?ref=mdr-footer"
                        target="_blank"
                        className={cls.a} rel="noreferrer"
                    >Creative Tim
                    </a>
                    {", made with love for a better web, v." + appVersion}
                </span>
            </p>
        </div>
    </footer>);
}

Footer.propTypes = {
    appVersion: PropTypes.string,
};