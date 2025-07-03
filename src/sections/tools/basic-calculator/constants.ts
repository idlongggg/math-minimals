import type { BasicCalculatorState } from './types';

export const INITIAL_STATE: BasicCalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

export const BUTTON_STYLES = {
  base: {
    minHeight: 60,
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: 2,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  },
  operator: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  equals: {
    backgroundColor: 'success.main',
    color: 'success.contrastText',
    '&:hover': {
      backgroundColor: 'success.dark',
    },
  },
  clear: {
    backgroundColor: 'error.main',
    color: 'error.contrastText',
    '&:hover': {
      backgroundColor: 'error.dark',
    },
  },
} as const;

export const KEYBOARD_MAPPINGS = {
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  operators: {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷',
  },
  actions: {
    'Enter': '=',
    '=': '=',
    'Escape': 'clear',
    'c': 'clear',
    'C': 'clear',
    'Backspace': 'backspace',
    '.': 'decimal',
  },
} as const;
