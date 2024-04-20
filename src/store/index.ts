import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { pokemonApi } from './api/pokemonApiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [pokemonApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, pokemonApi.reducer);

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
