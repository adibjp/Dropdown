/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// redux utils
import { createSlice } from '@reduxjs/toolkit';
import {createSelector} from 'reselect';



/* ========== ~~~~~~~~~~ DROPDOWN SLICE : REDUCER ~~~~~~~~~~ ========== */
const getInitilState = () => ({
  dropdownActive: false, // please change or add anything you need to here
  dropdownOptions: [],
  filtertext: '',
  selectedValues: [],
  tmpSelectedValues: [],
});


const emptySet =  [];
export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: getInitilState(),
  reducers: {
    setOptions: (state, action) => {
      state.dropdownOptions = action.payload;
    },
    setFilterText: (state, action) => {
      state.filtertext = action.payload || "";
    },
    toggleDropdown: (state, action) => {
      state.dropdownActive = action.payload; // please change or add anything you need to here
      if(action.payload){
        state.tmpSelectedValues = [...state.selectedValues];
      }
    },
    toggleAllOptionsSelect: (state, action) => {
      const shouldSelectAll = action.payload;
      if(shouldSelectAll){
        state.tmpSelectedValues = state?.dropdownOptions?.map(i => i.value) || emptySet;
      } else {
        state.tmpSelectedValues = emptySet;
      }
    },
    applyFilter: (state) => {
      state.selectedValues = [...state.tmpSelectedValues];
      state.dropdownActive = false;
      state.filtertext ="";
    },
    toggleSelectedItem: (state, action) => {
      const incomingValue = action.payload;
      if (state.tmpSelectedValues.indexOf(incomingValue) !== -1) {
        // value already present in selected list. Remove it
        state.tmpSelectedValues = state.tmpSelectedValues.filter(i => i !== incomingValue);
      } else {
        // value not present in selected list. Add it
        state.tmpSelectedValues = [...state.tmpSelectedValues, incomingValue]
      }
    },
  }
});


export const { toggleDropdown, setOptions, toggleSelectedItem, toggleAllOptionsSelect, setFilterText, applyFilter } = dropdownSlice.actions;
export default dropdownSlice.reducer;
export const selectors = {};

selectors.filterText = (state)=> {
  return state?.dropdown?.filtertext || ""
}
selectors.selectedItems = (state)=>state?.dropdown?.selectedValues
selectors.isDropdownOpen = (state)=> !!state?.dropdown?.dropdownActive;
selectors.isItemSelected = (state, value)=> {
  if(!state?.dropdown?.tmpSelectedValues?.length){
    return false;
  }
  return  state?.dropdown?.tmpSelectedValues?.indexOf(value) !== -1
}

selectors.isAllSelected = (state)=> {
  if(!state?.dropdown?.dropdownOptions?.length){
    return false;
  }
  return state?.dropdown?.dropdownOptions?.length ===state?.dropdown?.tmpSelectedValues?.length;
}

selectors.filteredOptions = createSelector(
  (state) => state?.dropdown?.dropdownOptions,
  (state) => state?.dropdown?.filtertext,
  (list, filteredText="") => {
    if(!filteredText){
      return list;
    }
    return list?.filter(i => i.name?.toLowerCase().indexOf(filteredText.toLowerCase()) !== -1);
  }
)
