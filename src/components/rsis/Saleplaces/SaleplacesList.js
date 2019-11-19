import React from 'react';
import fetch from 'isomorphic-fetch';

import SaleplaceFull from './SaleplaceFull.js';
import SaleplacesSummary from './SaleplacesSummary.js';


export default class SaleplacesList extends React.Component {

  state = {
    list: [],
    loading: false
  };     

  componentDidMount = () => 
  {
    //console.log('compDidMount');
    this._getPlacesList();
  }

  //FE - функциональное выражение: 
  //     this определяется в момент вызова.
  //  Привязка в конструкторе не нужна.

  _getPlacesList = () =>
  {
    //console.log('getPlacesList');
    this.setState({loading: true});
    let route = window.location.origin;
    //route += host+'/api/config/saleplaces';
    route += '/api/config/agents';
    console.log(route);

    fetch(route)
      .then( response => response.json())  // '[{}, ..., {}]'      
      .then( agents => {
        //console.log(places);
        return agents.filter( 
          agent => agent.type == 'saleplace'
        );
      })
      .then( places => {
        // console.log(places);
        return places.map( 
          (place) => {
            let {id, host, updatedAt} = place;
            return ( 
              {...place.body, 
               id,
               host,
               updatedAt
              }
              /*Object.assign( {},              
                place.body,
                {id: place.id},
                {host: place.host},
                {updatedAt: place.updatedAt}              
              )*/
            );
        });         
      })
      .then(list => {
        //console.log(list);      
        this.setState({list});
        this.setState({loading: false});        
      })
      .catch(err => {
        console.log(err); 
      })
    ;
  }

  _templateSimpleDiv = (lst) =>
    lst.map(
    (item,index) => 
      <div key={index}>
        <SaleplaceFull data={item} />
      </div>  
  );
    

  _templateHorizontalInline = (lst) =>
  {
    return (
      <table><tbody>
        <tr>
        {lst.map((item,index) => 
          {
            return (    
              <td key={index}>
                <div>
                <SaleplaceFull data={item} />
                </div>
              </td>  
          );}
        )}
        </tr>
      </tbody></table>
    );
  }

  render() 
  {
    const { list, loading } = this.state;
    
    //console.log(list.length);
    //  var data = this.props.data;

    if (loading) 
    {
      return <div>Loading saleplaces ...</div>;
    } 
    else {
      //let listTemplate;

      let listTemplate = list.length > 0 
        ? this._templateSimpleDiv(list)
        : <p>Список пуст</p>
      ;
      //console.log(list.length);     
      return (
        <div>
          <div>
            <SaleplacesSummary count={list.length}/>
          </div>
          <div className="saleplaceslist">
              {listTemplate}
          </div>
        </div>
      );     
    }      
  }
}
