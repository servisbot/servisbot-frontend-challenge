import {configureStore} from "@reduxjs/toolkit";
import botsListSlice from "../slice/BotsListSlice"

const store = configureStore({
    reducer: {
        botsList : botsListSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;