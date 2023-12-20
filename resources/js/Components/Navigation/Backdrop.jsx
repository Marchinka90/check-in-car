import React from 'react';
import ReactDOM from 'react-dom';

export default function Backdrop(props) {
  const content = (
    <>
      <div className="backdrop fixed top-0 left-0 w-full h-screen z-20" onClick={props.onClick}></div>
      <style>{`
        .backdrop {
          background: rgba(0, 0, 0, 0.75);
        }
      `}</style>
    </>
    );

  return ReactDOM.createPortal(content, document.getElementById('backdrop-hook'));
};
