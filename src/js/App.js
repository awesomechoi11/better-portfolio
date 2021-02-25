import '../sass/App.scss';
import React from 'react';


import InfHScroll from './components/infinite-horizontal-scroll/infHScroll'
import IntroCard from './components/introcard/introcard'



/**
 * 
 * Container for:
 * 
 * 
 */

function App() {
  return (

    <InfHScroll >
      <IntroCard />
      <Placeholder width={50 + 30} />
      <Placeholder width={50 + 30} />
      <Placeholder width={50 + 30} />
      <Placeholder width={50 + 30} />
      <Placeholder width={50 + 30} />
      <Placeholder width={50 + 30} />

    </InfHScroll>

  );
}

export default App;


function Placeholder(props) {

  const randColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

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