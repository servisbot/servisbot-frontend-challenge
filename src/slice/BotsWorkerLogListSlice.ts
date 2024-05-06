import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import ILogs from "../interface/ILogs";

interface IWorkerLogsState {
    data: ILogs[],
    filteredData: ILogs[],
    isLoading: boolean,
    isError: boolean,
}

interface SearchData {
    botId: string,
    workerId: string
}

export const getBotsWorkerLogsListApiCall = createAsyncThunk('/getBotsWorkerLogsList', async (searchData: SearchData) => {
    const response =await axios.get('./api/logs.json', {
        params: {
            botId: searchData.botId,
            workerId: searchData.workerId
        }
    }).then(async (res) => await res.data);
    //return response;
    console.log(response);
    console.log(response.filter((item: ILogs) =>
        item.bot.toLowerCase().includes(searchData.botId.toLowerCase()) &&
        item.worker.toLowerCase().includes(searchData.workerId.toLowerCase())
    ));
    //return response;
    return response.filter((item: ILogs) =>
        item.bot.toLowerCase().includes(searchData.botId.toLowerCase()) &&
        item.worker.toLowerCase().includes(searchData.workerId.toLowerCase())
    );
})

const initialState: IWorkerLogsState = {
    data: [],
    filteredData: [],
    isLoading: false,
    isError: false
}

const getBotsWorkerLogListSlice = createSlice({
    name: 'botsWorkerLogList',
    initialState,
    reducers: {
        getBotsWorkerLogsList: (state, action) => {
            console.log(action.payload);
            const {botId, workerId} = action.payload;
            //console.log(botId[0].toLowerCase());
            // state.data = state.data.filter((item: ILogs) =>
            //     item.bot.toLowerCase().includes(botId[0].toLowerCase()) &&
            //     item.worker.toLowerCase().includes(workerId[0].toLowerCase())
            // )}
            //console.log(...state.data);
        return {
            ...state,
            filteredData: [...state.data].filter((item: ILogs) =>
                item.bot.toLowerCase().includes(botId[0].toLowerCase()) &&
                item.worker.toLowerCase().includes(workerId[0].toLowerCase())
            )
        };}
    },
    extraReducers: (builder) => {
        builder.addCase(getBotsWorkerLogsListApiCall.fulfilled, (state, action) => {
            console.log(action);
            state.data = action.payload;
        })
        builder.addCase(getBotsWorkerLogsListApiCall.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBotsWorkerLogsListApiCall.rejected, (state, action) => {
            state.isError = true;
        })
    }
})
export const { getBotsWorkerLogsList } =
    getBotsWorkerLogListSlice.actions;
export default getBotsWorkerLogListSlice.reducer;

