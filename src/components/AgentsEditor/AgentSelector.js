import React from 'react';
//import PropTypes from 'prop-types';

import ErrorBoundary from '../misc/ErrorBoundary';


const AGENTS_TYPES = [
  'saleplace', 
  'staffer',
];

export default class AgentSelector extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      agentsLists: [],
      isLoaded: false,
      hasError: false
    };   
  }

  componentDidMount = () => 
  {
    //console.log('compDidMount');
    this.loadAgentsLists();
    
  }


  getAgentsTypes = () => AGENTS_TYPES;
  

  loadAgentsLists = () =>
  {
    //this.setState({isLoaded: false});
    let loadCalls = [];
    /*
    this.getAgentsTypes().forEach(
      agentType => {
        console.log(agentType);
        let call = this.getAgentsList(agentType);
        loadCalls.push(call);
      }
    );*/

    loadCalls = this.getAgentsTypes().map(
      agentType => { 
        return new Promise( (resolve) => 
          this.getAgentsList(agentType, resolve)
        );
    });

    //console.log(loadCalls); //[Promise, Promise]

    Promise.all(loadCalls)
    .then( (/*values*/) => 
      {
      //console.log('values', values);
      this.setState((state) => {
        let { agentsLists } = state;
        let hasNull = false;

        //console.log('agentsLists.len:', agentsLists.length);
        if(!agentsLists.length){
          hasNull = true;
        }
        else {
          agentsLists.forEach( (typeX) => {
            //console.log('loadLists:', typeX.list);
            if(!typeX.list || !Array.isArray(typeX.list)) {
              hasNull = true;
            }
          });
        }

        /*  
          hasNull = agentsLists
            .map( typeX => typeX.list )
            .reduce(isNoValidData, false);        
        }

        const isNoValidData = (result, list) => {
          return (result || !list || !Array.isArray(list));
        };*/
        

        //console.log('hasNull:', hasNull);
        if(hasNull){
          return {hasError: true};
        }
        else {
          agentsLists.sort(
            (typeA,typeB) => {
              return (typeA.list.length - typeB.list.length);
            }
          );  
          return (
            { agentsLists,
              isLoaded: true }
          );
        }
      });
    })
    /*.then( () => {
      this.setState({});
    })*/
    .catch( error => {
      //this.setState({hasError: true});
      console.error('catch in loadAgentsLists'); 
      console.log(error.message);
    });

  }


  getAgentsList = (agentType, resolve) =>
  {    
    //let result = null;
    let route = window.location.origin;
    route += `/api/config/agents?list&type=${agentType}`;
    fetch(route)
      .then( response => response.json())
      .then( list => {
        //console.log('getAgentsList:', list);
        /*if(Array.isArray(list)) {
        result = {
          'caption': agentType, 
          'list': list};
        }
        */
        this.setState((state /*, props*/) => ({
          agentsLists:[
            ...state.agentsLists, 
            {'caption': agentType, 
                'list': list}
          ]})
        );
        resolve(true);
        //console.log(this.state);     
      })  
      .catch(err => {
        //this.setState({isLoadError: true});
        console.error('catch in getAgentsTypes'); 
        console.log(err); 
      })
    ;
    //return result;
  }

  renderOptGroup = (agents) =>
  {
    return (
      <optgroup 
        label={agents.caption}
        key={agents.caption}
        >
        {agents.list.map( 
          (agent) =>       
            <option value={agent.id} key={agent.id}>
            {agent.caption}
            </option>        
      )}
      </optgroup>
    );
  }

  changeEventHandler = (event) => {
    let {value} = event.target;
    if(value) alert('Selected ' + value);
  }

  renderSelector = () =>
  {
    const { 
      agentsLists, 
      isLoaded,
      hasError } = this.state;

    console.log('isLoaded, hasError:', isLoaded, hasError);
    
    if(hasError) {
      return <div>Load error.</div>;
    } 

    if(!isLoaded) {
      return <div>Loading saleplaces ...</div>;
    } 
    
    console.log('agentsList: ', agentsLists);
    return (
      <select 
        id="agentSelector" 
        onChange={this.changeEventHandler}      
        size="16"
        >
          {agentsLists.map( agentsObj =>
            this.renderOptGroup(agentsObj)
        )}
      </select>
    );
  }

  render()
  {
    return (
      <div className='AgentsEditorElement'>
        <h5>Agent Selector</h5>
        <ErrorBoundary>
        {this.renderSelector()}
        </ErrorBoundary>        
      </div>
    );
  }
}

