import {
  createSlice, createEntityAdapter, createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../../routes';

// import defaultChannelId from '../../constants/constants.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (authHeader) => {
    const response = await axios.get(routes.channelsPath(), { headers: authHeader });
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ newChannel, authHeader }) => {
    const response = await axios.post(routes.channelsPath(), newChannel, { headers: authHeader });
    return response.data; // => { id: '3', name: 'new channel', removable: true }
  },
);

const channelsAdapter = createEntityAdapter();
// const initialState = channelsAdapter.getInitialState();
// console.log(initialState);

const initialState = channelsAdapter
  .getInitialState({ loadingStatus: 'idle', error: null, currentChannelId: '1' });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    resetChannelError(state) {
      state.error = null;
    },
    setCurrentChannelId(state, { payload }) { // ////////////
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.addMany)
    // .addCase(sendTask.fulfilled, tasksAdapter.addOne)
    // .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
      .addCase(addChannel.pending, (state) => {
        // console.log('pen');
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, { payload }) => {
        state.loadingStatus = 'idle';
        state.error = null;
        // console.log(payload);
        state.currentChannelId = payload.id;
        toast.success('Канал создан');
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
        toast.error('Ошибка соединения');
      });
  },
});

// export default channelsSlice.reducer;
// actions вообще нет у учителя, видимо здесь они не используются
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
