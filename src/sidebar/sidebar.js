// Sidebar.js
import './sidebar.css';
import React, { useState } from 'react';

const Sidebar = ({ handlePriceFilter }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const priceRanges = [
    { label: '0 - 100', value: '0-100' },
    { label: '100 - 500', value: '100-500' },
    { label: '500 - 2000', value: '500-2000' },

  ];

  const handleFilterClick = () => {
    if (selectedOption) {
      const [min, max] = selectedOption.split('-').map(Number);
      handlePriceFilter({ min, max });
    }
  };

  return (
    <div className="sidebar-box">
      <div className="sidebar-container">
        <div className="row">
          <div className="col-12 my-2 text-start">
            <h5>PRICE FILTER</h5>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value=""> Select Price </option>
              {priceRanges.map((range, index) => (
                <option key={index} value={range.value}>{range.label}</option>
              ))}
            </select>
            <button onClick={handleFilterClick}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
