import type { ButtonStyleConfig } from './types';

export const INITIAL_STATE = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  memory: 0,
  isRadianMode: true,
  history: [] as string[],
};

export const MAX_HISTORY_ITEMS = 10;

export const BUTTON_STYLES: Record<string, ButtonStyleConfig & { [key: string]: any }> = {
  base: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  operator: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  scientific: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: 'secondary.main',
    color: 'secondary.contrastText',
    '&:hover': {
      backgroundColor: 'secondary.dark',
    },
  },
  equals: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: 'success.main',
    color: 'success.contrastText',
    '&:hover': {
      backgroundColor: 'success.dark',
    },
  },
  clear: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: 'error.main',
    color: 'error.contrastText',
    '&:hover': {
      backgroundColor: 'error.dark',
    },
  },
  memory: {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
    backgroundColor: 'info.main',
    color: 'info.contrastText',
    '&:hover': {
      backgroundColor: 'info.dark',
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
    '%': 'mod',
    '^': '^',
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

export const SCIENTIFIC_FUNCTIONS = {
  trigonometric: ['sin', 'cos', 'tan'],
  logarithmic: ['log', 'ln'],
  power: ['sqrt', 'square', 'exp'],
  constants: ['pi', 'e'],
  other: ['factorial', 'reciprocal'],
} as const;

export const MEMORY_FUNCTIONS = ['MC', 'MR', 'MS', 'M+', 'M-'] as const;
