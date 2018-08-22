import React, { Component } from 'react';
import GetRecordFormContainer from '../containers/GetRecordFormContainer';

class GetRecord extends Component {
  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h1>Get Record</h1>
            <GetRecordFormContainer />
          </div>
        </div>
      </main>
    );
  }
}

export default GetRecord;
