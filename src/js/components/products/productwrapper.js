import { PreviewHeader } from '../previewcard/previewcard'
import products from '../../../config.json'
import '../../../sass/product.scss'
import { fromPreviewToProduct } from '../../animVariants'
import { openProduct_atom, selectedPreview_atom } from '../../utils/Atom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function ProductWrapper() {

    const [openProduct, setOpenProduct] = useRecoilState(openProduct_atom)
    const data = products[openProduct.index]
    return (
        <AnimatePresence>
            {openProduct.isOpen && (
                <motion.div className='product-wrapper'>
                    <div className='content'>
                        <PreviewHeader {...data} />
                    </div>
                    <Product />
                </motion.div>
            )}
        </AnimatePresence>
    )

}

console.log(products)

function Product() {
    return (
        <div>
            hello
        </div>
    )
}