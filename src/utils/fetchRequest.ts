import { API_REQUESTS_TIMEOUT } from 'utils/constants';

export interface FetchRequestOptions extends RequestInit {
  timeout?: number;
}

const fetchRequest = async (url: string, options: FetchRequestOptions = {}) => {
  let fetchOptions = { timeout: API_REQUESTS_TIMEOUT, ...options };

  if (options.timeout) {
    const controller = new AbortController();
    delete fetchOptions.timeout;
    fetchOptions = { ...fetchOptions, signal: controller.signal };
    setTimeout(() => controller.abort(), options.timeout);
  }

  const response = await fetch(url, fetchOptions);

  const body = await response.json();

  if (!response.ok) {
    const error = Error(response.statusText);
    // error.data = body;
    throw error;
  }

  return body;
};

export default fetchRequest;
