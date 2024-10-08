import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: "result",
    initialState: {
        result: [],
    },

    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
        },
    }


});
export const { setResult } = resultSlice.actions;
export default resultSlice.reducer;