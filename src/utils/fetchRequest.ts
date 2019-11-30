import { API_REQUESTS_TIMEOUT } from 'utils/constants';

export interface FetchRequestOptions extends RequestInit {
  timeout?: number;
}

const fetchRequest = async (
  url: string,
  { timeout, ...restOptions }: FetchRequestOptions = {},
) => {
  let options = { ...restOptions };
  const fetchTimeout = timeout || API_REQUESTS_TIMEOUT;

  if (fetchTimeout) {
    const controller = new AbortController();

    options = { ...options, signal: controller.signal };

    setTimeout(() => controller.abort(), fetchTimeout);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const body = await response.json();

  return body;
};

export default fetchRequest;
