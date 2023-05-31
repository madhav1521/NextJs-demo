import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Favourite() {

  const router = useRouter();
  const { favoriteData } = router.query;
  const parsedData = favoriteData ? JSON.parse(favoriteData) : [];

  return (
    <div>
    <h1>Favorites Page</h1>
      {parsedData.length > 0 ? (
        parsedData.map((data) => 
           
              (<div className='favorite-item' key={data.id}>
                <h2>{data.city}</h2>
                <p>{data.description}</p>
                <p>₹ {data.cost}</p>
              </div>)
            
        )
      ) : (
        <p className='no-favorites'>No favorite tours yet.</p>
      )}
      <Link href="/tour">
        Go back to Home
      </Link>

    </div>
  )
}
