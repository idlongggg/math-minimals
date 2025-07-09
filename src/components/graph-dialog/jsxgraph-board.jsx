import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

// JSXGraph is loaded via CDN for simplicity. You can adjust to use npm if preferred.
const JSXGRAPH_CDN = 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js';
const JSXGRAPH_CSS = 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css';

export default function JXGBoard({ boardId = 'jxgbox', boardOptions = {}, onInit }) {
  const ref = useRef(null);

  useEffect(() => {
    let retryTimeout;
    // Dynamically load JSXGraph if not present
    function tryCreateBoard(retries = 5) {
      if (window.JXG && window.JXG.JSXGraph) {
        createBoard();
      } else if (retries > 0) {
        retryTimeout = setTimeout(() => tryCreateBoard(retries - 1), 100);
      }
    }
    if (!window.JXG) {
      const script = document.createElement('script');
      script.src = JSXGRAPH_CDN;
      script.async = true;
      document.body.appendChild(script);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = JSXGRAPH_CSS;
      document.head.appendChild(link);
      script.onload = () => {
        tryCreateBoard();
      };
      return () => {
        clearTimeout(retryTimeout);
        document.body.removeChild(script);
        document.head.removeChild(link);
      };
    } else {
      tryCreateBoard();
    }
    return () => clearTimeout(retryTimeout);
    // eslint-disable-next-line
  }, []);

  const createBoard = () => {
    if (!ref.current) return;
    // Clean up previous board if exists
    if (
      window.JXG &&
      window.JXG.JSXGraph &&
      window.JXG.JSXGraph.boards &&
      window.JXG.JSXGraph.boards[boardId]
    ) {
      window.JXG.JSXGraph.freeBoard(window.JXG.JSXGraph.boards[boardId]);
    }
    if (window.JXG && window.JXG.JSXGraph && ref.current) {
      const board = window.JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-5, 5, 5, -5],
        axis: true,
        showCopyright: false,
        ...boardOptions,
      });
      if (onInit) onInit(board);
    }
  };

  return (
    <div id={boardId} ref={ref} style={{ width: '100%', height: '80vh', background: '#fff' }} />
  );
}

JXGBoard.propTypes = {
  boardId: PropTypes.string,
  boardOptions: PropTypes.object,
  onInit: PropTypes.func,
};
