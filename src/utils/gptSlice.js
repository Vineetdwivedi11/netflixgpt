import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showgGptSearch : false
    },
    reducers:{
        toogleGptSearchView : (state, action) => {
            state.showgGptSearch = !state.showgGptSearch;
        }
    }
});

export const {toogleGptSearchView} = gptSlice.actions;

export default gptSlice.reducer;