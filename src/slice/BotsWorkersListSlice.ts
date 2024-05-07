import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import IWorkers from "../interface/IWorkers";

interface IBotsWorkersListState {
    data: IWorkers [],
    isLoading: boolean,
    isError: boolean,
}
export const getBotsWorkersListApiCall = createAsyncThunk('botsList/getBotsWorkersList', async (botName: string) => {
    try {
        const response = await axios.get(`/api/workers.json`,{
            params: {
                botName: botName
            }
        });
        return response.data.filter((item: any) =>
            item.bot.toLowerCase().includes(botName.toLowerCase())
        );

    } catch (error) {
        throw new Error('Failed to fetch workers list');
    }
});

const initialState:IBotsWorkersListState = {
    data: [],
    isLoading: false,
    isError: false,
};

const getBotsWorkerListSlice = createSlice({
    name: 'botsWorkers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBotsWorkersListApiCall.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBotsWorkersListApiCall.fulfilled, (state, action) => {
                console.log("inside fulfilled");
                state.isLoading = false;
                state.isError = false;
                console.log(action.payload);
                state.data = action.payload
            })
            .addCase(getBotsWorkersListApiCall.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
});
export default getBotsWorkerListSlice.reducer;

