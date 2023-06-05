import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UpdateForm = () => {
    const router = useRouter();
    const { id, tours } = router.query;

    const [formData, setFormData] = useState({
        // id:id,
        city:'city',
        description:'description',
        cost:'cost'
    });

    useEffect(() => {
        if (tours) {
            const parsedTours = JSON.parse(tours);
            setFormData({
                city: parsedTours.city || '',
                description: parsedTours.description || '',
                cost: parsedTours.cost || '',
            });
        }
    }, [tours]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Update Form</h1>
            <form >
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