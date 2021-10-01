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
  { "value": "orange", "name": "orange" }
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
