import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = { type: null, show: false, channelName: '' };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      state.type = payload.type;
      state.show = payload.show;
      state.channelName = payload.channelName;
      // console.log(state.type);
    },
    hideModal(state) {
    // dispatch(channelsActions.resetChannelError());
      state.show = false;
    },
    resetModal(state) {
      state.type = null;
    },
  },
});

export const { actions } = modalSlice;
// export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default modalSlice.reducer;
