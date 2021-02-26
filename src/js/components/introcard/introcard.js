import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { propTypes } from 'react-hammerjs';
import '../../../sass/introcard.scss';


IntroCard.defaultProps = {
    width: 70
}

export default function IntroCard(props) {

    return (
        <div
            style={{ width: props.width + 'vw' }}
        >
            <IndividualLetters className='intro-banner' text='12345678' />
        </div>
    )

}


const letterVariants = {
    initial: {
        opacity: 0,
        top: '200px',
    },
    visible: (custom) => ({
        opacity: 1,
        top: '0px',
        transition: { delay: custom * 0.2, duration: 2 }
    })
}

function IndividualLetters(props) {

    useEffect(() => {
        //show each letter
    })

    return (
        <div
            {...props}
            className={`indletter-wrapper ${props.className ?? props.className} `}>
            {props.text.split('').map((letter, index) => (
                <motion.span
                    custom={index}
                    className={'indletter-item '}
                    key={letter + index}
                    style={{ fontSize: 20 * (index + 1) + 'px' }}
                    initial='initial'
                    animate='visible'
                    variants={letterVariants}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    )
}