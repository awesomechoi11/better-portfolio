import { atom } from 'recoil';


const atomtemplate = atom({
    key: 'atomtemplate', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});


export const vel_atom = atom({
    key: 'vel_atom',
    default: 0
})