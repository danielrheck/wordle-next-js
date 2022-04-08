import { atom } from 'recoil';
import { obj } from './initialObj';

export const keyboardState = atom({
    key: 'keyboardState', // unique ID (with respect to other atoms/selectors)
    default: obj, // default value (aka initial value)
});
