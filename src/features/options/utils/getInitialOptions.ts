import merge from 'deepmerge';
import { LS } from 'utils/constants';
import { lsRead } from 'utils/ls';
import { OPTIONS_INITIAL_STATE } from '../optionsConstants';
import type { Options } from '../optionsTypes';

const getInitialOptions = (): Options => {
  if (typeof window === 'undefined') return OPTIONS_INITIAL_STATE;
  const lsOptions = lsRead(LS.Options) as DeepPartial<Options>;
  if (!lsOptions) return OPTIONS_INITIAL_STATE;
  return merge(OPTIONS_INITIAL_STATE, lsOptions) as any;
};

export default getInitialOptions;
