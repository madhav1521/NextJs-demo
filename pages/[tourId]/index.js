import React, { useState } from 'react';
import useForm from '../Components/useNewHook';

const initialValues = {
  city: '',
  description: '',
  cost:''
};

const validationRules = {
  city: [
    { required: true, minLength: 3, maxLength: 20, pattern: /^[A-Za-z]+$/ }
  ],
  description: [
    { required: true, pattern: '' }
  ],
  cost: [
    { required: true, minLength: 1, maxLength: 7, pattern: /^\d+$/ }
  ]
};

export default function tourId(props) {
  const {
    formValues,
    formErrors,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm
  } = useForm(initialValues, validationRules);

  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = e => {
    e.preventDefault();

    if (isFormValid) {
      fetch('https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

      resetForm();
    }
  };

  const invalidInputCity = formErrors.city ? 'form invalid' : 'form';
  const invalidInputDescription = formErrors.description ? 'form invalid' : 'form';
  const invalidInputCost = formErrors.cost ? 'form invalid' : 'form';

  const handleInputChange = (event) => {
    handleChange(event);
    validateField(event.target.name);
    setIsFormValid(validateForm());
  };

  return (
    <div className='form-controls'>
      <form onSubmit={submitHandler}>
        <div className={invalidInputCity}>
          <label htmlFor='city'>Enter City Name</label>
          <input
            value={formValues.city}
            placeholder='Enter the name of the city you travel..'
            className='input-field'
            onBlur={handleBlur}
            onChange={handleInputChange}
            type='text'
            id='city'
            name='city'
          />
          {formErrors.city && <p>{formErrors.city}</p>}
        </div>

        <div className={invalidInputDescription}>
          <label htmlFor='description'>Enter your Experience</label>
          <textarea
            value={formValues.description}
            rows={5}
            placeholder='Enter your Experience of your Travel..'
            className='input-field textarea'
            onBlur={handleBlur}
            onChange={handleInputChange}
            type='description'
            id='description'
            name='description'
          />
          {formErrors.description && <p>{formErrors.description}</p>}
        </div>

        <div className={invalidInputCost}>
          <label htmlFor='cost'>Enter your Expense:</label>
          <input
            value={formValues.cost}
            placeholder='In ₹'
            className='input-field'
            onBlur={handleBlur}
            onChange={handleInputChange}
            type='number'
            id='cost'
            name='cost'
          />
          {formErrors.cost && <p>{formErrors.cost}</p>}
        </div>

        <button disabled={!isFormValid} className='submit-btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}


// export async function getStaticPaths() {
//   return {
//     fallback:false,
//     paths:[
//       {
//         params: {
//           id: '1'
//         },
//       },
//       {
//         params: {
//           id: '2'
//         },
//       },

//     ],
//   };
// }

// export async function getStaticProps (context) {
//   const tourId = context.params.id;
//   console.log(tourId)
//   return {
//     props: {

//     }
//   }
// }


