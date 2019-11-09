import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `#${title} - ${process.env.REACT_APP_NAME} `
      : process.env.REACT_APP_NAME;
  }, [title]);
};

export default useDocumentTitle;
