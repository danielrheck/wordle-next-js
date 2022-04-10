import { atom } from 'recoil';
import { obj } from './initialState';

export const keyboardState = atom({
    key: 'keyboardState',
    default: obj,
});
