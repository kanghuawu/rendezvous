import React from 'react';
import { Link } from 'react-router-dom';
import SearchElder from './search-elder';
import AddElder from './add-elder';

export default () => {
  return (
    <div>
      <Link to="/profile" >Return to Profile</Link>
      <SearchElder />
      <AddElder />
    </div>
  );
}