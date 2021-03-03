import { AnimatePresence, motion } from 'framer-motion'
import products from '../../../config.json'
import { px2vw19 } from '../../utils/utils'
import '../../../sass/product.scss'
import { fromPreviewToProduct } from '../../animVariants'
import { useRecoilState, useRecoilValue } from 'recoil'
import { openProduct_atom, selectedPreview_atom } from '../../utils/Atom'



export default function ProductWrapper() {

    const [openProduct, setOpenProduct] = useRecoilState(openProduct_atom)

    return (
        <AnimatePresence>
            {openProduct.isOpen && (
                <motion.div

                    className='product-wrapper'>
                    {products[openProduct.index].color}
                </motion.div>
            )}
        </AnimatePresence>
    )

}

console.log(products)

function Product() {

}