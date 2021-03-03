import '../../../sass/previewcard.scss'
import { fadeinVariants, px2vw } from '../../utils/utils'
import { gotoIndex_atom, isVisible_atom, scrollEnabled_atom, selectedPreview_atom } from '../../utils/Atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion'

import products from '../../../config.json';
import { fromPreviewToProduct } from '../../animVariants';

const previewCardWidth = px2vw(700);
PreviewWrapper.defaultProps = {
    width: previewCardWidth * products.length,
    count: products.length,
    childWidth: previewCardWidth,
    items: products,
    wrapper: true
}

export default function PreviewWrapper() {


    return (
        <AnimateSharedLayout >
            {products.map((value, index) => (
                <PreviewCard index={index} key={value.color} {...value} />
            ))}
        </AnimateSharedLayout>
    )
}

PreviewCard.defaultProps = {
    width: previewCardWidth
}

function PreviewCard({ width, index, color }) {
    const isVisible = useRecoilValue(isVisible_atom)
    const setScrollEnabled = useSetRecoilState(scrollEnabled_atom)
    const [isSelected, setSelected] = useRecoilState(selectedPreview_atom)
    const setGotoIndex = useSetRecoilState(gotoIndex_atom)
    const controls = useAnimation()

    return (
        <motion.div className='preview-card'
            style={{ width: width + 'vw' }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <motion.div className='inner'
                animate={controls}
                onClick={e => {
                    setSelected(index)
                    setGotoIndex(index + 1)
                    setScrollEnabled(false)
                    controls.start('animate')
                        .then()
                }}
                onMouseEnter={e => {
                    //console.log(e)
                    setSelected(index)
                }}
                onAnimationComplete={() => {
                    console.log(123)
                }}
                initial='initial'
                variants={fromPreviewToProduct}
            >
                {isSelected === index && (
                    <motion.div
                        layoutId="outline"
                        className="outline"
                        initial={false}
                        //style={{ outlineColor: color }}
                        animate={{ outlineColor: color }}
                        transition={spring}
                    />
                )}
            </motion.div>
        </motion.div>
    )

}

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
};
