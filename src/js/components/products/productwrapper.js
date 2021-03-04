import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import InfBanner from './infbanner'
import { PreviewHeader } from '../previewcard/previewcard'
import { products } from '../../../config'
import '../../../sass/product.scss'
import { exitPreview, fromPreviewToProduct } from '../../animVariants'
import { openProduct_atom, scrollEnabled_atom, selectedPreview_atom } from '../../utils/Atom'


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
                    key='product-wrapper'
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    variants={exitPreview}
                    className='product-wrapper'>
                    <PerfectScrollbar>
                        <div className='util-btns'>
                            <div className='close-product'
                                onClick={closeProduct}
                            >
                                {closeSvg}
                            </div>
                        </div>
                        <div className='content'>
                            <PreviewHeader {...data} video={true} />
                        </div>
                        <Product data={data} />
                    </PerfectScrollbar>
                </motion.div>
            )}
        </AnimatePresence>
    )

}


function Product(props) {
    const data = props.data
    return (
        <div className='product-showcase'>
            {data.productDetails && <ProductDetails data={data.productDetails} />}
            {data.initialSketch && <InitialSketch data={data.initialSketch} />}

        </div>
    )
}

function ProductDetails(props) {

    function Title({ value, className }) {
        return (
            <div className={'title ' + className}>
                {value}
            </div>
        )
    }
    function ListItem({ value, className }) {
        return (
            <div className={'list-item ' + className}>
                {value}
            </div>
        )
    }

    return (
        <div className='product-details'>
            {props.data.map((column, index) => (
                <div key={'col-' + index} className={'col-' + index}>
                    {column.map((row, index) => (
                        <div key={'row-' + index} className={'row ' + (row[0] === 'Technologies' ? ' tech' : '')}>
                            <Title value={row[0]}
                                className={row[0] === 'Technologies' ? ' tech' : ''}
                            />
                            <div className={'items-wrapper ' + (row[0] === 'Technologies' ? ' tech' : '')}>
                                {row[1].map(item => (
                                    <ListItem value={item}
                                        className={row[0] === 'Technologies' ? ' tech' : ''}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )

}

function InitialSketch({ data }) {

    function ImageItem({ url }) {
        return (
            <div className='img-item'>
                <img src={url} />
            </div>
        )
    }

    return (
        <div className='sketch-wrapper'>

            <div className='banner-wrapper'>
                <InfBanner text='INITIAL SKETCH *' />
            </div>
            <div className='gallery'>
                {data.images.map((col, index) => (
                    <div key={'col-' + index} className={'col-' + index}>
                        {col.map(img => (
                            <ImageItem url={img} />
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}