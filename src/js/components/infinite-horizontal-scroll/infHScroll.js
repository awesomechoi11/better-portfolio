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
    const pointerType = useRef('mouse')

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
            //document.getElementById('wow').innerHTML = timeStep.current

        } else if (
            timeStep.current > Math.abs(time - prevTimeRef.current) &&
            Math.abs(time - prevTimeRef.current) > 6.94
        ) {
            timeStep.current = Math.abs(time - prevTimeRef.current);
            //document.getElementById('wow').innerHTML = timeStep.current
        } else if (destX !== currX) {

            if (Math.abs(destX - currX) > threshold) {
                //if dest is far from currX

                //if difference in time between frames long enough minus 1 step/frame
                //if (Math.abs(time - prevTimeRef.current) + timeStep.current >= mspf) {
                var multiplier = 4;
                if (pointerType.current === 'touch') {
                    multiplier = 16
                }
                x.set(lerp(currX, destX, multiplier * Math.sqrt(timeStep.current) / 250))
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
        console.log(e.pointerType)
        pointerType.current = e.pointerType
        //document.getElementById('wow').innerHTML = e.pointerType
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
                <div id='wow'>
                    {timeStep.current}
                </div>
                {props.children}
            </motion.div>
        </Hammer>
    )
}

