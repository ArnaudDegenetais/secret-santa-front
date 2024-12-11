import React from 'react';
import './TreeLoader.css';

const TreeLoader: React.FC = () => {
  return (
    <div className="container">
      <div className="tree">
        <div className="branch" style={{ '--x': 0 } as React.CSSProperties}>
          <span style={{ '--i': 0 } as React.CSSProperties}></span>
          <span style={{ '--i': 1 } as React.CSSProperties}></span>
          <span style={{ '--i': 2 } as React.CSSProperties}></span>
          <span style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
        <div className="branch" style={{ '--x': 1 } as React.CSSProperties}>
          <span style={{ '--i': 0 } as React.CSSProperties}></span>
          <span style={{ '--i': 1 } as React.CSSProperties}></span>
          <span style={{ '--i': 2 } as React.CSSProperties}></span>
          <span style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
        <div className="branch" style={{ '--x': 2 } as React.CSSProperties}>
          <span style={{ '--i': 0 } as React.CSSProperties}></span>
          <span style={{ '--i': 1 } as React.CSSProperties}></span>
          <span style={{ '--i': 2 } as React.CSSProperties}></span>
          <span style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
        <div className="branch" style={{ '--x': 3 } as React.CSSProperties}>
          <span style={{ '--i': 0 } as React.CSSProperties}></span>
          <span style={{ '--i': 1 } as React.CSSProperties}></span>
          <span style={{ '--i': 2 } as React.CSSProperties}></span>
          <span style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
        <div className="stem">
          <span style={{ '--i': 0 } as React.CSSProperties}></span>
          <span style={{ '--i': 1 } as React.CSSProperties}></span>
          <span style={{ '--i': 2 } as React.CSSProperties}></span>
          <span style={{ '--i': 3 } as React.CSSProperties}></span>
        </div>
        <span className="shadow"></span>
      </div>
    </div>
  );
};

export default TreeLoader;