import { PreviewHeader } from '../previewcard/previewcard'
import products from '../../../config.json'
import '../../../sass/product.scss'
import { exitPreview, fromPreviewToProduct } from '../../animVariants'
import { openProduct_atom, scrollEnabled_atom, selectedPreview_atom } from '../../utils/Atom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const closeSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" >
        <path d="M1 1L31 31M1 1V31M1 1H31M31 31V1M31 31H1M31 1L1 31" stroke="#E9EDDE" />
    </svg>

)


export default function ProductWrapper() {

    const [openProduct, setOpenProduct] = useRecoilState(openProduct_atom)
    const setScrollEnabled = useSetRecoilState(scrollEnabled_atom)
    const data = products[openProduct.index]

    function closeProduct() {
        setOpenProduct({ isOpen: false, index: -1 })
        setScrollEnabled(true)
    }

    return (
        <AnimatePresence>
            {openProduct.isOpen && (
                <motion.div
                    initial={false}
                    animate='animate'
                    exit='exit'
                    variants={exitPreview}
                    className='product-wrapper'>
                    <PerfectScrollbar>
                        <div className='util-btns'>
                            <div className='close-product'
                                onClick={closeProduct}
                            >
                                close
                            </div>
                        </div>
                        <div className='content'>
                            <PreviewHeader {...data} />
                        </div>
                        <Product />
                    </PerfectScrollbar>
                </motion.div>
            )}
        </AnimatePresence>
    )

}


function Product() {
    return (
        <div className='product-showcase'>
            hello
        </div>
    )
}