import "../../../sass/previewcard.scss"
import { fadeinVariants, px2vw } from "../../utils/utils"
import { gotoIndex_atom, isVisible_atom, openProduct_atom, scrollEnabled_atom, selectedPreview_atom } from "../../utils/Atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion, AnimateSharedLayout, useAnimation } from "framer-motion"

import products from "../../../config.json";
import { fromPreviewToProduct } from "../../animVariants";
import { useState } from "react";


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


    function handlePreviewClick(e) {
        setSelected(index)
        setGotoIndex(index + 1)
        setScrollEnabled(false)
        controls.start("animate")
            .then((value) => {
                setOpenProduct({ isOpen: true, index: index })
                controls.set("initial")
            })
    }

    const content = (
        <div className='content'>
            <div className='image'>

            </div>
            <div className='text'>
                <div className='header'>
                    <div className='title'>
                        seji - fullstack
                </div>
                    <div className='year'>
                        2020
                </div>
                </div>
                <div className='desc'>
                    Modern minimalist design for a digital media production company. I made up Seji to test new design and interaction concepts.
            </div>
            </div>
        </div>
    )

    return (
        <motion.div className="preview-card"
            style={{ width: width + "vw" }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <motion.div className="inner"
                animate={controls}
                onClick={handlePreviewClick}
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
                        animate={{ outlineColor: color }}
                        transition={spring}
                    />
                )}
                <div
                    style={{
                        transform: isSelected === index && 'translateY( -100% )'
                    }}
                    className='content'>
                    <div className='image'>
                        preview image here
                    </div>
                    <div className='text'>
                        <div className='header'>
                            <div className='title'>
                                seji - fullstack
                            </div>
                            <div className='year'>
                                2020
                            </div>
                        </div>
                        <div className='desc'>
                            Modern minimalist design for a digital media production company. I made up Seji to test new design and interaction concepts.
                        </div>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    )

}

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
};
