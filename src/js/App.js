import '../sass/App.scss';
import InfHScroll from './components/infinite-horizontal-scroll/infHScroll'

import React from 'react';
import { Page } from 'framer-motion'

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
      <Page alignment="center" />
    </InfHScroll>

  );
}

export default App;


function Placeholder(props) {
  return (
    <div
      style={{
        width: props.width + 'vw'
      }}
    >
      123qwe
    </div>
  )

}