import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../../routes';

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (authData, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), authData);
      return response.data;
    } catch (error) {
      if (error.response?.status) {
        return rejectWithValue(error.response.status);
      }
      return rejectWithValue(520); // unknown error
    }
  },
);

const getInitialState = () => {
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  if (userToken && userToken.token && userToken.username) {
    return {
      // loggedIn: true,
      username: userToken.username,
      // token: userToken.token,
      authHeader: { Authorization: `Bearer ${userToken.token}` },
      error: null,
    };
  }
  return {
    // loggedIn: false,
    username: null,
    // token: null,
    authHeader: {},
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // setUser(state, { payload }) {
    //   // const { entities, ids } = payload;
    //   // console.log(payload.username);
    //   state.loggedIn = true;
    //   state.username = payload.username;
    //   state.token = payload.username.token;
    //   console.log(state.username);
    // },
    logOut(state) {
      // console.log('tttttttttttt');
      state.username = null;
      // state.token = null;
      state.loadingStatus = 'idle';
      state.error = null;
      // state.loggedIn = false;
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload: { token, username } }) => {
        // console.log('ful');
        state.loadingStatus = 'idle';
        localStorage.setItem('userToken', JSON.stringify({ token, username }));
        state.error = null;
        // state.loggedIn = true;
        state.username = username;
        // state.token = token;
        state.authHeader = { Authorization: `Bearer ${token}` };
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.error = payload;
        // state.loggedIn = false;
        state.username = null;
        // state.token = null;
        state.authHeader = {};
        localStorage.removeItem('userToken');
        if (payload !== 401) {
          toast.error('Ошибка соединения');
        }

        // if (action.payload === 401) {
        //   state.authFailed = true;
        // }

        // console.log(action.payload.isAxiosError);
        // state.error = action.error;
        // console.log(state.error);
        // console.log(action.error.isAxiosError);
        // console.log(state.error.response.status);
      });

    // учитель обработал только фулфилды и использовал соращенные записи EntityAdapter
    // name: 'tasks',
    // initialState,
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(fetchTasks.fulfilled, tasksAdapter.addMany)
    //     .addCase(sendTask.fulfilled, tasksAdapter.addOne)
    //     .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
    // },
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
