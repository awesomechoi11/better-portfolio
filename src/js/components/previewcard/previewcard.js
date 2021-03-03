import '../../../sass/previewcard.scss'
import { fadeinVariants, px2vw } from '../../utils/utils'
import { gotoIndex_atom, isVisible_atom, selectedPreview_atom } from '../../utils/Atom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { motion, AnimateSharedLayout } from 'framer-motion'


const test = [
    {
        color: "#ff0055",

    },
    {
        color: "#0099ff",

    },
]

const previewCardWidth = px2vw(700);
PreviewWrapper.defaultProps = {
    width: previewCardWidth * test.length,
    count: test.length,
    childWidth: previewCardWidth,
    items: test,
    wrapper: true
}

export default function PreviewWrapper() {


    return (
        <AnimateSharedLayout >
            {test.map((value, index) => (
                <PreviewCard index={index} key={value.color} {...value} />
            ))}
        </AnimateSharedLayout>
    )
}
const colors = ["#ff0055", "#0099ff", "#22cc88", "#ffaa00"];

PreviewCard.defaultProps = {
    width: previewCardWidth
}

function PreviewCard({ width, index, color }) {
    const [isVisible, setVisible] = useRecoilState(isVisible_atom)
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
