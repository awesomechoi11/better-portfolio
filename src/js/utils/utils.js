

//convert px to vw with innerwidth as width
export function px2vw(value) {
    return value / (window.innerWidth / 100)
}

export function vw2px(value) {
    return value * (window.innerWidth / 100)
}

export function offsetByChildAlign(childWidth, align) {
    if (align === 'center') {
        return childWidth / 2;
    } else if (align === 'left') {
        //nothing
    } else if (align === 'right') {
        return childWidth;
    }
}

export function offsetByWindowAlign(align) {

}

export const fadeinVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
}