import '../../../sass/infHScroll.scss'
import Hammer from 'react-hammerjs';
import { useSetRecoilState } from 'recoil';

import lerp from 'lerp'

import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react';
import { offsetByChildAlign, px2vw, vw2px } from '../../utils/utils';

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

class unitValue {

    units = ['px', 'vw']

    constructor(unit, value) {
        this.unit = unit;
        if (!this.units.includes(unit)) {
            throw 'invalid unit type'
        }
        this.value = value
    }
    getPx() {
        if (this.unit === 'px') {
            return this.value
        } else if (this.unit === 'vw') {
            return vw2px(this.value)
        } else {
            throw 'topx'
        }
    }
    add(value, unit) {
        if (unit === this.unit) {
            this.value += value;
        } else {

        }
    }
}

export default function InfHScroll(props) {

    const x = useMotionValue(props.initialOffset) //framer hook that controls positioning
    const destXRef = useRef(props.initialOffset) // target value for x
    const prevTimeRef = useRef(0) // need to keep track of time between animations to get fps
    const timeStep = useRef(0) // ms per frame
    const panStart = useRef(0) // pan uses delta x instead of velocity
    const pointerType = useRef('mouse') // decides multiplier// faster lerp for mobile

    const threshold = 1 //min diff to change x
    var multiplier = 4; // lerp speed


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
    function totalWidthpx() { return totalWidth * window.innerWidth / 100 }

    console.log('InfHScroll!!', totalWidth)

    //goto(2, 'center', 'right')



    useEffect(() => {


        window.addEventListener('resize', e => {

        })

        //run update once/ recursively runs forever
        console.log('start animation updates')
        requestAnimationFrame(update)
    }, [])


    function setCurr(value, unit = 'px') {
        var newCurr = value
        if (unit === 'px') {
            newCurr = px2vw(value)
        }
        x.set(value)
    }

    //helper function that sets screen position based on px
    function setDest(value, align = 'center', unit = 'px') {
        //align the position according to screen!
        var newDest = value;
        //set unit to px
        if (unit === 'vw') {
            newDest = vw2px(newDest)
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
        const targetWidth = props.children[index].props.width;
        ////offset for aligning child as target
        targetX -= offsetByChildAlign(targetWidth, targetalign)

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


    //update if dest != curr
    function update(time) {
        const currX = x.get()
        const destX = destXRef.current
        const prevTime = prevTimeRef.current


        //if first time running prevTime is not set
        if (!prevTime) {
            //set prev
            prevTimeRef.current = time;
            setCurr(0.01)
        } else if (destX !== currX) {

            //if second time running OR
            //if faster timeStep AND greater than 6.94 so 144hz max
            const lastTimeStep = time - prevTimeRef.current
            if (
                !timeStep.current || (
                    timeStep.current > lastTimeStep &&
                    lastTimeStep > 6.94
                )) {
                timeStep.current = Math.abs(time - prevTime)
            }



            //wow! responsive 
            if (pointerType.current === 'touch') {
                multiplier = 16
            }

            var newDest;

            if (Math.abs(currX - destX) > threshold) {

                newDest = lerp(currX, destX, multiplier * Math.sqrt(timeStep.current) / 250);

                //if out of bounds goto other side carrying equalivalent values
                if (-newDest >= totalWidthpx()) {
                    //going out of bounds to the right
                    newDest += totalWidthpx()
                    destXRef.current += totalWidthpx()
                    panStart.current = newDest + panStart.current - currX;

                } else if (-newDest < 0) {
                    //going out of bounds to the left
                    newDest -= totalWidthpx()
                    destXRef.current -= totalWidthpx()
                    panStart.current = newDest + panStart.current - currX;
                } else {
                }
            } else {
                newDest = currX
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

