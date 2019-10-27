import { createGlobalStyle } from 'styled-components';

import common from './common';
import colors from './colors';
import vars from './vars';

export default createGlobalStyle`
  :root {
    ${colors};
    ${vars};
  }
  ${common};
`;
