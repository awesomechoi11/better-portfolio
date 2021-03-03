import '../../../sass/previewcard.scss'
import { fadeinVariants, px2vw } from '../../utils/utils'
import { gotoIndex_atom, isVisible_atom, selectedPreview_atom } from '../../utils/Atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion, AnimateSharedLayout } from 'framer-motion'

import products from '../../../config.json';

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
    const [isSelected, setSelected] = useRecoilState(selectedPreview_atom)
    const setGotoIndex = useSetRecoilState(gotoIndex_atom)

    return (
        <motion.div className='preview-card'
            style={{ width: width + 'vw' }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <div className='inner'
                onClick={e => {
                    setSelected(index)
                    setGotoIndex(index + 1)
                }}
                onMouseEnter={e => {
                    //console.log(e)
                    setSelected(index)
                }}
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
            </div>
        </motion.div>
    )

}

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
};
