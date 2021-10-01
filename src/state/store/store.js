/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import { configureStore } from '@reduxjs/toolkit'
import { enableBatching } from 'redux-batched-actions';
// slices of state
import dropdownSlice, {selectors as dropdownSelectors} from '../slices/dropdown';


// /* ========== ~~~~~~~~~~ STORE (application state) ~~~~~~~~~~ ========== */
// STORE
// configure our store of application state
export default configureStore({
    reducer: {
        dropdown: dropdownSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [enableBatching]
});

