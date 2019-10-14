export const SyntheticFnLineType = {
  RUN_CODE: 'runcode',
  FN_CALL: 'fnCall',
  NET_CALL: 'netCall',
  TIMEOUT_CALL: 'timeoutCall',
}

export const SampleFunctions = {
  noCalls: () => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
  oneCalls: () => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.FN_CALL, fn: 'twoCalls' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
  twoCalls: () => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.FN_CALL, fn: 'noCalls' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.FN_CALL, fn: 'noCalls' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
  netCall: fn => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.NET_CALL, fn },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
  timeoutCall: (delay, fn) => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.TIMEOUT_CALL, fn, delay },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
}
