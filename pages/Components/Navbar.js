import Link from 'next/link'
import React from 'react'
import '../../styles/Home.module.css'

export default function Navbar() {
  return (
    <React.Fragment>
    <div className='navbar'>
      <h2>
        <Link href='/'>Next demo</Link>
      </h2>
      <ul>
        <li><Link href='/tour' className='links' >Tour Lists</Link></li>
        <li><Link href='/tourId' className='links' >Tour Guidance</Link></li>
      </ul>
    </div>
    </React.Fragment>
  )
}
