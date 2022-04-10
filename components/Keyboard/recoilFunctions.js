import produce from 'immer';

export const makeKeyClicked = function (e, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == e.target.id) {
                    item.clicked = true;
                }
            });
            return;
        })
    );
};

export const makeKeyNotClicked = function (e, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == e.target.id) {
                    item.clicked = false;
                }
            });
            return;
        })
    );
};

export const makeKeyRightPlace = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.rightplace = true;
                }
            });
            return;
        })
    );
};

export const makeKeyNotRightPlace = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.rightplace = false;
                }
            });
            return;
        })
    );
};

export const makeKeyWrongPlace = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.wrongplace = true;
                }
            });
            return;
        })
    );
};

export const makeKeyNotWrongPlace = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.wrongplace = false;
                }
            });
            return;
        })
    );
};

export const makeKeyWrongLetter = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.wrongletter = true;
                }
            });
            return;
        })
    );
};

export const makeKeyNotWrongLetter = function (key, setState, state) {
    setState(
        produce(state, (draft) => {
            draft.map((item) => {
                if (item.key == key) {
                    item.wrongletter = false;
                }
            });
            return;
        })
    );
};
