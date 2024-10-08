import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: "result",
    initialState: {
        result: [],
    },

    reducers: {
        setResult: (state, action) => {
            state.result = [...state.result, action.payload];
        },
    }


});
export const { setLoading, setResults, setError } = resultSlice.actions;
export default resultSlice.reducer;