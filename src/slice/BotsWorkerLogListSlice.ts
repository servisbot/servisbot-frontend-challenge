import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import ILogs from "../interface/ILogs";

interface IBotsWorkerLogListState {
    data: ILogs[],
    isLoading: boolean,
    isError: boolean
}

interface SearchParam {
    botId: string;
    workerId: string
}

export const getBotsWorkerLogListApiCall = createAsyncThunk('botsList/getBotsWorkerLogsList', async (searchParam: SearchParam) => {
    try {
        console.log("search param",searchParam);
        if(searchParam.botId.toString().length!==0 && searchParam.workerId.toString().length!==0){
            const response = await axios.get(`/api/logs.json`,{
                params: {
                    botId: searchParam.botId.toString(),
                    workerId: searchParam.workerId.toString()
                }
            });
            const filteredResponse = response.data.filter((item: any) =>
                item.bot.toLowerCase().includes(searchParam.botId.toString().toLowerCase()) &&
                item.worker.toLowerCase().includes(searchParam.workerId.toString().toLowerCase())
            )
            return filteredResponse;
        }else {
            return [];
        }
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

