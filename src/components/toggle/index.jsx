// ToggleSwitch.js

import React, { useState } from 'react';

const ToggleSwitch = ({label}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer p-3">
      <div className="relative">
        <input
          type="checkbox"
          id="toggleSwitch"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className={`block  w-14 h-8 rounded-full ${isChecked ?'bg-primary':'bg-text_primary'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${isChecked ? 'translate-x-6 ' : ''}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{label}</div>
    </label>
  );
};

export default ToggleSwitch;
