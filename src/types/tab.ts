import type { JSX } from 'react';

export type Tab = {
    value: string;
    icon: React.ComponentType<any>;
    label: string;
    content: JSX.Element;
};
