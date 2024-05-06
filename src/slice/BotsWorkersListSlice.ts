import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import IWorkers from "../interface/IWorkers";

interface IWorkersState {
    data: IWorkers[],
    isLoading: boolean,
    isError: boolean,
}

export const getBotsWorkersListApiCall = createAsyncThunk('/getBotsWorkersList', async (botName: string) => {
    const response =await axios.get('./api/workers.json', {
        params: {
            botName: botName
        }
    }).then((res) => res.data);
    console.log(response);
    const filteredResponse = () => {
        return response.filter((item: IWorkers) =>
            item.bot.toLowerCase().includes(botName.toLowerCase())
        ) as IWorkers;
    };
    console.log(botName);
    console.log(response.filter((item: IWorkers) =>
        item.bot.toLowerCase().includes(botName.toLowerCase())
    ));
    return response.filter((item: IWorkers) =>
        item.bot.toLowerCase().includes(botName.toLowerCase())
    );
})

const initialState: IWorkersState = {
    data: [],
    isLoading: false,
    isError: false
}

const getBotsListSlice = createSlice({
    name: 'botsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBotsWorkersListApiCall.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        builder.addCase(getBotsWorkersListApiCall.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBotsWorkersListApiCall.rejected, (state, action) => {
            state.isError = true;
        })
    }
})
export default getBotsListSlice.reducer;

