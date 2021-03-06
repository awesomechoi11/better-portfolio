import '../../../sass/infHScroll.scss'
import Hammer from 'react-hammerjs';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gotoIndex_atom, scrollEnabled_atom } from '../../utils/Atom'

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
 *      true then lerp destx to currX  
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

    const [gotoIndexValue, setIndexValue] = useRecoilState(gotoIndex_atom)

    const x = useMotionValue(props.initialOffset) //framer hook that controls positioning
    const destXRef = useRef(props.initialOffset) // target value for x
    const prevTimeRef = useRef(0) // need to keep track of time between animations to get fps
    const timeStep = useRef(0) // ms per frame
    const panStart = useRef(0) // pan uses delta x instead of velocity
    const pointerType = useRef('mouse') // decides multiplier// faster lerp for mobile
    const scrollEnabled = useRecoilValue(scrollEnabled_atom)

    const threshold = 1 //min diff to change x
    var multiplier = 4; // lerp speed


    var totalWidth = 0; //width of only the original children

    //need to keep track of children to use goto
    var container = { // width of original children + extra children until 100vw
        width: 0,
        children: [],
        extraChildren: []
    };

    props.children.forEach(item => {
        //if special child
        //get number of children and add that many to container
        if (item.props.wrapper) {
            container.children = container.children.concat(item.props.items.map(thing => (item.props.childWidth)))
        } else {
            container.children.push(item.props.width)
        }

        totalWidth += item.props.width;
        if (container.width < 100) {
            container.width += item.props.width
            container.extraChildren.push(item)
        }

    });
    container.width += totalWidth;

    console.log('InfHScroll!!')





    useEffect(() => {
        //run update once/ recursively runs forever
        console.log('start animation updates')
        requestAnimationFrame(update)
    }, [])

    useEffect(() => {
        if (gotoIndexValue >= 0) {
            goto(gotoIndexValue)
        }
    }, [gotoIndexValue])


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

    function totalWidthpx() { return totalWidth * window.innerWidth / 100 }


    //function to goto a child aligned to center left or right
    function goto(
        index = 0,
        targetalign = 'center',
        windowalign = 'center',
        offsetvw = 0,
        unit = 'vw'
    ) {

        //const props = this
        console.log('goto ', index)
        //get new destX by adding width of each prev child
        var targetX = offsetvw;
        for (var i = 0; i < index; i++) {
            targetX -= container.children[i];
        }
        const targetWidth = container.children[index];
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
        setIndexValue(-1)
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
        if (!scrollEnabled) {
            return
        }
        destXRef.current += (-(e.deltaY / Math.abs(e.deltaY)) * 120)
    }
    function handlePan(e) {
        if (!scrollEnabled) {
            return
        }
        destXRef.current = (e.deltaX + panStart.current)
        pointerType.current = e.pointerType

    }
    function handlePanStart(e) {
        if (!scrollEnabled) {
            return
        }
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

