import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import ILogs from "../interface/ILogs";

interface IBotsLogListState {
    data: ILogs[],
    isLoading: boolean,
    isError: boolean
}

export const getBotsLogListApiCall = createAsyncThunk('botsList/getBotsLogsList', async (botId: string) => {
    try {
        const response = await axios.get(`/api/logs.json`,{
            params: {
                botId: botId.toString()
            }
        });
        return response.data.filter((item: any) =>
            item.bot.toLowerCase().includes(botId.toLowerCase())
        );

    } catch (error) {
        throw new Error('Failed to fetch logs list for bot');
    }
});

const initialState:IBotsLogListState = {
    data: [],
    isLoading: false,
    isError: false,
};

const getBotsLogListSlice = createSlice({
    name: 'botsLogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBotsLogListApiCall.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBotsLogListApiCall.fulfilled, (state, action) => {
                console.log("inside fulfilled");
                state.isLoading = false;
                state.isError = false;
                console.log(action.payload);
                state.data = action.payload
            })
            .addCase(getBotsLogListApiCall.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})
export default getBotsLogListSlice.reducer;

