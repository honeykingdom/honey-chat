import { SerializedError } from '@reduxjs/toolkit';

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export type FetchResult<T> = {
  status: FetchStatus;
  error: SerializedError;
  items: T;
};
