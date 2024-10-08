import { createSlice } from "@reduxjs/toolkit";

const marksSlice = createSlice({
    name: "marks",
    initialState: {
        marks: null
    },
    reducers: {
        // actions
        setMarks: (state, action) => {
            state.marks = action.payload;
        }
    }
});
export const { setMarks } = marksSlice.actions;
export default marksSlice.reducer;