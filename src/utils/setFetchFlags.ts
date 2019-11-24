import { FetchFlags } from 'utils/constants';

function setFetchFlags(obj: FetchFlags, type: 'request'): void;
function setFetchFlags(obj: FetchFlags, type: 'success'): void;
function setFetchFlags(obj: FetchFlags, type: 'failure', error: string): void;
function setFetchFlags(
  obj: FetchFlags,
  type: 'request' | 'success' | 'failure',
  error: string | null = null,
) {
  obj.isLoading = type === 'request';
  obj.isLoaded = type === 'success' || type === 'failure';
  obj.isError = type === 'failure';
  obj.error = type === 'failure' ? error : null;
}

export default setFetchFlags;
