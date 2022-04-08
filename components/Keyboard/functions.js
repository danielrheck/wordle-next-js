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
