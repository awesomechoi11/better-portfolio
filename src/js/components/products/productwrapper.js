import { AnimatePresence, motion } from 'framer-motion'
import products from '../../../config.json'
import { px2vw19 } from '../../utils/utils'
import '../../../sass/product.scss'
import { fromPreviewToProduct } from '../../animVariants'


console.log(fromPreviewToProduct)

export default function ProductWrapper() {


    return (

        <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={fromPreviewToProduct}
            className='product-wrapper'>
            hello
        </motion.div>
    )

}

console.log(products)

function Product() {

}