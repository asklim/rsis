import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell ,
} from "@mui/material";

// core components
import styles from "assets/jss/m-d-r/components/tableStyle.js";

const useStyles = makeStyles(styles);


export default function CustomTable ({
    tableHead,
    tableData,
    tableHeaderColor
}) {
    const cls = useStyles();

    return (<div className={cls.tableResponsive}>
        <Table className={cls.table}>
            {tableHead !== undefined ? (
                <TableHead className={cls[tableHeaderColor + "TableHeader"]}>
                    <TableRow className={cls.tableHeadRow}>
                        {tableHead.map((prop, key) => {
                            return (
                                <TableCell
                                    className={cls.tableCell + " " + cls.tableHeadCell}
                                    key={key}
                                >
                                    {prop}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
            ) : null}

            <TableBody>
                {tableData.map((prop, key) => {
                    return (
                        <TableRow key={key} className={cls.tableBodyRow}>
                            {prop.map((prop, key) => {
                                return (
                                    <TableCell className={cls.tableCell} key={key}>
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </div>);
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf( PropTypes.string ),
    tableData: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.string ))
};
