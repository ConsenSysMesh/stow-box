import React, { Component } from 'react'
import SearchFormContainer from '../../ui/searchform/SearchFormContainer'

class Search extends Component {
  render () {
    return (
      <main className='container'>
        <div className='pure-g'>
          <div className='pure-u-1-1'>
            <h1>Search</h1>
            <p>Fill the form to search</p>
            <SearchFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Search
