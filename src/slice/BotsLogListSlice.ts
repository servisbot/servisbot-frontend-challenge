import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import ILogs from "../interface/ILogs";

interface ILogsState {
    data: ILogs[],
    isLoading: boolean,
    isError: boolean,
}

export const getBotsLogsListApiCall = createAsyncThunk('/getBotsWorkersList', async (botId: string) => {
    const response =await axios.get('./api/logs.json', {
        params: {
            botId: botId
        }
    }).then((res) => res.data);
    return response.filter((item: ILogs) =>
        item.bot.toLowerCase().includes(botId.toLowerCase())
    );
})

const initialState: ILogsState = {
    data: [],
    isLoading: false,
    isError: false
}

const getBotsLogListSlice = createSlice({
    name: 'botsLogList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBotsLogsListApiCall.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        builder.addCase(getBotsLogsListApiCall.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBotsLogsListApiCall.rejected, (state, action) => {
            state.isError = true;
        })
    }
})
export default getBotsLogListSlice.reducer;

