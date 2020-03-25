import { SerializedError } from '@reduxjs/toolkit';

export type FetchResult<T> = {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: SerializedError;
  items: T;
};
