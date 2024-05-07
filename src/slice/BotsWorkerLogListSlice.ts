import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import ILogs from "../interface/ILogs";

interface IBotsWorkerLogListState {
    data: ILogs[],
    isLoading: boolean,
    isError: boolean
}

export const getBotsWorkerLogListApiCall = createAsyncThunk('botsList/getBotsWorkerLogsList', async ({botId,workerId}: any) => {
    try {
        const response = await axios.get(`/api/logs.json`,{
            params: {
                botId: botId.toString(),
                workerId: workerId.toString()
            }
        });
        const filteredResponse = response.data.filter((item: any) =>
            item.bot.toLowerCase().includes(botId.toString().toLowerCase()) &&
            item.worker.toLowerCase().includes(workerId.toString().toLowerCase())
        )
        return filteredResponse;

    } catch (error) {
        throw new Error('Failed to fetch logs list for a worker for bot');
    }
});

const initialState:IBotsWorkerLogListState = {
    data: [],
    isLoading: false,
    isError: false,
};
const getBotsWorkerLogListSlice = createSlice({
    name: 'botsWorkerLogs',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBotsWorkerLogListApiCall.pending, (state, action) => {
                console.log("inside pending")
                console.log(action.payload);
                state.isLoading = true;
            })
            .addCase(getBotsWorkerLogListApiCall.fulfilled, (state, action) => {
                console.log("inside fulfilled");
                state.isLoading = false;
                state.isError = false;
                console.log(action.payload);
                state.data = action.payload
            })
            .addCase(getBotsWorkerLogListApiCall.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
})
export default getBotsWorkerLogListSlice.reducer;

