import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { IReceipt, product } from '../types';

interface CartState {
  cartItems: product[];
  totalCost: number;
  activeTab: number;
  invoice: IReceipt;
}
interface IPayload {
  item: product;
  type: string;
}

const initialState: CartState = {
  cartItems: [],
  totalCost: 0,
  activeTab: 1,
  invoice: {} as IReceipt
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<product>) => {
      const index: number = state.cartItems.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        state.cartItems = [
          ...state.cartItems.slice(0, index),
          {
            ...state.cartItems[index],
            quantity: (state.cartItems[index].quantity ?? 0) + (action.payload.quantity ?? 0)
          },
          ...state.cartItems.slice(index + 1)
        ];
      } else {
        state.cartItems.push(action.payload);
      }
      state.totalCost += action.payload.price;
    },
    emptyCart: (state: CartState) => {
      state.cartItems = [];
      state.totalCost = 0;
      state.cartItems;
    },
    removeFromCart: (state, action: PayloadAction<product>) => {
      const index = state.cartItems.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
      state.totalCost -= action.payload.price * action.payload.quantity;
    },
    createInvoice: (state, action: PayloadAction<IReceipt>) => {
      state.invoice = {
        ...action.payload,
        totalCost: state.totalCost
      };
      state.cartItems = [];
      state.totalCost = 0;
    },
    updateQuantity: (state: CartState, action: PayloadAction<IPayload>): void => {
      const index = state.cartItems.findIndex((obj) => obj.id === action.payload.item.id);
      if (index != -1) {
        if (action.payload.type.toLowerCase() == 'inc') {
          state.cartItems = [
            ...state.cartItems.slice(0, index),
            { ...state.cartItems[index], quantity: (state.cartItems[index].quantity ?? 0) + 1 },
            ...state.cartItems.slice(index + 1)
          ];
          state.cartItems[index].quantity;
          state.totalCost += state.cartItems[index].price;
        } else {
          state.cartItems = [
            ...state.cartItems.slice(0, index),
            { ...state.cartItems[index], quantity: (state.cartItems[index].quantity ?? 0) - 1 },
            ...state.cartItems.slice(index + 1)
          ];
          state.totalCost -= state.cartItems[index].price;
        }
      }
    },
    activeTabModifier(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    }
  }
});

export const selectCart = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) => {
    return cartItems;
  }
);
export const selectTC = (state: RootState) => state.cart.totalCost as number;
export const selectActiveTab = (state: RootState) => state.cart.activeTab as number;
export const selectInvoice = (state: RootState) => state.cart.invoice as IReceipt;
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  activeTabModifier,
  emptyCart,
  createInvoice
} = cartSlice.actions;
export default cartSlice.reducer;
