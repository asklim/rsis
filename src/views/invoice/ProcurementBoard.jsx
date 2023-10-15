import { debugFactory } from 'utils/debuggers.js';
const d = debugFactory('invoice:procurement');

import * as React from 'react';
//import PropTypes from 'prop-types';

// Google Material-UI/core
import { /*alpha,*/ styled } from '@mui/material/styles';
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

// Google Material-UI/icons
import {
    Battery20 as ShortPeriod,
    Battery50 as MiddlePeriod,
    Battery80 as LongPeriod,
    BatteryFull as XtraLongPeriod,
    //AddAlert,
    //Check,
    //Store, Warning, DateRange, LocalOffer,
    //Update, ArrowUpward, AccessTime,  Accessibility
} from '@mui/icons-material';

// core components
import GridItem from 'components/m-d-r/Grid/GridItem.jsx';
import GridContainer from 'components/m-d-r/Grid/GridContainer.jsx';
import Table from 'components/m-d-r/Table/Table.jsx';
import CustomTabs from 'components/m-d-r/CustomTabs/CustomTabs.jsx';
//import SnackbarContent from 'components/m-d-r/Snackbar/SnackbarContent.jsx';
//import Tasks from 'components/m-d-r/Tasks/Tasks.jsx';
/*
import Danger from 'components/m-d-r/Typography/Danger.jsx';
import Card from 'components/m-d-r/Card/Card.jsx';
import CardHeader from 'components/m-d-r/Card/CardHeader.jsx';
import CardIcon from 'components/m-d-r/Card/CardIcon.jsx';
import CardBody from 'components/m-d-r/Card/CardBody.jsx';
import CardFooter from 'components/m-d-r/Card/CardFooter.jsx';
*/

import Loading from 'components/misc/Loading.jsx';
import DataLoadError from 'components/misc/DataLoadError.jsx';

// import { procurementPeriods as days } from '<root>/config/enum-values';

const PREFIX = 'ProcurementBoard';
const classes = {
    root:     `${PREFIX}-root`,
    settings: `${PREFIX}-settings`,
};
// eslint-disable-next-line no-unused-vars
const RootSxDiv = styled('div')( ({ theme }) => {
    const navbarHeight = 84;
    return ({
        [`&.${classes.root}`]: {
            // `&.${...` without spaces (root styles)
            //display: 'flex',
            height: '100%',
            position: 'relative',
            top: '0',
        },
        [`&${' '}.${classes.settings}`]: {
            width: '100%',
            position: 'sticky',
            top: `-${navbarHeight+266}px`,
            zIndex: 2,
        },
    });
});


const ProcurementBoardPage = () => {

    const FREQ_VALUES = ['last', 'avrg', 'max'];
    const freqLAST = 0;
    const freqAVRG = 1;
    const freqMAX = 2;

    const SUPPLY_FROM = ['ru', 'by', 'eu'];
    const fromRU = 0;
    const fromBY = 1;
    const fromEU = 2;

    const days = React.useRef({
        short:    0,
        middle:   0,
        long:     0,
        xtraLong: 0,
    });

    const [filterByFreq, setFilterByFreq] = React.useState( FREQ_VALUES[ freqLAST ]);
    const [filterByFrom, setFilterByFrom] = React.useState( SUPPLY_FROM );

    const [isLoaded, setIsLoaded] = React.useState( false );
    const [isDataLoadingError, setIsDataLoadingError] = React.useState( false );
    const [serverDataset, setServerDataset] = React.useState( {} );        // Dictionary of Hash
    //  /server/sample-datasets/procurements.js

    // Viewing lists for Table
    const [shortPeriod, setShortPeriod] = React.useState( [] );  // Array of Array
    const [middlePeriod, setMiddlePeriod] = React.useState( [] );
    const [longPeriod, setLongPeriod] = React.useState( [] );
    const [xtraLongPeriod, setXtraLongPeriod] = React.useState( [] );

    const [dataServerResponse, setDataServerResponse] = React.useState( {} );


    const tableHeader = (
        period
    ) => {
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

    const isFromIntersected = (
        item,
        fromFilter
    ) => {
        const itemFroms = item.from.split(',').
            map( x => x.trim().toLowerCase() );
        //debug('isIntersected, itemFroms ', itemFroms );
        const result = fromFilter.filter( x => itemFroms.includes( x ));
        return result.length !== 0;
    };

    const serverDatasetFilter = (
        period,
        freq,
        fromFilter
    ) => {
        const freqId = FREQ_VALUES.indexOf( freq ); // 0|1|2
        return (
            (item) => item[ period ][ freqId ] > 0
                && isFromIntersected( item, fromFilter )
        );
    };

    const convertToViewList = (
        period,
        freq,
        from
    ) => new Promise( (resolve) => {
        const filtering = serverDatasetFilter( period, freq, from );
        const viewList = serverDataset.procurement.
            filter( filtering ).
            map( (item, key) => {
                return [
                    ( key+1 ).toString(),
                    item[ period ][freqLAST].toString(),
                    item[ period ][freqAVRG].toString(),
                    item[ period ][freqMAX].toString(),
                    item.name
                ];
            });
        //debug('convertToView:', freqId, viewList.length );
        resolve( viewList );
    });

    const updateViewingLists = (
        freq = filterByFreq,
        from = filterByFrom
    ) => {
        d('!!! updateViewLists freq=', freq, 'from=', from );
        days.current = serverDataset?.periods;
        Promise.all([
            convertToViewList('sp', freq, from ),
            convertToViewList('mp', freq, from ),
            convertToViewList('lp', freq, from ),
            convertToViewList('xlp', freq, from )
        ]).
        then( (lists) => {
            setShortPeriod( lists[0] );
            setMiddlePeriod( lists[1] );
            setLongPeriod( lists[2] );
            setXtraLongPeriod( lists[3] );
            d('updateViewingLists', lists.map( l => l.length ));
        }).
        catch( (err) => {
            console.log('Error convert to ViewList', err );
        });
    };

    const handleFilterByFreqChange = (
        event
    ) => {
        const freq = event.target.value;
        updateViewingLists( freq, undefined );
        setFilterByFreq( freq );
        d('handle_FREQ_filterChange:', freq );
    };


    const handleFromFilterClick = (
        from
    ) =>
        (event) => {
            const currentIndex = filterByFrom.indexOf( from );
            d('event.target', event.target.checked, currentIndex, from );
            const newChecked = [ ...filterByFrom ];

            if( currentIndex === -1 ) {
                newChecked.push( from );
            } else {
                newChecked.splice( currentIndex, 1 );
            }
            d('handle_FROM_filterClick:', newChecked );
            updateViewingLists( undefined, newChecked );
            setFilterByFrom( newChecked );
        }
    ;

    const fetchLists = (
    ) => {
        const { origin } = window.location;
        const route = `${origin}/api/dataset/procurement/last`;

        //debug('fetchLists window.location.origin: ', origin );
        d('fetch Lists from:', route );

        const headers = {
            mode: 'cors',
            credentials: 'omit',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store',
            charset: 'utf-8'
        };

        fetch( route, { headers }).
        then( (response) => {
            if( !response.ok ) {
                setDataServerResponse( response );
                setIsDataLoadingError( true );
                console.log('fetch is not ok', response );
                throw new Error('Ответ сети был не ok.');
            }
            return response.json();
        }).  // '[{}, ..., {}]'
        then( (dataset) => {
            console.log('fetch dataset has length:', Object.keys( dataset ).length );
            //is Ok: 2, not 444 or 409
            setServerDataset( dataset );
            setIsLoaded( true );
            setIsDataLoadingError( false );
        }).
        catch( (err) => {
            setIsLoaded( false );
            setIsDataLoadingError( true );
            console.log('ProcurementBoard.fetchLists catch', err );
        });
    };

    //Эффект применяется после рендеринга и только 1 раз
    React.useEffect( fetchLists, [] );

    React.useEffect(() => {
        updateViewingLists( filterByFreq, filterByFrom );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ serverDataset ]);

    const isFilterByFromChecked = (
        index
    ) => filterByFrom.includes( SUPPLY_FROM[ index ]);

    if ( isDataLoadingError ) {
        return (
            <DataLoadError fetchapiResponse={dataServerResponse} />
        );
    }
    if ( !isLoaded ) { return <Loading/>; }


    return (<RootSxDiv className={classes.root}>
        <div className={classes.settings}>
            <Grid container><Grid item xs={12} sm={10} md={8} lg={6}>
                <Paper elevation={1}>
                    <Grid container>
                        <Grid item xs={4}><Card>
                            <CardHeader
                                title = 'По продажам'
                                subheader = 'выбор по частоте'
                            />
                            <CardContent>
                                <RadioGroup
                                    aria-labelledby = 'select-items-by-sales-freq'
                                    name = 'filter-by-sales-frequency'
                                    value = {filterByFreq}
                                    onChange = {handleFilterByFreqChange}
                                >
                                    <FormControlLabel
                                        value = {FREQ_VALUES[ freqLAST ]}
                                        control = {<Radio
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                        label = 'Last'
                                    />
                                    <FormControlLabel
                                        value = {FREQ_VALUES[ freqAVRG ]}
                                        control = {<Radio
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                        label = 'Средние'
                                    />
                                    <FormControlLabel
                                        value = {FREQ_VALUES[ freqMAX ]}
                                        control = {<Radio
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                        label = 'Maximal'
                                    />
                                </RadioGroup>
                            </CardContent>
                        </Card></Grid>
                        <Grid item xs={4}><Card>
                            <CardHeader
                                title = 'Откуда'
                                subheader = 'выбор по источнику'
                            />
                            <CardContent>
                                <FormGroup>
                                    <FormControlLabel
                                        label = 'RU'
                                        control = {<Checkbox
                                            checked = {isFilterByFromChecked( fromRU )}
                                            onChange = {handleFromFilterClick('ru')}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                    />
                                    <FormControlLabel
                                        label = 'BY'
                                        control = {<Checkbox
                                            checked = {isFilterByFromChecked( fromBY )}
                                            onChange = {handleFromFilterClick('by')}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                    />
                                    <FormControlLabel
                                        label = 'EU'
                                        control = {<Checkbox
                                            checked = {isFilterByFromChecked( fromEU )}
                                            tabIndex = {-1}
                                            onChange = {handleFromFilterClick('eu')}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />}
                                    />
                                </FormGroup>
                            </CardContent>
                        </Card></Grid>
                        <Grid item xs={4}><Card>
                            <CardHeader
                                title = 'Дней'
                                subheader = 'how many sales days'
                            />
                        </Card></Grid>
                    </Grid>
                </Paper>
            </Grid>
            </Grid>
        </div>

        <GridContainer><GridItem xs={12} sm={10} md={8} lg={6}>
            <CustomTabs
                title = 'Заказ на:'
                headerColor = 'primary'
                tabs = {[
                    {
                        tabName: `${days.current.short} дней`,
                        tabIcon: ShortPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = 'danger'
                                tableHead = {tableHeader('sp')}
                                tableData = {shortPeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.current.middle} дня`,
                        tabIcon: MiddlePeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = 'warning'
                                tableHead = {tableHeader('mp')}
                                tableData = {middlePeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.current.long} дней`,
                        tabIcon: LongPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = 'primary'
                                tableHead = {tableHeader('lp')}
                                tableData = {longPeriod}
                            />
                        )
                    },
                    {
                        tabName: `${days.current.xtraLong} дней`,
                        tabIcon: XtraLongPeriod,
                        tabContent: (
                            <Table
                                tableHeaderColor = 'info'
                                tableHead = {tableHeader('xlp')}
                                tableData = {xtraLongPeriod}
                            />
                        )
                    }
                ]}
            />
        </GridItem>
        </GridContainer>
    </RootSxDiv>);
};

export default ProcurementBoardPage;
