import React from 'react';
//import PropTypes from 'prop-types';

import AgentSelector from './AgentSelector';
import AgentEditor from './AgentEditor';
import './AgentsEditor.css';


export default class AgentsEditor extends React.Component
{

  render()
  {
    return (
    <div>
      <div className='AgentsEditorWrapper'>
        <AgentSelector/>
        <AgentEditor />
      </div>
      <button>Info</button>
    </div>
    );
  }
}