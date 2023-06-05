import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Favourite() {
  const [favoriteData, setFavoriteData] = useState([]);

  const router = useRouter();
  const { favoriteData: favoriteDataQueryParam } = router.query;

  useEffect(() => {
    if (favoriteDataQueryParam) {
      const parsedData = JSON.parse(favoriteDataQueryParam);
      setFavoriteData(parsedData);
    }
  }, [favoriteDataQueryParam]);
  console.log('fav' ,favoriteData);

  return (
    <div>
      <h1>Favorites Page</h1>
      {favoriteData.length > 0 ? (
        favoriteData.map((data) => (
          <div className='favorite-item tour-container' key={data.id}>
            <h2>{data.city}</h2>
            <p>{data.description}</p>
            <p>₹ {data.cost}</p>
          </div>
        ))
      ) : (
        <p className='no-favorites'>No favorite tours yet.</p>
      )}
      <Link href="/tour">
        Go back to Tour
      </Link>
    </div>
  );
}
