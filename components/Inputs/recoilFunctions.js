import produce from 'immer';

export const addKeyToInputState = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    for (let u = 0; u < draft[i].input.length; u++) {
                        if (draft[i].input[u].active) {
                            draft[i].input[u].value = key;
                            if (u < draft[i].input.length - 1) {
                                draft[i].input[u].active = false;
                                draft[i].input[u + 1].active = true;
                            }
                            return;
                        }
                    }
                    return;
                }
            }
            return;
        })
    );
};

export const makeInputActive = function (index, setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    for (let u = 0; u < draft[i].input.length; u++) {
                        draft[i].input[u].active = false;
                    }
                    draft[i].input[index].active = true;
                    return;
                }
            }
            return;
        })
    );
};

export const makeNextLineActive = function (setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].active) {
                    for (let u = 0; u < state[i].input.length; u++) {
                        draft[i].input[u].active = false;
                    }
                    if (i < state.length - 2) {
                        draft[i].active = false;
                        draft[i + 1].active = true;
                        draft[i + 1].input[0].active = true;
                        return;
                    }
                }
            }
        })
    );
};

export const backspace = function (setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    for (let u = 0; u < draft[i].input.length; u++) {
                        if (draft[i].input[u].active) {
                            if (draft[i].input[u].value) {
                                draft[i].input[u].value = '';
                                return;
                            } else if (u > 0) {
                                draft[i].input[u].active = false;
                                draft[i].input[u - 1].active = true;
                                draft[i].input[u - 1].value = '';
                            }
                        }
                    }
                }
            }
        })
    );
};

export const makeFieldRightPlace = function (idx, setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    draft[i].input[idx].rightplace = true;
                    if (state[6].evalIdx < 5) {
                        draft[6].evalIdx = state[6].evalIdx + 1;
                    } else if (state[6].evalIdx == 5) {
                        draft[6].evalIdx = 0;
                    }
                    return;
                }
            }
        })
    );
};

export const makeFieldWrongPlace = function (idx, setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    draft[i].input[idx].wrongplace = true;
                    if (state[6].evalIdx < 5) {
                        draft[6].evalIdx = state[6].evalIdx + 1;
                    } else if (state[6].evalIdx == 5) {
                        draft[6].evalIdx = 0;
                    }
                    return;
                }
            }
        })
    );
};

export const makeFieldWrongLetter = function (idx, setState, state) {
    setState(
        produce(state, (draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    draft[i].input[idx].wrongletter = true;
                    if (state[6].evalIdx < 5) {
                        draft[6].evalIdx = state[6].evalIdx + 1;
                    } else if (state[6].evalIdx == 5) {
                        draft[6].evalIdx = 0;
                    }
                    return;
                }
            }
        })
    );
};

export const incrementEvalIdx = function (setState, state) {
    setState(
        produce(state, (draft) => {
            console.log(state[6]);
            if (state[6].evalIdx < 5) {
                draft[6].evalIdx = state[6].evalIdx + 1;
            } else if (state[6].evalIdx == 5) {
                draft[6].evalIdx = 0;
            }
        })
    );
};
