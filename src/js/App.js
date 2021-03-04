import '../sass/App.scss';
import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import debounce from 'lodash.debounce'

import InfHScroll from './components/infinite-horizontal-scroll/infHScroll'
import IntroCard from './components/introcard/introcard'
import PreviewWrapper from './components/previewcard/previewcard'
import ProductWrapper from './components/products/productwrapper'
import { screenSize_atom } from './utils/Atom';


/**
 * 
 * Container for:
 * 
 * 
 */



function App() {
  return (
    <RecoilRoot>
      <InfHScroll >
        <IntroCard />
        <PreviewWrapper />
        <Placeholder width={50 + 30} />
        <Placeholder width={50 + 30} />
        <Placeholder width={50 + 30} />
        <Placeholder width={50 + 30} />
        <Placeholder width={50 + 30} />
        <Placeholder width={50 + 30} />
      </InfHScroll>
      <ProductWrapper />
    </RecoilRoot>

  );
}

export default App;


function Placeholder(props) {

  const randColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

  const setScreenSize = useSetRecoilState(screenSize_atom)

  useEffect(() => {
    var debounced = debounce((e) => {
      setScreenSize(window.innerWidth)
    }, 50)
    window.addEventListener('resize', debounced)
  }, [])

  return (
    <div
      style={{
        width: props.width + 'vw',
        background: randColor
      }}
    >
      123qwe
    </div>
  )

}