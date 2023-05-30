import React from 'react'

export default function FilterCosts(props) {
    return (
        <div className='filter-main'>
            <label htmlFor='filter'>Filter by Cost: </label>
            <select id='filter' value={props.selected} onChange={props.onChange} className='filter-input'>
                <option value='0'>All</option>
                <option value='1'>1 - 2,000</option>
                <option value='2'>2,000 - 5,000</option>
                <option value='3'>5,000 - 10,000</option>
                <option value='4'>10,000 or Above</option>
            </select>
        </div>
    )
}
