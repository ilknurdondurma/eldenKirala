// app.js
import React from 'react';
import DropdownComponent from './components/Input/dropdown';

function App() {
  const options = [
    'option1',
    'option2',
    'option3',
    'option4'
   ];
 return (
    <div className="App">
      <h1>Dropdown Component</h1>
      <DropdownComponent options={options}/>
    </div>
 );
}

export default App;