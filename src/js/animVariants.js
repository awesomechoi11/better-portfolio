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
            duration: 8
        }
    },
    exit: {
        opacity: 0,
        width: '100vw',
    }
}

// export const fromPreviewToProduct = {
//     initial: {
//         opacity: 1,
//         top: '50vh',
//         left: '50vw',
//         width: previewWidth + 'vw',
//         height: previewHeight + 'vw',
//         y: -(previewHeight / 2) + 'vw',
//         x: -(previewWidth / 2) + 'vw',
//     },
//     animate: {
//         opacity: 1,
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         y: '0vw',
//         x: '0vw',
//         transition: {
//             duration: 8
//         }
//     },
//     exit: {
//         opacity: 0,
//         width: '100vw',
//     }
// }