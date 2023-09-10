import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favouriteSlice from './favouriteSlice';

const persistConfig = {
  key: 'root',
  storage
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice);
const persistedFavReducer = persistReducer(persistConfig, favouriteSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    favourite: persistedFavReducer
  }
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
