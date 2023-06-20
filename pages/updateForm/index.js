import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { handleEdit } from "../tour/index";

const UpdateForm = () => {
    const handleFormSubmit = async (id, formData) => {
        try {
            const updatedData = {
                city: formData.city,
                description: formData.description,
                cost: formData.cost
            };

            await handleEdit(id, updatedData);
            console.log(`Tour ${id} successfully updated.`);
        } catch (error) {
            console.log("Error updating tour:", error);
        }
    };

    const router = useRouter();
    const { id, tours } = router.query;

    const [formData, setFormData] = useState({
        city: '',
        description: '',
        cost: ''
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
            <form onSubmit={handleFormSubmit}>
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
                <button>Update</button>
            </form>
        </div>
    );

};
export default UpdateForm;