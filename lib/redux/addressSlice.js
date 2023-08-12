import { createSlice } from '@reduxjs/toolkit';

// 初始状态
const initialState = {
  address: null, // 初始化为 null，表示未登录
};

// 创建 slice
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload; // 设置登录后的钱包地址
    },
  },
});

// 导出 action
export const { setAddress } = addressSlice.actions;

// 导出 reducer
export default addressSlice.reducer;
