import React from 'react'

export default function SortCities(props) {
    return (
        <div className='cities-sort'>
            <button onClick={props.onClick} >Sort {props.sorting ? 'descending' : 'Ascending'} ↑↓</button>
        </div>
    )
}
