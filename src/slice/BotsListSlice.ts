import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import IBots from "../interface/IBots";
import BotsList from "../components/BotsList/BotsList";

interface IBotsState {
    data: IBots[],
    isLoading: boolean,
    isError: boolean,
}

export const getBotsListApiCall = createAsyncThunk('/getBotsList', async () => {
    const response =await axios.get('./api/bots.json').then((res) => res.data);
    console.log(response);
    return response;
})

const initialState: IBotsState = {
    data: [],
    isLoading: false,
    isError: false
}

const getBotsListSlice = createSlice({
    name: 'botsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBotsListApiCall.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        builder.addCase(getBotsListApiCall.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBotsListApiCall.rejected, (state, action) => {
            state.isError = true;
        })
    }
})
export default getBotsListSlice.reducer;

