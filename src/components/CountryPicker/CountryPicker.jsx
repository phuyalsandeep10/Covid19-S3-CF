import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]); // fallback to prevent crash
      }
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Nepal</option>
        {Array.isArray(countries) &&
          countries.map((country, i) => (
            <option key={i} value={country}>{country}</option>
          ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;
