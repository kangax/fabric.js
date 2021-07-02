import React, { useEffect, useRef } from 'react';
import './App.css';
import { fabric } from './fabric';

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const fc = useRef<fabric.Canvas>();
  useEffect(() => {
    const canvas = new fabric.Canvas(ref.current!, { backgroundColor: 'white' });
    fc.current = canvas;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="http://fabricjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fabric Docs
        </a>
        <h2>
          Fabric React Sandbox
        </h2>
        <a
          className="App-link"
          href="https://github.com/fabricjs/fabric.js/blob/master/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribution Guide
        </a>
      </header>
      <div className="App-canvas">
        <canvas
          width={500}
          height={500}
          ref={ref}
        />
      </div>
      <footer className="App-footer">
        <code>fabric</code> is being watched for changes. All you need to do is start coding!<br />
        To edit this test app open <code>./src/App.tsx</code><br />
      </footer>
    </div>
  );
}

export default App;
