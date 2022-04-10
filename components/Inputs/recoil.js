import { atom } from 'recoil';
import { obj } from './initialState';

export const inputsState = atom({
    key: 'inputsState',
    default: obj,
});
