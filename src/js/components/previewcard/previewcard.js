import '../../../sass/previewcard.scss'
import { fadeinVariants, px2vw } from '../../utils/utils'
import { isVisible_atom, selectedPreview_atom } from '../../utils/Atom'
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion'




export function PreviewWrapper() {

}

PreviewCard.defaultProps = {
    width: px2vw(700)
}

export default function PreviewCard(props) {
    const [isVisible, setVisible] = useRecoilState(isVisible_atom)
    const [isSelected, setSelected] = useRecoilState(selectedPreview_atom)


    return (
        <motion.div className='preview-card'
            style={{ width: props.width + 'vw' }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <div className='inner'>
                {isSelected && (
                    <motion.div
                        layoutId="outline"
                        className="outline"
                        initial={false}
                        //animate={{ borderColor: color }}
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
