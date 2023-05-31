import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UpdateForm = () => {
  const router = useRouter();
  const { id, tours } = router.query;
    const [loading, setLoading] = useState(true);
    const [toursData, setToursData] = useState([]);
    const [loadedTours, setLoadedTours] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    description: '',
    cost: '',
  });

  useEffect(() => {
    if (tours) {
      const parsedTours = JSON.parse(tours);
      setLoadedTours(parsedTours);
    }
  }, [tours]);

  useEffect(() => {
    if (id && loadedTours.length > 0) {
      const tour = loadedTours.find((tour) => tour.id === id);

      if (tour) {
        setFormData({
          city: tour.city,
          description: tour.description,
          cost: tour.cost,
        });
      }
    }
  }, [id, loadedTours]);

  useEffect(() => {
  const fetchToursData = async () => {
      try {
          const response = await fetch(`https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details/${id}.json`);
          if (!response.ok) {
              console.log('Failed to fetch tours data.');
              throw new Error('Failed to fetch data.');
          }
          const responseData = await response.json();

          const loadedTours = [];
          for (const key in responseData) {
              if (responseData[key] && responseData[key].city) {
                  loadedTours.push({
                      id: key,
                      city: responseData[key].city,
                      description: responseData[key].description,
                      cost: responseData[key].cost,
                  });
              }
          }
          setToursData(loadedTours);
          setLoading(false);
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  };

  fetchToursData();
}, [loadedTours]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic for updating the tour data
    console.log('Updated form data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Update Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
