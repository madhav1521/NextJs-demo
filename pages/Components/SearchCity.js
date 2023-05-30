import React from 'react'

export default function SearchCity(props) {
  return (
    <div className='search-city'>
      <label htmlFor='city'>Search by City: </label>
      <input type='search' value={props.selected} onChange={props.onChange} id='city' />
    </div>
  )
}
