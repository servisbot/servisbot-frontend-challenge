import {configureStore} from "@reduxjs/toolkit";
import botsListSlice from "../slice/BotsListSlice"
import botsWorkersListSlice from "../slice/BotsWorkersListSlice";
import botsLogListSlice from "../slice/BotsLogListSlice";

const store = configureStore({
    reducer: {
        botsList : botsListSlice,
        botsWorkersList: botsWorkersListSlice,
        botsLogList: botsLogListSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;