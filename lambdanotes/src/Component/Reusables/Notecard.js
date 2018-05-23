import React, { Component } from 'react';
import Styles from '../../Styles/Notecard.css';

const Notecard = (props) => {
    return (
      
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">{props.note.textBody}</p>
        </div>
      </div>
    )
};


export default Notecard;