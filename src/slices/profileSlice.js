import {createSlice} from "@reduxjs/toolkit"
// Initialize user state from local storage (if available) when the application starts
const persistedUser = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: persistedUser ? persistedUser : null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            // Update local storage with the new user state
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        // Add any other reducers you might need
    },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
    