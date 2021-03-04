import '../../../sass/infbanner.scss'
import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { screenSize_atom } from '../../utils/Atom';



//first render and calculate child width
// fit at least to given parent width
export default function InfBanner({
    className = '',
    text = 'hello world!',
    angle = 0,
    gap = 20,
    width = 3000,
}) {

    const [textWidth, setWidth] = useState(0)
    const screenWidth = useRecoilValue(screenSize_atom)
    const textRef = useRef(null);


    useEffect(() => {
        console.log(textRef.current.offsetWidth)
        const transformRotate = ' rotate(' + angle + 'deg) '
        textRef.current.parentElement.animate([
            { transform: transformRotate + 'translate3D(-' + (textRef.current.offsetWidth + gap) + 'px, 0, 0)' },
            { transform: transformRotate + 'translate3D( 0px, 0, 0)' }
        ], {
            duration: 3000,
            iterations: Infinity
        })
        setWidth(textRef.current.offsetWidth)
    }, [textRef, screenWidth]);


    function setCopies(textWidth = 0, gap = 20, parentWidth = 1920) {
        //calculate appropriate amount of copies
        var copy = 0;
        if (Number(textWidth) > 0) {
            copy = Math.ceil(parentWidth / (textWidth + gap))
        } else {
            return
        }
        //add appropriate amount of text copies in given width
        var textArr = [];
        for (var index = 0; index < copy; index++) {
            textArr.push(
                <span className='copy banner-text'
                    style={{ marginLeft: gap + 'px', }}
                > {text} </span>
            )
        }
        return textArr
    }



    return (
        <div className={'infinite-banner ' + className}
            style={{
                transform: 'rotate(' + angle + 'deg)',
                width: width + 'px'
            }} >
            <span className='og banner-text' ref={textRef} >
                {text}
            </span>
            {setCopies(textWidth, gap, width)}
        </div>
    )

}