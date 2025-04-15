import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RoutineState = {
  isLogin: boolean;
  token: string;
  userinfo: Partial<{
    username: string;
    avatar: string;
    phone: string;
    gender: string;
    birthday: string;
  }>;
  searchHistory: string[];
};

const initialState: RoutineState = {
  isLogin: false,
  token: '',
  userinfo: {},
  searchHistory: []
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<RoutineState['userinfo']>) => {
      state.userinfo = action.payload;
    },
    setSearchHistory: (state, action: PayloadAction<string[]>) => {
      state.searchHistory = action.payload;
    },
    setLogout: state => {
      state.token = '';
      state.isLogin = false;
      state.userinfo = {};
    }
  }
});

export const { setToken, setUserInfo, setLogout } = routineSlice.actions;

export default routineSlice.reducer;
