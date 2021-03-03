import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import '../../../sass/introcard.scss';
import { fadeinVariants, px2vw } from '../../utils/utils';

import { isVisible_atom } from '../../utils/Atom'
import { useRecoilState } from 'recoil';


IntroCard.defaultProps = {
    width: 80
}



const underlineVariants = {
    initial: {
        width: 0
    },
    animate: {
        width: "100%",
        transition: {
            duration: 0.7
        }
    }
}
const introcardVariants = {
    initial: {
        x: '20vw'
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.3,
            delay: 1.3,
            ease: [.53, .05, .51, .94]
        }
    }

}


export default function IntroCard(props) {

    const [isVisible, setVisible] = useRecoilState(isVisible_atom)

    return (
        <motion.div
            style={{ width: props.width + 'vw' }}
            className='intro-card'
            initial='initial'
            animate='animate'
            variants={introcardVariants}
            onAnimationComplete={() => {
                setVisible(true)
            }}
        >
            <div className='inner'>
                <IndividualLetters className='intro-banner' text='Brandon Choi' />
                <motion.div variants={underlineVariants} className='underline' />
                <AnimatePresence>
                    <motion.div
                        initial={fadeinVariants.initial}
                        animate={isVisible && { opacity: 1 }}
                        className='desc'>
                        I am a front-end developer, looking for a full-time position.
                        </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
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
        transition: { delay: custom * 0.08, duration: 0.3 }
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
                    //style={{ fontSize: 20 * (index + 1) + 'px' }}
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