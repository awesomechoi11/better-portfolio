import { atom } from 'recoil';


const atomtemplate = atom({
    key: 'atomtemplate', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});


export const vel_atom = atom({
    key: 'vel_atom',
    default: 0
})

export const isVisible_atom = atom({
    key: 'isVisible',
    default: false
})

export const selectedPreview_atom = atom({
    key: 'selectedPreview',
    default: 0
})

export const gotoIndex_atom = atom({
    key: 'gotoFunc',
    default: -1
})

export const openProduct_atom = atom({
    key: 'openProduct',
    default: {
        isOpen: false,
        index: -1
    }
})

export const scrollEnabled_atom = atom({
    key: 'scrollEnabled',
    default: true
})

export const screenSize_atom = atom({
    key: 'screenSize',
    default: 0
})