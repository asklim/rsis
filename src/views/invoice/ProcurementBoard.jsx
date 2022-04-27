//const debug = require( 'debug' )( 'invoice:procurement' );
import * as debugFactory from "debug";
const debug = debugFactory( 'invoice:procurement');

import React, {
    useState,
    useEffect,
    // useCallback,
} from "react";
//import PropTypes from "prop-types";

// @material-ui/core
//import { makeStyles } from "@material-ui/core/styles";
import {
    Card, CardContent, CardHeader,
    Checkbox,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    //FormControl,
    //FormLabel,
    FormGroup,
    //Icon,
} from '@mui/material';

// @material-ui/icons
import {
    Battery20 as ShortPeriod,
    Battery50 as MiddlePeriod,
    Battery80 as LongPeriod,
    BatteryFull as XtraLongPeriod,
    //AddAlert,
    //Check,
    //Store, Warning, DateRange, LocalOffer,
    //Update, ArrowUpward, AccessTime,  Accessibility
} from "@mui/icons-material";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import Table from "components/m-d-r/Table/Table.js";
import CustomTabs from "components/m-d-r/CustomTabs/CustomTabs.js";
//import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";
//import Tasks from "components/m-d-r/Tasks/Tasks.js";
/*
import Danger from "components/m-d-r/Typography/Danger.js";
import Card from "components/m-d-r/Card/Card.js";
import CardHeader from "components/m-d-r/Card/CardHeader.js";
import CardIcon from "components/m-d-r/Card/CardIcon.js";
import CardBody from "components/m-d-r/Card/CardBody.js";
import CardFooter from "components/m-d-r/Card/CardFooter.js";
*/

import Loading from "components/misc/Loading";
import DataLoadError from "components/misc/DataLoadError";

import {
    procurementPeriods as days,
} from "config/enum-values";

//import dashboardStyle from "assets/jss/m-d-r/views/dashboardStyle.js";
//import checkboxAndRadioStyle from "assets/jss/m-d-r/checkboxAndRadioStyle.js";

//const useStyles = makeStyles( {} );
/*    ...dashboardStyle,
    ...checkboxAndRadioStyle,
});*/


const ProcurementBoardPage = () => {

    const FREQ_VALUES = ['last', 'avrg', 'max'];
    const FREQ_LAST = 0;
    const FREQ_AVRG = 1;
    const FREQ_MAX = 2;

    const SUPPLY_FROM = ['ru', 'by', 'eu'];
    const FROM_RU = 0;
    const FROM_BY = 1;
    const FROM_EU = 2;

    const [filterByFreq, setFilterByFreq] = useState( FREQ_VALUES[ FREQ_LAST ]);
    const [filterByFrom, setFilterByFrom] = useState( SUPPLY_FROM );

    const [isLoaded, setIsLoaded] = useState( false );
    const [isDataLoadingError, setIsDataLoadingError] = useState( false );
    const [serverDataset, setServerDataset] = useState( [] );        // Array of Hash
    //  /server/sample-datasets/procurements.js
    // Viewing lists for Table
    const [shortPeriod, setShortPeriod] = useState( [] );  // Array of Array
    const [middlePeriod, setMiddlePeriod] = useState( [] );
    const [longPeriod, setLongPeriod] = useState( [] );
    const [xtraLongPeriod, setXtraLongPeriod] = useState( [] );

    const [dataServerResponse, setDataServerResponse] = useState( {} );


    const tableHeader = (period) => {

        const lineCount = {
            sp: shortPeriod.length,
            mp: middlePeriod.length,
            lp: longPeriod.length,
            xlp: xtraLongPeriod.length,
        };
        return [
            '#', 'La', 'Av', 'Mx', `Название (${lineCount[ period ]})`
        ];
    };


    const handleFilterByFreqChange = (event) => {

        const freq = event.target.value;
        updateViewingLists( freq, undefined );
        setFilterByFreq( freq );
        debug( 'handle_FREQ_filterChange:', freq );
    };


    const handleFromFilterClick = (from) =>

        (event) => {
            const currentIndex = filterByFrom.indexOf( from );
            debug( 'event.target', event.target.checked, currentIndex, from );
            const newChecked = [ ...filterByFrom ];

            if( currentIndex === -1 ) {
                newChecked.push( from );
            } else {
                newChecked.splice( currentIndex, 1 );
            }
            debug( 'handle_FROM_filterClick:', newChecked );
            updateViewingLists( undefined, newChecked );
            setFilterByFrom( newChecked );
        };


    const isFromIntersected = (item, fromFilter) => {

        const itemFroms = item.from.
            split( ',' ).
            map( x => x.trim().toLowerCase() );
        //debug( 'isIntersected, itemFroms ', itemFroms );
        const result = fromFilter.filter( x => itemFroms.includes( x ));
        return result.length !== 0;
    };


    const serverDatasetFilter = (period, freq, fromFilter) => {
        const freqId = FREQ_VALUES.indexOf( freq ); // 0|1|2
        return (
            (item) => item[ period ][ freqId ] > 0
                && isFromIntersected( item, fromFilter )
        );
    };


    const convertToViewList = (period, freq, from) => new Promise(
        (resolve) => {
            const filtering = serverDatasetFilter( period, freq, from );
            const viewList = serverDataset.
                filter( filtering ).
                map( (item, key) => {
                    return [
                        ( key+1 ).toString(),
                        item[ period ][FREQ_LAST].toString(),
                        item[ period ][FREQ_AVRG].toString(),
                        item[ period ][FREQ_MAX].toString(),
                        item.name
                    ];
                });
            //debug( 'convertToView:', freqId, viewList.length );
            resolve( viewList );
        })
    ;


    const updateViewingLists = (freq=filterByFreq, from=filterByFrom) => {

        debug( '!!! updateViewLists freq=', freq, 'from=', from );
        Promise.all([
            convertToViewList( 'sp', freq, from ),
            convertToViewList( 'mp', freq, from ),
            convertToViewList( 'lp', freq, from ),
            convertToViewList('xlp', freq, from )
        ]).
        then( (lists) => {
            setShortPeriod( lists[0] );
            setMiddlePeriod( lists[1] );
            setLongPeriod( lists[2] );
            setXtraLongPeriod( lists[3] );
            debug( 'updateViewingLists', lists.map( l => l.length ));
        }).catch( (err) => {
            console.log( 'Error convert to ViewList', err );
        });
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchLists = () => {

        const { origin } = window.location;
        const route = `${origin}/api/sum/procurement/last`;

        //debug( 'fetchLists window.location.origin: ', origin );
        console.log( 'fetch Lists from:', route );

        let headers = {
            mode: "cors",
            credentials: "omit",
            "Content-Type": "application/json",
            "Cache-Control": 'no-cache, no-store',
            charset: "utf-8"
        };

        fetch( route, { headers }).
        then( (response) => {
            if( !response.ok ) {
                setDataServerResponse( response );
                setIsDataLoadingError( true );
                console.log( 'fetch is not ok', response );
                throw new Error( 'Ответ сети был не ok.' );
            }
            return response.json();
        }).  // '[{}, ..., {}]'
        then( (hashs) => {
            console.log( 'fetch Lists has length:', hashs.length );
            //is Ok: 444
            setServerDataset( hashs );
            setIsLoaded( true );
            setIsDataLoadingError( false );
        }).
        catch( (err) => {
            setIsLoaded( false );
            setIsDataLoadingError( true );
            console.log( 'ProcurementBoard.fetchLists catch', err );
        });
    };

    //Эффект применяется после рендеринга и только 1 раз
    // esl--int-disable-next-line react-hooks/exhaustive-deps
    useEffect( fetchLists, [] );
    //useEffect( () => fetchLists(), [] );

    useEffect(
        () => {
            updateViewingLists( filterByFreq, filterByFrom );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [serverDataset]
    );

    const isFilterByFromChecked = (index) =>
        filterByFrom.includes( SUPPLY_FROM[ index ]);

    //const classes = useStyles();

    if( isDataLoadingError ) {
        return (
            <DataLoadError fetchapiResponse={dataServerResponse} />
        );
    }
    if( !isLoaded ) { return <Loading/>; }


    return (<>
        <GridContainer><GridItem xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={1}>
                <Grid container>
                    <Grid item xs={4}><Card>
                        <CardHeader
                            title = "По продажам"
                            subheader = "выбор по частоте"
                        />
                        <CardContent>
                            <RadioGroup
                                aria-labelledby = "select-items-by-sales-freq"
                                name = "filter-by-sales-frequency"
                                value = {filterByFreq}
                                onChange = {handleFilterByFreqChange}
                            >
                                <FormControlLabel
                                    value = {FREQ_VALUES[ FREQ_LAST ]}
                                    control = {<Radio
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                    label = "Last"
                                />
                                <FormControlLabel
                                    value = {FREQ_VALUES[ FREQ_AVRG ]}
                                    control = {<Radio
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                    label = "Средние"
                                />
                                <FormControlLabel
                                    value = {FREQ_VALUES[ FREQ_MAX ]}
                                    control = {<Radio
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                    label = "Maximal"
                                />
                            </RadioGroup>
                        </CardContent>
                    </Card></Grid>
                    <Grid item xs={4}><Card>
                        <CardHeader
                            title = "Откуда"
                            subheader = "выбор по источнику"
                        />
                        <CardContent>
                            <FormGroup>
                                <FormControlLabel
                                    label = "RU"
                                    control = {<Checkbox
                                        checked = {isFilterByFromChecked( FROM_RU )}
                                        onChange = {handleFromFilterClick( "ru" )}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                />
                                <FormControlLabel
                                    label = "BY"
                                    control = {<Checkbox
                                        checked = {isFilterByFromChecked( FROM_BY )}
                                        onChange = {handleFromFilterClick( "by" )}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                />
                                <FormControlLabel
                                    label = "EU"
                                    control = {<Checkbox
                                        checked = {isFilterByFromChecked( FROM_EU )}
                                        tabIndex = {-1}
                                        onChange = {handleFromFilterClick( "eu" )}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />}
                                />
                            </FormGroup>
                        </CardContent>
                    </Card></Grid>
                    <Grid item xs={4}><Card>
                        <CardHeader
                            title = "Дней"
                            subheader = "how many sales days"
                        />
                    </Card></Grid>
                </Grid>
            </Paper>
        </GridItem>
        </GridContainer>

        <GridContainer><GridItem xs={12} sm={10} md={8} lg={6}>
            <CustomTabs
                title = "Заказ на:"
                headerColor = "primary"
                tabs = {[
                    {
                        tabName: `${days.short} дней`,
                        tabIcon: ShortPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = "danger"
                                tableHead = {tableHeader('sp')}
                                tableData = {shortPeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.middle} дня`,
                        tabIcon: MiddlePeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = "warning"
                                tableHead = {tableHeader('mp')}
                                tableData = {middlePeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.long} дней`,
                        tabIcon: LongPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = "primary"
                                tableHead = {tableHeader('lp')}
                                tableData = {longPeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.xtraLong} дней`,
                        tabIcon: XtraLongPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = "info"
                                tableHead = {tableHeader('xlp')}
                                tableData = {xtraLongPeriod}
                            />
                        )
                    }
                ]}
            />
        </GridItem>
        </GridContainer>
    </>);
};

export default ProcurementBoardPage;
