import "../../../sass/previewcard.scss"
import { fadeinVariants, px2vw } from "../../utils/utils"
import { gotoIndex_atom, isVisible_atom, openProduct_atom, scrollEnabled_atom, selectedPreview_atom } from "../../utils/Atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { motion, AnimateSharedLayout, useAnimation } from "framer-motion"

import { products } from "../../../config";
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
    const setOpenProduct = useSetRecoilState(openProduct_atom)

    const [scrollEnabled, setScrollEnabled] = useRecoilState(scrollEnabled_atom)
    const [selectedIndex, setSelected] = useRecoilState(selectedPreview_atom)
    const isSelected = selectedIndex === index
    const controls = useAnimation()

    const data = products[index]

    function handlePreviewClick(e) {
        setSelected(index)
        setGotoIndex(index + 1)
        setScrollEnabled(false)
        controls.start("animate")
            .then((value) => {
                setOpenProduct({ isOpen: true, index: index })
                setTimeout(() => {
                    controls.set("initial")
                }, 400);
            })
    }

    function handleMouseEnter() {
        if (scrollEnabled) {
            setSelected(index)
        }
    }

    return (
        <motion.div className="preview-card"
            style={{
                width: width + "vw",
                zIndex: isSelected ? 2 : 1
            }}
            initial={fadeinVariants.initial}
            animate={isVisible && { opacity: 1 }}
        >
            <motion.div className="inner"
                animate={controls}
                onClick={handlePreviewClick}
                onMouseEnter={handleMouseEnter}
                initial="initial"
                variants={fromPreviewToProduct}
            >

                {isSelected && (
                    <motion.div
                        layoutId="outline"
                        className="outline"
                        initial={false}
                        animate={{ outlineColor: color }}
                        transition={spring}
                    />
                )}
                <motion.div style={{ transform: isSelected && 'translateY( -100% )' }}
                    className='content'>
                    <PreviewHeader {...data} />
                </motion.div>

            </motion.div>
        </motion.div>
    )

}

export function PreviewHeader({ color, title, role, desc, year, preview, videoPreview, video }) {



    return (<>
        <div className='image'>
            {video ?
                (
                    <video autoPlay={true} loop={true} >
                        <source src={videoPreview} />
                    </video>
                ) : (
                    <img
                        src={preview}
                        onLoad={e => {
                            console.log('hello! image loaded ', preview)
                        }}
                    />
                )
            }
        </div>
        <div className='text'>
            <div className='header'>
                <div className='title'>
                    {title + ' · ' + role}
                </div>
                <div className='year'>
                    {year}
                </div>
            </div>
            <div className='desc'>
                {desc}
            </div>
        </div>
    </>)

}

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
};
