import { useState } from 'react';

const useForm = (initialValues, validationRules) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  const validateField = (fieldName) => {
    const rules = validationRules[fieldName];
    const value = formValues[fieldName];
    let error = '';
  
    for (const rule of rules) {
      if (rule.required && !value) {
        error = 'This field is required';
        break;
      }
  
      if (rule.minLength && value.trim().length < rule.minLength) {
        error = `Minimum length is ${rule.minLength}`;
        break;
      }
  
      if (rule.maxLength && value.trim().length > rule.maxLength) {
        error = `Maximum length is ${rule.maxLength}`;
        break;
      }
  
      if (rule.pattern && !rule.pattern.test(value)) {
        error = rule.error || 'Invalid value';
        break;
      }
    }
  
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: error,
    }));
  
    return error;
  };
  

  const validateForm = () => {
    let isFormValid = true;

    for (const fieldName in validationRules) {
      const fieldError = validateField(fieldName);
      if (fieldError) {
        isFormValid = false;
      }
    }

    return isFormValid;
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFormErrors({});
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
  };
};

export default useForm;
