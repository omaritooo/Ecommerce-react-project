import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { product } from '../types';

type FavouriteType = Omit<product, "quantity">

interface FavouriteState {
  favouritesItems: FavouriteType[];
}
interface IPayload {
  item: FavouriteType;
  type: string;
}

const initialState: FavouriteState = {
  favouritesItems: [],
};

export const favouriteSlice = createSlice({
  name: 'favouriteSlice',
  initialState,
  reducers: {
    addToFavourite: (state: FavouriteState, action: PayloadAction<product>) => {
      const index: number = state.favouritesItems.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
       return ;
      } else {
        state.favouritesItems.push({...action.payload, liked: true});
      }
    },
    removeFromFavourites: (state, action: PayloadAction<product>) => {
      const index = state.favouritesItems.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        state.favouritesItems.splice(index, 1);
        console.log(state.favouritesItems)
      }
    },
   
  }
});

export const selectFavourite = createSelector(
  (state: RootState) => state.favourite.favouritesItems,
  (favouritesItems) => {
    return favouritesItems;
  }
);

export const {
  removeFromFavourites,
  addToFavourite,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
