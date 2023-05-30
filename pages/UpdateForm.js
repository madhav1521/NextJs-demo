import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UpdateForm() {
  const router = useRouter();
  const { id } = router.query; // Retrieve the tour ID from the route

  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    // Fetch the tour data based on the tour ID
    const fetchTourData = async () => {
      try {
        const response = await fetch(`https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details/${id}.json`);
        if (!response.ok) {
          console.log('Failed to fetch tour data.');
          throw new Error('Failed to fetch data.');
        }
        const tour = await response.json();
        setTourData(tour);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchTourData();
    }
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the update request to your API with the updated tour data
    // ...

    // Redirect back to the index page or any other desired page
    router.push('/');
  };

  if (!tourData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Update Tour Form</h1>
      {/* Render the form with the tourData and handleFormSubmit function */}
      <form onSubmit={handleFormSubmit}>
        {/* Update form fields based on the tourData */}
        <input type="text" value={tourData.title} onChange={(e) => setTourData({ ...tourData, title: e.target.value })} />
        {/* Add more form fields for other tour properties */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
