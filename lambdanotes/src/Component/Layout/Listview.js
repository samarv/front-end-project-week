import React, { Component } from 'react';
import Notecard from '../Reusables/Notecard';
import Mybutton from '../Reusables/Mybutton';
import Styles from '/Users/samar/Documents/js/lambdaschool/course/front-end-project-week/lambdanotes/src/Styles/Listview.css';

export default class Listview extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col" id = "sidebar">
                    <h1> Lambda Notes </h1>
                    <Mybutton text = "View your notes"/>
                    <Mybutton text = "+ Create new notes"/>
            </div>
            <div className="col-8">
                    <h2> Your</h2>
                    <h2> Notes </h2>
                <div className="row">
  
                    <Notecard />
                    <Notecard />
                    <Notecard />
                    <Notecard />
                    <Notecard />
                    <Notecard />
              </div>
            </div>
            
        </div>
      </div>
    )
  }
};
