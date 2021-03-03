import "../../../sass/previewcard.scss"
import { fadeinVariants, px2vw } from "../../utils/utils"
import { gotoIndex_atom, isVisible_atom, openProduct_atom, scrollEnabled_atom, selectedPreview_atom } from "../../utils/Atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion, AnimateSharedLayout, useAnimation } from "framer-motion"

import products from "../../../config.json";
import { fromPreviewToProduct } from "../../animVariants";


[
    {
        "preview": "preview1",
        "video-preview": "preview2",
        "enabled": "true",
        "title": "SEJI",
        "role": "FRONT END",
        "desc": "Seji is a digital media production company. I emulated a modern minimalist design to attract the most attention to their work. I made up Seji to test new designs and interactive components.",
        "year": "2020",
        "link": "https://www.seji.brandon-choi.info/"
    },
    {
        "preview": " nomina1",
        "video-preview": "nomina2",
        "enabled": "true",
        "title": "NOMINA",
        "role": "FRONT END",
        "desc": "Nomina is a high end jewelry company. I incorporated elegent and simplistic animations and interactions.",
        "year": "2020",
        "link": "https://www.nomina.brandon-choi.info/"
    },
    {
        "preview": "comingsoon",
        "video-preview": "preview2",
        "enabled": "false",
        "title": "COMING SOON",
        "role": "FRONT END + BACK END",
        "desc": "I made a highly versatile clothing scalper of a popular clothng brand called Supreme. BTW i never used or lent it to anyone!",
        "year": "2018"
    },
    {
        "preview": "comingsoon",
        "video-preview": "preview2",
        "enabled": "false",
        "title": "COMING SOON",
        "role": "BACK END",
        "desc": "Here are some miscellaneous goodies I made in highschool.",
        "year": "2018"
    }
]

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

    const setGotoIndex = useSetRecoilState(gotoIndex_atom)
    const setScrollEnabled = useSetRecoilState(scrollEnabled_atom)
    const setOpenProduct = useSetRecoilState(openProduct_atom)

    const [isSelected, setSelected] = useRecoilState(selectedPreview_atom)

    const controls = useAnimation()

    return (
        <motion.div className="preview-card"
            style={{ width: width + "vw" }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <motion.div className="inner"
                animate={controls}
                onClick={e => {
                    setSelected(index)
                    setGotoIndex(index + 1)
                    setScrollEnabled(false)
                    controls.start("animate")
                        .then((value) => {
                            setOpenProduct({ isOpen: true, index: index })
                            controls.set("initial")
                        })
                }}
                onMouseEnter={e => {
                    setSelected(index)
                }}

                initial="initial"
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
