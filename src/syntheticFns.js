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
  netCall: () => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.NET_CALL, fn: 'twoCalls' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.NET_CALL, fn: 'noCalls' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
  timeoutCall: () => ({
    lines: [
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.TIMEOUT_CALL, fn: 'oneCall' },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
      { type: SyntheticFnLineType.RUN_CODE },
    ],
  }),
}
