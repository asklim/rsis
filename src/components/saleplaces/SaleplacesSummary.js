import React from 'react';
import PropTypes from 'prop-types';

export default class SaleplacesSummary extends React.Component {

  static propTypes = {
    count: PropTypes.number.isRequired
  };

  render() 
  {  
    const { count } = this.props;
    return (
      <div className="saleplacessummary">
        <strong className='summary'>Всего торговых мест: {count}</strong>
      </div>
    );
  }
}
