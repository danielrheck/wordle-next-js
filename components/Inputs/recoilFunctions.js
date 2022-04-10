import produce from 'immer';

export const makeSomething = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {});
            return;
        })
    );
};
