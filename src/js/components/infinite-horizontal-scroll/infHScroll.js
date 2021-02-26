import '../../../sass/infHScroll.scss'
import Hammer from 'react-hammerjs';
import { useSetRecoilState } from 'recoil';

import lerp from 'lerp'

import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';

/** 
 * 
 * Runs update function once
 * which recursively calls itself forever
 * 
 * on each update:
 * check if difference between destX and currX is greater than threshold
 *      true then lerp currX  
 *      false then set currX to dest X
 * 
 * 
 * have minimum width of 100vw
 * and loop around when reached end of scroll
 * 
*/
InfHScroll.defaultProps = {
    initialOffset: 0
}

export default function InfHScroll(props) {

    const x = useMotionValue(props.initialOffset) //framer hook that controls positioning
    const destXRef = useRef(props.initialOffset) // target value for x
    const prevTimeRef = useRef(0) // need to keep track of time between animations to get fps
    const timeStep = useRef(0) // ms per frame
    const panStart = useRef(0) // pan uses delta x instead of velocity
    const pointerType = useRef('mouse') // decides multiplier// faster lerp for mobile

    const threshold = 1
    var multiplier = 4;


    var totalWidth = 0; //width of only the original children
    var container = { // width of original children + extra children until 100vw
        width: 0,
        extraChildren: []
    };

    props.children.forEach(item => {
        totalWidth += item.props.width;
        if (container.width < 100) {
            container.width += item.props.width
            container.extraChildren.push(item)
        }
    });
    container.width += totalWidth;
    const totalWidthpx = totalWidth * window.innerWidth / 100

    console.log('InfHScroll!!')

    //goto(2, 'center', 'right')

    useEffect(() => {
        //run update once/ recursively runs forever
        console.log('start animation updates')
        requestAnimationFrame(update)
    }, [])


    //helper function that sets screen position based on px
    function setDest(value, align = 'center', unit = 'px') {

        //assuming 1920/1080 resolution
        var newDest = value;
        //set unit to px
        if (unit === 'vw') {
            newDest = value * (window.innerWidth / 100)
        }

        if (align === 'center') {
            //offset left by half of screen
            newDest += window.innerWidth / 2;
        } else if (align === 'right') {
            newDest += window.innerWidth;
        }

        console.log('setDest ', newDest, ' ', align)
        destXRef.current = newDest

    }

    //function to goto a child aligned to center left or right
    function goto(
        index,
        targetalign = 'center',
        windowalign = 'center',
        offsetvw = 0,
        unit = 'vw'
    ) {

        console.log('goto ', index)
        //get new destX by adding width of each prev child
        var targetX = offsetvw;
        for (var i = 0; i < index; i++) {
            targetX -= props.children[i].props.width;
        }

        ////offset for aligning child as target
        if (targetalign === 'center') {
            targetX -= props.children[index].props.width / 2;
        } else if (targetalign === 'left') {
            //nothing
        } else if (targetalign === 'right') {
            targetX -= props.children[index].props.width;
        }

        //everything probably vw/ convert to px for window offset
        if (unit === 'vw') {
            targetX *= window.innerWidth / 100
        }

        //offsets for aligning window to target
        if (windowalign === 'center') {
            targetX += window.innerWidth / 2;
        } else if (windowalign === 'left') {
            //nothing
        } else if (windowalign === 'right') {
            targetX += window.innerWidth;
        }

        setDest(targetX, 'left')

    }

    console.log(setDest)

    //update if dest != curr
    function update(time) {
        const currX = x.get()
        const destX = destXRef.current

        //if first time running prevTime is not set
        if (!prevTimeRef.current) {
            //set prev
            prevTimeRef.current = time;
        } else if (destX !== currX) {

            //if second time running
            if (!timeStep.current) {
                timeStep.current = Math.abs(time - prevTimeRef.current)
            }
            //if faster timeStep AND greater than 6.94 so 144hz max
            if (
                timeStep.current > Math.abs(time - prevTimeRef.current) &&
                Math.abs(time - prevTimeRef.current) > 6.94
            ) {
                timeStep.current = Math.abs(time - prevTimeRef.current);
            }



            //responsive 
            if (pointerType.current === 'touch') {
                multiplier = 16
            }

            var newDest = lerp(currX, destX, multiplier * Math.sqrt(timeStep.current) / 250);


            //if out of bounds goto other side carrying equalivalent values

            if (-newDest >= totalWidthpx) {
                //going out of bounds to the right
                newDest += totalWidthpx
                destXRef.current += totalWidthpx
                panStart.current = newDest + panStart.current - currX;

            } else if (-newDest < 0) {
                //going out of bounds to the left
                newDest -= totalWidthpx
                destXRef.current -= totalWidthpx
                panStart.current = newDest + panStart.current - currX;
            } else {
            }

            x.set(newDest)
            prevTimeRef.current = time


        } else {
            //means theyre equal
        }

        requestAnimationFrame(update)
    }


    function handleScroll(e) {
        destXRef.current += (-(e.deltaY / Math.abs(e.deltaY)) * 120)
    }
    function handlePan(e) {
        destXRef.current = (e.deltaX + panStart.current)
        pointerType.current = e.pointerType

    }
    function handlePanStart(e) {
        panStart.current = destXRef.current
    }

    return (
        <Hammer
            direction='DIRECTION_HORIZONTAL'
            options={{ touchAction: 'pan-x' }}
            onPan={handlePan}
            onPanStart={handlePanStart}
        >
            <motion.div
                className='scroll-wrapper'
                style={{ width: container.width + 'vw', x }}
                onWheel={handleScroll}
            >
                {props.children}
                {container.extraChildren}

            </motion.div>
        </Hammer>
    )
}

