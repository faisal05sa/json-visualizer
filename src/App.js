import React, { Component } from 'react';
import './App.css';

import FormComponent from './components/form';
import OutputComponent from './components/output';

class App extends Component {
  state = {
    settings: {
      use_mono: false,
      truncate: false,
    },
    json: null,
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <FormComponent onInputChange={ this.handleInputChange }/>
          </div>
          <div className="col-12">
            <OutputComponent data={ this.state.json } settings= {this.state.settings }/>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleInputChange = (inputState) => {
    this.setState(inputState);
  }
}

export default App;
