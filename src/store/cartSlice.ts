import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { IReceipt, product } from '../types';

interface CartState {
  cart: product[];
  totalCost: number;
  activeTab: number;
  invoice: IReceipt;
}
interface IPayload {
  item: product;
  type: string;
}

const initialState: CartState = {
  cart: [],
  totalCost: 0,
  activeTab: 1,
  invoice: {} as IReceipt
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<product>) => {
      const index: number = state.cart.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        state.cart = [
          ...state.cart.slice(0, index),
          {
            ...state.cart[index],
            quantity: (state.cart[index].quantity ?? 0) + (action.payload.quantity ?? 0)
          },
          ...state.cart.slice(index + 1)
        ];
      } else {
        state.cart.push(action.payload);
      }
      state.totalCost += action.payload.price;
    },
    emptyCart: (state: CartState) => {
      state.cart = [];
      state.totalCost = 0;
      state.cart;
    },
    removeFromCart: (state, action: PayloadAction<product>) => {
      const index = state.cart.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      state.totalCost -= action.payload.price;
    },
    createInvoice: (state, action: PayloadAction<IReceipt>) => {
      state.invoice = {
        ...action.payload,
        totalCost: state.totalCost
      };
      state.cart = [];
      state.totalCost = 0;
    },
    updateQuantity: (state: CartState, action: PayloadAction<IPayload>): void => {
      const index = state.cart.findIndex((obj) => obj.id === action.payload.item.id);
      if (index != -1) {
        if (action.payload.type.toLowerCase() == 'inc') {
          state.cart = [
            ...state.cart.slice(0, index),
            { ...state.cart[index], quantity: (state.cart[index].quantity ?? 0) + 1 },
            ...state.cart.slice(index + 1)
          ];
          state.cart[index].quantity;
          state.totalCost += state.cart[index].price;
        } else {
          state.cart = [
            ...state.cart.slice(0, index),
            { ...state.cart[index], quantity: (state.cart[index].quantity ?? 0) - 1 },
            ...state.cart.slice(index + 1)
          ];
          state.totalCost -= state.cart[index].price;
        }
      }
    },
    activeTabModifier(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    addToInvoice: (state: CartState, action: PayloadAction<IReceipt>): void => {
      state.invoice = [...state.invoice, action.payload];
    }
  }
});

export const selectCart = (state: CartState) => state.cart.cart as product[];
export const selectTC = (state: CartState) => state.cart.totalCost as number;
export const selectActiveTab = (state: CartState) => state.cart.activeTab as number;
export const selectInvoice = (state: CartState) => state.cart.invoice as IReceipt;
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  activeTabModifier,
  emptyCart,
  createInvoice
} = cartSlice.actions;
export default cartSlice.reducer;
