import { px2vw19 } from "./utils/utils";


const previewWidth = px2vw19(440);
const previewHeight = px2vw19(590);

export const fromPreviewToProduct = {
    initial: {
        opacity: 1,
        width: previewWidth + 'vw',
        height: previewHeight + 'vw',
    },
    animate: {
        opacity: 1,
        width: '100vw',
        height: '100vh',
        transition: {
            duration: 1
        }
    },
    exit: {
        opacity: 0,
        width: '100vw',
    }
}

