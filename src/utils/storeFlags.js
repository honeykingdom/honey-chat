const storeFlags = {
  default: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    error: null,
  },
  request: {
    isLoading: true,
    isLoaded: false,
    isError: false,
    error: null,
  },
  success: {
    isLoading: false,
    isLoaded: true,
    isError: false,
    error: null,
  },
  failure: {
    isLoading: false,
    isLoaded: false,
    isError: true,
  },
};

export default storeFlags;
