import {configureStore} from "@reduxjs/toolkit";
import botsListSlice from "../slice/BotsListSlice"
import botsWorkersListSlice from "../slice/BotsWorkersListSlice";

const store = configureStore({
    reducer: {
        botsList : botsListSlice,
        botsWorkersList: botsWorkersListSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;