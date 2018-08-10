import React, { Component } from 'react';
import Categories from './Categories.js';
import './CSS/App.css';
import './CSS/bootstrap.min.css';
import {GetFilteredData} from './DataParser.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      categoryData: [],
      searchString : ""
    };

    this.onTextInputHadler = this.onTextInputHadler.bind(this);
  }

  componentWillMount() {
    this.state.categoryData = GetFilteredData("");
  }

  onTextInputHadler(event){
    this.setState({
      searchString : event.target.value,
      categoryData : GetFilteredData(event.target.value)
    })
  }

  render() {
    
    return (
      <div className="container">
        <div className="row" >
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="input-group">
              <input type="text" className="form-control" value={this.state.searchString} 
                    placeholder="Search" onChange={this.onTextInputHadler}/>
              </div>
            </div>
        </div>

        <br/>

        <Categories category={this.state.categoryData} searchQuery={this.state.searchString}/>
      </div>
    );
  }
}

export default App;
