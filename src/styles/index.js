import { createGlobalStyle } from 'styled-components';

import common from 'styles/common';
import colors from 'styles/colors';
import vars from 'styles/vars';

export default createGlobalStyle`
  :root {
    ${colors};
    ${vars};
  }
  ${common};
`;
