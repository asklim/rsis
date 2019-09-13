import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error Boundary:', error, info);
  }

  render() {
    if(this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

