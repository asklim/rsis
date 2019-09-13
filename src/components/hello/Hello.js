import React from 'react';
import Comments from './Comments.js';
import News from './News.js';

export default class Hello extends React.Component {
  // displayName: 'Hello',
  render() {
    return (
      <div className="hello">
        Всем привет, я компонент Hello! Я умею отображать новости.
      <News />
      <Comments />
      </div>
    );
  }
}

