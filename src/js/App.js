import '../sass/App.scss';
import InfHScroll from './components/infinite-horizontal-scroll/infHScroll'

import React from 'react';

/**
 * 
 * Container for:
 * 
 * 
 */

function App() {
  return (
    // <div className="App">
    // </div>
    <InfHScroll>
      <Placeholder width={Math.random() * 100 + 100} />
      <Placeholder width={Math.random() * 100 + 100} />
      <Placeholder width={Math.random() * 100 + 100} />
      <Placeholder width={Math.random() * 100 + 100} />
      <Placeholder width={Math.random() * 100 + 100} />
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