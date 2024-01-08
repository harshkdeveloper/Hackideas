// useFormValidation.js
import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (title, description,tags,error) => {
    let newErrors = {};

    if (!title || title.length < 8) {
      newErrors.title = 'Title should be more than 8 characters';
    }

    if (!description || description.length < 40) {
      newErrors.description = 'Description should be more than 40 characters';
    }
    if (!tags || tags.length === 0) {
        newErrors.tags = 'At least one tag is required';
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (field) => {
    setErrors({ ...errors, [field]: '' });
  };
  return { validate, errors ,handleChange};
};

export default useFormValidation;
