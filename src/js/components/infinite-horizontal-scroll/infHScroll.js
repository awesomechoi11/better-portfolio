import '../../../sass/infHScroll.scss'
import Hammer from 'react-hammerjs';
import { useRecoilState } from 'recoil';

import lerp from 'lerp'

import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';

/** 
 * 
 * have minimum width of 100vw
 * and loop around when reached end of scroll
 * 
*/
export default function InfHScroll(props) {

    const x = useMotionValue(0)
    const destXRef = useRef(0)
    const prevTimeRef = useRef(0)
    const timeStep = useRef(0)
    const panStart = useRef(0)

    const alpha = 0.1
    const fps = 145;
    const mspf = 1000 / fps
    const threshold = 0.5

    var totalWidth = 0;
    props.children.forEach(item => {
        totalWidth += item.props.width;
    });


    console.log('rerendered!!')


    useEffect(() => {
        //run update once/ runs forever
        console.log('start scroll frames')
        requestAnimationFrame(update)
    }, [])

    //update if dest != curr
    function update(time) {
        const currX = x.get()
        const destX = destXRef.current

        //if first time running prevTime is not set
        if (!prevTimeRef.current) {
            //set prev
            prevTimeRef.current = time;
        } else if (!timeStep.current) {
            //if second time running
            timeStep.current = Math.abs(time - prevTimeRef.current)
        } else if (timeStep.current > Math.abs(time - prevTimeRef.current)) {
            timeStep.current = Math.abs(time - prevTimeRef.current);
        } else if (destX !== currX) {

            if (Math.abs(destX - currX) > threshold) {
                //if dest is far from currX

                //if difference in time between frames long enough minus 1 step/frame
                //if (Math.abs(time - prevTimeRef.current) + timeStep.current >= mspf) {

                x.set(lerp(currX, destX, 3 * timeStep.current / 250))
                prevTimeRef.current = time
                //}

            } else {
                //if close but not equal just set it
                x.set(destX)
            }

        } else {
            //means theyre equal
            //do nothing
            //console.log(123)
        }

        requestAnimationFrame(update)
    }


    function handleScroll(e) {
        destXRef.current += (-(e.deltaY / Math.abs(e.deltaY)) * 120)
    }

    function handlePan(e) {
        destXRef.current = (e.deltaX + panStart.current)
    }
    function handlePanStart(e) {
        panStart.current = destXRef.current
    }
    return (
        <Hammer
            direction='DIRECTION_HORIZONTAL'
            options={{
                touchAction: 'pan-x'
            }}
            onPan={handlePan}
            onPanStart={handlePanStart}
        >

            <motion.div
                className='scroll-wrapper'
                style={{
                    width: totalWidth + 'vw',
                    x
                }}
                transition={{
                    duration: 1
                }}
                onWheel={handleScroll}
            >
                {props.children}
            </motion.div>
        </Hammer>
    )
}

