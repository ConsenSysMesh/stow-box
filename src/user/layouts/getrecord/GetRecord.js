import React, { Component } from 'react'
import GetRecordFormContainer from '../../ui/getrecord/GetRecordFormContainer'
import store from '../../../store'

class GetRecord extends Component {
  render() {
    const ShowAddress = () =>
    {
      if(store.getState().web3.web3Account){
        return(<h4>User Address: {store.getState().web3.web3Account}</h4>)
      }
      else{
        return(<h4>No Metamask Address Found</h4>)
      }
    }

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Get Record</h1>
            <ShowAddress />
            <GetRecordFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default GetRecord