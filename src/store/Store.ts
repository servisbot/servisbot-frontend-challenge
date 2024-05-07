import {configureStore} from "@reduxjs/toolkit";
import botsListReducer from "../slice/BotsListSlice"
import botsWorkerListReducer from "../slice/BotsWorkersListSlice";
import botsLogListReducer from "../slice/BotsLogListSlice";
import botsWorkerLogListReducer from "../slice/BotsWorkerLogListSlice";

const store = configureStore({
    reducer: {
        botsList : botsListReducer,
        botsWorkers: botsWorkerListReducer,
        botsLogs: botsLogListReducer,
        botsWorkerLogs: botsWorkerLogListReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;