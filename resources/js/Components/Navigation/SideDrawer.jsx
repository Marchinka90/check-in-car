import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export default function SideDrawer(props) {
    const content = (
    <>
      <CSSTransition 
          in={props.show}
          timeout={300}
          classNames="slide-in-left"
          mountOnEnter
          unmountOnExit
      >
          <aside className='fixed top-0 left-0 z-50 w-2/3 h-screen bg-background-light	shadow-2xl' onClick={props.onClick}>{props.children}</aside>
      </CSSTransition>

      <style>{`
        .side-drawer {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        }  
        .slide-in-left-enter {
          transform: translateX(-100%);
        }
        
        .slide-in-left-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }
        
        .slide-in-left-exit {
          transform: translateX(0);
        }
        
        .slide-in-left-exit-active {
          transform: translateX(-100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
    </>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}
