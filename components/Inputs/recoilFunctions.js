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
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].active) {
                    if (i < draft.length - 1) {
                        for (let u = 0; u < draft[i].input.length; u++) {
                            draft[i].input[u].active = false;
                        }
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
                            draft[i].input[u].value = '';
                            if (u > 0) {
                                draft[i].input[u].active = false;
                                draft[i].input[u - 1].active = true;
                                return;
                            }
                        }
                    }
                }
            }
        })
    );
};
