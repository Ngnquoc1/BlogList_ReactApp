import { useState } from "react";

/**
 * Custom hook for form input with validation
 * @param {string} type - Input type (text, password, email, etc.)
 * @param {string} initialValue - Initial value for the input
 * @returns {object} - { value, type, onChange, reset, ...inputProps }
 */
export const useField = (type, initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  // Return object với inputProps để spread vào input
  return {
    type,
    value,
    onChange,
    reset,
    inputProps: {
      type,
      value,
      onChange,
    },
  };
};

/**
 * Custom hook for managing form state
 * @param {object} initialValues - Initial form values
 * @returns {object} - Form management functions
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Tạo fields object với inputProps cho mỗi field
  const fields = Object.keys(initialValues).reduce((acc, key) => {
    acc[key] = {
      name: key,
      value: values[key],
      onChange: handleChange,
      ...values[key],
    };
    return acc;
  }, {});

  return {
    values,
    fields,
    handleChange,
    resetForm,
    setFieldValue,
    setValues,
  };
};
