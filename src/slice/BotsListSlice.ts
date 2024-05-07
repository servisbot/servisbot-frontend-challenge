import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import IBots from "../interface/IBots";

interface IBotsListState {
    data: IBots[],
    isLoading: boolean,
    isError: boolean,
}

export const getBotsListApiCall = createAsyncThunk('/getBotsList', async () => {
    try{
        const response =await axios.get('./api/bots.json');
        console.log(response);
        return response.data;
    }catch (error) {
        throw new Error('Failed to fetch bots list');
    }

})

const initialState: IBotsListState = {
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

