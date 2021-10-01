/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React from 'react';
// material
import DropDown from '../material/dropdown/dropdown';
// styles
import './app.css';



/* ========== ~~~~~~~~~~ APP ~~~~~~~~~~ ========== */
const options = [
  { "value": "www.abc.com", "name": "www.abc.com" },
  { "value": "www.abc2.com", "name": "www.abc2.com" },
  { "value": "www.ab2c24.com", "name": "www.ab2c24.com" },
  { "value": "www.mango.com", "name": "www.mango.com" },
  { "value": "www.orange.com", "name": "www.orange.com" },
  { "value": "orange", "name": "orange" },
  { "value": "orange1", "name": "orange1" },
  { "value": "orange2", "name": "orange2" },
  { "value": "orange3", "name": "orange3" },
  { "value": "green", "name": "green" },
  { "value": "yellow", "name": "yellow" },
]
const App = (props) => {
  return (
    <div className={`app`}>
      <DropDown
        options={options}
        groupName="Sites"
      />
    </div>
  )
};



/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default App;
