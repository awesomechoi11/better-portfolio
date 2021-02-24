import '../../../sass/infHScroll.scss'
import Hammer from 'react-hammerjs';
import { useRecoilState } from 'recoil';


import { motion, useMotionValue } from 'framer-motion'

/** 
 * 
 * have minimum width of 100vw
 * and loop around when reached end of scroll
 * 
*/
export default function InfHScroll(props) {

    console.log(props.children)

    var totalWidth = 0;
    props.children.forEach(item => {
        //console.log(item.props.width)
        totalWidth += item.props.width;
    });

    const transition = {
        power: 0.4,
        // Snap calculated target to nearest 50 pixels
        modifyTarget: target => Math.round(target / 50) * 50
    }

    function handleScroll(e) {
        console.log(e)
    }

    return (
        <Hammer
            direction='DIRECTION_HORIZONTAL'
            options={{
                touchAction: 'pan-x'
            }}
            onPan={e => {
                handleScroll(e.deltaX)
            }}
        >

            <div
                className='scroll-wrapper'
                onWheel={e => {
                    handleScroll(e.deltaY)
                }}
            >

            </div>
        </Hammer>
    )
}



// return (
//     <motion.div
//         className='scroll-wrapper'
//         drag="x"
//         onDrag={(e, info) => {
//             console.log(info.offset.x)
//         }}
//         dragTransition={transition}
//     >

//         {props.children}

//     </motion.div>
// )