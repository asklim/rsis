import React from "react";
import PropTypes from "prop-types";


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import { 
  Checkbox,
  Radio, //from '@material-ui/core/Radio';
  RadioGroup, //from '@material-ui/core/RadioGroup';
  FormControlLabel, // from '@material-ui/core/FormControlLabel';
  FormControl,  //from '@material-ui/core/FormControl';
  FormLabel,
  FormGroup,
} from '@material-ui/core';
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { 
  Battery20 as ShortPeriod,
  Battery50 as MiddlePeriod,
  Battery80 as LongPeriod,
  BatteryFull as XtraLongPeriod,
  AddAlert,
  Check,
} from "@material-ui/icons";
/*import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
*/


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
//import Tasks from "components/Tasks/Tasks.jsx";


/*
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
*/

import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";

const procurementBoardStyle = {
  ...dashboardStyle,
  ...checkboxAdnRadioStyle,
};

import {
  procurementPeriods as days
} from "config/enumvalues";



class ProcurementBoardPage extends React.Component {
  state = {
    filterByFreq : 'last',
    filterByFrom : ['ru','by','eu'],
    isLoaded : false,
    serverDataset : [],  // Array of Hash /server/sample-datasets/procurements.js
    shortPeriod : [],    // Array of Array
    middlePeriod : [],
    longPeriod : [],
    xtraLongPeriod : [],    
  };
  
  freqValues = ['last','avrg','max'];
  fromValues = ['ru','by','eu'];

  tableHeader = ( period ) => {
    const lineCount = {
      sp : this.state.shortPeriod.length,
      mp : this.state.middlePeriod.length,
      lp : this.state.longPeriod.length,
      xlp : this.state.xtraLongPeriod.length,
    };
    return [
      '#', 'La', 'Av', 'Mx', `Название (${lineCount[period]})`
    ];    
  };

  handleFilterByFreqChange = event => {
    const freq = event.target.value;
    //console.log("filter Freq: ", freq );
    this.setState({ filterByFreq : freq });
    this.updateViewingLists( freq, null );
  };

  handleFromFilterClick = from => 
    (/*event,oldValue?*/) => {
      const { filterByFrom : checked } = this.state;
      const currentIndex = checked.indexOf(from);
      const newChecked = [...checked];

      if (currentIndex === -1) {
          newChecked.push(from);
      } else {
          newChecked.splice(currentIndex, 1);
      }
      this.setState({
          filterByFrom : newChecked,
      });
      this.updateViewingLists( null, newChecked );
      //console.log('FromFilter Click:', newChecked);
  };
  /*
  formatValue = ( out, curr ) => {
    return out + '   ' + curr.toString();
  }
  formatUnits = (needUnits) => {
    return needUnits.reduce(this.formatValue, '');     
  } */

  isFromIntersected = (item, fromFilter) => { 
    const itemFroms = item.from.split(',').map(x => x.toLowerCase());
    //console.log('isIntersected : ', itemFroms);
    const result = fromFilter.filter(x => itemFroms.includes(x));
    return result.length !== 0;
  };
  
  serverDatasetFilter = ( period, freqId, fromFilter ) => {
    return ( 
      item => item[period][freqId] > 0 &&
      this.isFromIntersected( item, fromFilter )
    );
  };

  convertToViewList = ( state, period ) => 
  {
    const freqId = this.freqValues.indexOf( state.filterByFreq ); // 0|1|2
    const filtering = this.serverDatasetFilter( 
      period, freqId, state.filterByFrom 
    );
    const hashs = state.serverDataset;    
    const viewList = hashs
      .filter( filtering ) // item => item[period][freqId] > 0 ) 
      .map( (item, key) => {
        return [ 
          (key+1).toString(),  
          item[period][0].toString(), // last 
          item[period][1].toString(), // average 
          item[period][2].toString(), // max
          item.name
        ];
      });
    //console.log("convertToView : ", freqId, hashs.length, viewList.length ); 
    const p = Promise.resolve(viewList); 
    //console.log("convertToView : ", p);
    return p;
  }

  updateViewingLists = (freq, from) => {  
    //console.log("updateViewLists this.state ",this.state);
    const { state : oldState } = this; 
    if(freq) { oldState.filterByFreq = freq; }
    if(from) { oldState.filterByFrom = from; } 
    //console.log("updateViewLists oldState ", oldState);
    Promise.all([
      this.convertToViewList( oldState, 'sp' ),
      this.convertToViewList( oldState, 'mp' ),
      this.convertToViewList( oldState, 'lp' ),
      this.convertToViewList( oldState, 'xlp' )
    ])
    .then( lists => {
//console.log("updateViewLists ", lists.map( item => item.length ));      
      this.setState({ 
        shortPeriod : lists[0],
        middlePeriod : lists[1],
        longPeriod : lists[2],
        xtraLongPeriod : lists[3],          
      });
    });
  };

  fetchLists = () => {    
    let route = window.location.origin;
    route += '/api/sum/procurement/last';
    //console.log('ProcurementBoard.fetchLists route: ', route);    
    fetch(route,{
      headers : {
        "Content-Type" : "application/json",
        "Cache-Control" : 'no-cache, no-store',
        "charset" : "utf-8"
      }
    })
    .then( response => response.json())  // '[{}, ..., {}]'      
    .then( hashs => {
      //console.log('fetch Lists Length: ', hashs.length);
      this.setState({ 
        serverDataset : hashs,
        isLoaded : true,
      });    
    })
    .then( () => {
      //console.log("Update ViewLists after fetch from server.");
      //console.log(this.state);
      this.updateViewingLists( 'last' );
    })
    .catch(err => {
      this.setState({ isLoaded : false });
      console.log(err); 
    });    
  };
  componentDidMount = () => this.fetchLists();

  isFilterByFromChecked = index =>
    this.state.filterByFrom.includes(this.fromValues[index])

  render() 
  {
    const { classes } = this.props;
    const { isLoaded, ...rest } = this.state;
    //console.log('state: ', this.state);

    return !isLoaded ?
    (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={4}>
        <SnackbarContent
          message = {'Loading ...'}
          color="info"
          icon={AddAlert}
        />
        </GridItem>
      </GridContainer>
    ):(
      <div>
      <GridContainer>
        <GridItem xs={5} sm={4} md={3} lg={2}> 
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">По продажам</FormLabel>
          <RadioGroup
            aria-label="SelectOnFreq"
            name="FilterByFreq"
            className={classes.group}
            value={this.state.filterByFreq}
            onChange={this.handleFilterByFreqChange}
          >
            <FormControlLabel 
              value={this.freqValues[0]} 
              control={<Radio />} 
              label="Last"
            />
            <FormControlLabel 
              value={this.freqValues[1]}  
              control={<Radio />} 
              label="Средние" 
            />
            <FormControlLabel 
              value={this.freqValues[2]}  
              control={<Radio />} 
              label="Maximal" 
            />
          </RadioGroup>
          </FormControl>       
        </GridItem>
        <GridItem xs={5} sm={4} md={3} lg={2}> 
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Откуда</FormLabel>
        <FormGroup>
            <FormControlLabel
              control = {
                <Checkbox
                  checked={this.isFilterByFromChecked(0)}
                  tabIndex={-1}
                  onClick={this.handleFromFilterClick(this.fromValues[0])}
                  checkedIcon={<Check className={classes.checkedIcon}/>}
                  icon={<Check className={classes.uncheckedIcon}/>}
                  classes={{ checked: classes.checked }}
                />
              }
              label="RU"
            />
            <FormControlLabel
              control = {
                <Checkbox
                  checked={this.isFilterByFromChecked(1)}
                  tabIndex={-1}
                  onClick={this.handleFromFilterClick(this.fromValues[1])}
                  checkedIcon={<Check className={classes.checkedIcon}/>}
                  icon={<Check className={classes.uncheckedIcon}/>}
                  classes={{ checked: classes.checked }}
                />
              }
              label="BY"
            />
            <FormControlLabel
              control = {
                <Checkbox
                  checked={this.isFilterByFromChecked(2)}
                  tabIndex={-1}
                  onClick={this.handleFromFilterClick(this.fromValues[2])}
                  checkedIcon={<Check className={classes.checkedIcon}/>}
                  icon={<Check className={classes.uncheckedIcon}/>}
                  classes={{ checked: classes.checked }}
                />
              }
              label="EU"
            />            
          </FormGroup>
          </FormControl>  
        {/*  <Checkbox
            tabIndex={-1}
            onClick={this.handleFromFilterClick('ua')}
            checkedIcon={<Check className={classes.checkedIcon}/>}
            icon={<Check className={classes.uncheckedIcon}/>}
            classes={{ checked: classes.checked }}
          />*/}    
        </GridItem>
      </GridContainer>


      <GridContainer>  
        <GridItem xs={12} sm={10} md={8} lg={6}>
          <CustomTabs
            title="Заказ на:"
            headerColor="primary"
            tabs={[
              {
                tabName: `${days.short} дней`,
                tabIcon: ShortPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="danger"
                    tableHead={this.tableHeader('sp')}
                    tableData={rest.shortPeriod}
                  />
                )
              },
              {
                tabName: `${days.middle} дня`,
                tabIcon: MiddlePeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="warning"
                    tableHead={this.tableHeader('mp')}
                    tableData={rest.middlePeriod}
                  />
                )
              },
              {
                tabName: `${days.long} дней`,
                tabIcon: LongPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={this.tableHeader('lp')}
                    tableData={rest.longPeriod}
                  />
                )
              },
              {
                tabName: `${days.xtraLong} дней`,
                tabIcon: XtraLongPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="info"
                    tableHead={this.tableHeader('xlp')}
                    tableData={rest.xtraLongPeriod}
                  />
                )
              }
            ]}
          />
        </GridItem>
        
      </GridContainer>
      </div>
    );
  }
}

ProcurementBoardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(procurementBoardStyle)(ProcurementBoardPage);
