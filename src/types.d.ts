export { };

declare global {
    interface MathfieldElement extends HTMLElement {}
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
        }
    }
}
