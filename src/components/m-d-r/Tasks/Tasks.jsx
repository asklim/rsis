import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import {
    Checkbox,
    Tooltip,
    IconButton,
    Table,
    TableRow,
    TableBody,
    TableCell
} from "@mui/material";
import {
    // Google Material-UI/icons
    Edit,
    Close,
    Check
} from "@mui/icons-material";

// core components
import styles from "assets/jss/m-d-r/components/tasksStyle.js";

const useStyles = makeStyles(styles);


export default function Tasks ({
    checkedIndexes,
    tasksIndexes,
    tasks,
    rtlActive
}) {
    const cls = useStyles();

    const [checked, setChecked] = React.useState([ ...checkedIndexes ]);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf( value );
        const newChecked = [...checked];
        if( currentIndex === -1 ) {
            newChecked.push( value );
        } else {
            newChecked.splice( currentIndex, 1 );
        }
        setChecked( newChecked );
    };

    const tableCellClasses = classnames(cls.tableCell, {
        [cls.tableCellRTL]: rtlActive
    });

    return (<Table className={cls.table}>
        <TableBody>
            {tasksIndexes.map(value => (
                <TableRow key={value} className={cls.tableRow}>
                    <TableCell className={tableCellClasses}>
                        <Checkbox
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            onClick={() => handleToggle(value)}
                            checkedIcon={<Check className={cls.checkedIcon} />}
                            icon={<Check className={cls.uncheckedIcon} />}
                            classes={{
                                checked: cls.checked,
                                root: cls.root
                            }}
                        />
                    </TableCell>
                    <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
                    <TableCell className={cls.tableActions}>
                        <Tooltip
                            id="tooltip-top"
                            title="Edit Task"
                            placement="top"
                            classes={{ tooltip: cls.tooltip }}
                        >
                            <IconButton
                                aria-label="Edit"
                                className={cls.tableActionButton}
                            >
                                <Edit
                                    className={
                                        cls.tableActionButtonIcon + " " + cls.edit
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            id="tooltip-top-start"
                            title="Remove"
                            placement="top"
                            classes={{ tooltip: cls.tooltip }}
                        >
                            <IconButton
                                aria-label="Close"
                                className={cls.tableActionButton}
                            >
                                <Close
                                    className={
                                        cls.tableActionButtonIcon + " " + cls.close
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>);
}

Tasks.propTypes = {
    checkedIndexes: PropTypes.array,
    tasksIndexes: PropTypes.arrayOf( PropTypes.number ),
    tasks: PropTypes.arrayOf( PropTypes.node ),
    rtlActive: PropTypes.bool,
};
