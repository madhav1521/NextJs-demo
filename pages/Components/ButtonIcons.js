import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ButtonIcons(props) {
    return (
        <div className='icons'>
            <button type='submit' className='icon-btns delete' onClick={props.onDelete} ><DeleteIcon color='secondary' sx={{'&:hover': { color: 'red' } }}  /></button>
            <button type='reset' className='icon-btns edit' onClick={props.onEdit} ><EditIcon color='secondary' sx={{'&:hover': { color: 'green' }}}  /></button>
        </div>
    )
}
