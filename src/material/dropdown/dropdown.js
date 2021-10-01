/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React, { useCallback, useEffect, useRef } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { applyFilter, selectors, setFilterText, setOptions, toggleAllOptionsSelect, toggleDropdown, toggleSelectedItem } from '../../state/slices/dropdown';
import './dropdown.css';


const DropdownRowValue = ({ value = '' }) => {
  const filteredText = useSelector(state => selectors.filterText(state) || "");
  const parts = value.split(new RegExp(`(${filteredText})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        <span  key={i} className={`item-label`} style={part.toLowerCase() === filteredText.toLowerCase() ? { fontWeight: 'bold' } : {}}>
          {part}
        </span>)
      }
    </>
  )
}

const DropdownRow = ({ name, value }) => {
  const dispatch = useDispatch();
  const handleItemToggle = () => dispatch(toggleSelectedItem(value));
  const isItemSelected = useSelector(state => selectors.isItemSelected(state, value))
  console.log("isItemSelected", isItemSelected)
  return (
    <div key={value} onClick={handleItemToggle} className={`item ${isItemSelected ? `item-selected` : ``}`}>
      <div className={`item-checkbox`}>
        {isItemSelected ? (
          <i className="fas fa-check"></i>
        ) : null}
      </div>
      <DropdownRowValue
      value={value}
      />
    </div>
  )
}

/* ========== ~~~~~~~~~~ DROPDOWN ~~~~~~~~~~ ========== */
const DropDown = ({ options, groupName }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const dropdownActive = useSelector(state => state.dropdown.dropdownActive);
  const filteredOptions = useSelector(state => selectors.filteredOptions(state));
  const isDropdownOpen = useSelector(state => selectors.isDropdownOpen(state));
  const isAllSelected = useSelector(state => selectors.isAllSelected(state));
  const selectedItems = useSelector(state => selectors.selectedItems(state));
  const filterText = useSelector(state => selectors.filterText(state));

  const handleIndicatorClick = (e) => dispatch(toggleDropdown(!dropdownActive));
  const handleSelectAllClick = useCallback(() => dispatch(toggleAllOptionsSelect(true)), [dispatch]);
  const handleSelectNoneClick = useCallback(() => dispatch(toggleAllOptionsSelect(false)), [dispatch]);
  const handleFilterTextChange = (event) => {
    dispatch(setFilterText(event.target.value))
  }
  const handleFilterClick = () => {
    dispatch(applyFilter());
  }
  const renderQuickSelectOption = useCallback(() => {
    if (!options?.length) {
      return null;
    }
    if (isAllSelected) {
      return (
        <div className={`toggle-selection-all`} onClick={handleSelectNoneClick}>
          <i className="fas fa-times-circle" />
          <span>Select none</span>
        </div>
      )
    }
    return (
      <div className={`toggle-selection-all`} onClick={handleSelectAllClick}>
        <i className="fas fa-plus-square" />
        <span>Select All</span>
      </div>
    )
  }, [handleSelectAllClick, handleSelectNoneClick, isAllSelected, options?.length])

  const label = selectedItems?.length ? `${selectedItems.length} ${groupName}` : `All ${groupName}`;

  useEffect(() => {
    //reset options when it changes
    dispatch(setOptions(options));
  }, [dispatch, options])

  return (
    <div className={`dropdown-wrapper`}>
      <div className={`dropdown ${isDropdownOpen ? 'dropdown-active': ''}`} onClick={handleIndicatorClick}>
        <div className={`dropdown-label-wrapper`}>
          <i className="fas fa-link" />
          <div>
            <span className={`label`}>{groupName}</span>
            <span className={`value ${selectedItems?.length ? `label-selected` : ''}`} >{label}</span>
          </div>
        </div>
        <i className="fas fa-caret-down"></i>
      </div>
      {isDropdownOpen ? (
        <div className={`search-options-container`}>
          <div className={`options-wrapper`}>
            <div className={`search-wrapper`}>
              <i className="fas fa-search" />
              <input
                type="text"
                autoFocus
                placeholder={`Search ${groupName}`}
                ref={inputRef}
                defaultValue={filterText}
                onChange={handleFilterTextChange} />
            </div>
            {renderQuickSelectOption()}
            <div className={`scroll-container`}>
              <div className={`options`}>
                {filteredOptions?.map(item => (
                  <DropdownRow {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className={`footer-container`}>
            <button onClick={handleFilterClick}>Filter</button>
          </div>
        </div>
      ) : null}
    </div>
  )
};



/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default DropDown;
