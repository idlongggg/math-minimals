'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type MathKeyboardProps = {
  open: boolean;
  onClose: () => void;
  onInsert?: (symbol: string) => void;
  sx?: SxProps<Theme>;
};

// Mathematical symbols organized by categories
const MATH_SYMBOLS = {
  basic: [
    { symbol: '+', latex: '+', label: 'Addition' },
    { symbol: '−', latex: '-', label: 'Subtraction' },
    { symbol: '×', latex: '\\times', label: 'Multiplication' },
    { symbol: '÷', latex: '\\div', label: 'Division' },
    { symbol: '=', latex: '=', label: 'Equal' },
    { symbol: '≠', latex: '\\neq', label: 'Not equal' },
    { symbol: '±', latex: '\\pm', label: 'Plus minus' },
    { symbol: '∓', latex: '\\mp', label: 'Minus plus' },
  ],
  fractions: [
    { symbol: '½', latex: '\\frac{1}{2}', label: 'One half' },
    { symbol: '⅓', latex: '\\frac{1}{3}', label: 'One third' },
    { symbol: '¼', latex: '\\frac{1}{4}', label: 'One quarter' },
    { symbol: 'a/b', latex: '\\frac{a}{b}', label: 'Fraction' },
  ],
  powers: [
    { symbol: 'x²', latex: 'x^2', label: 'Square' },
    { symbol: 'x³', latex: 'x^3', label: 'Cube' },
    { symbol: 'xⁿ', latex: 'x^n', label: 'Power' },
    { symbol: '√', latex: '\\sqrt{x}', label: 'Square root' },
    { symbol: '∛', latex: '\\sqrt[3]{x}', label: 'Cube root' },
    { symbol: 'ⁿ√', latex: '\\sqrt[n]{x}', label: 'Nth root' },
  ],
  calculus: [
    { symbol: '∫', latex: '\\int', label: 'Integral' },
    { symbol: '∬', latex: '\\iint', label: 'Double integral' },
    { symbol: '∭', latex: '\\iiint', label: 'Triple integral' },
    { symbol: '∮', latex: '\\oint', label: 'Contour integral' },
    { symbol: '∂', latex: '\\partial', label: 'Partial derivative' },
    { symbol: '∇', latex: '\\nabla', label: 'Nabla' },
    { symbol: '∆', latex: '\\Delta', label: 'Delta' },
    { symbol: 'lim', latex: '\\lim_{x \\to a}', label: 'Limit' },
  ],
  greek: [
    { symbol: 'α', latex: '\\alpha', label: 'Alpha' },
    { symbol: 'β', latex: '\\beta', label: 'Beta' },
    { symbol: 'γ', latex: '\\gamma', label: 'Gamma' },
    { symbol: 'δ', latex: '\\delta', label: 'Delta' },
    { symbol: 'ε', latex: '\\epsilon', label: 'Epsilon' },
    { symbol: 'θ', latex: '\\theta', label: 'Theta' },
    { symbol: 'λ', latex: '\\lambda', label: 'Lambda' },
    { symbol: 'μ', latex: '\\mu', label: 'Mu' },
    { symbol: 'π', latex: '\\pi', label: 'Pi' },
    { symbol: 'σ', latex: '\\sigma', label: 'Sigma' },
    { symbol: 'φ', latex: '\\phi', label: 'Phi' },
    { symbol: 'ω', latex: '\\omega', label: 'Omega' },
  ],
  comparison: [
    { symbol: '<', latex: '<', label: 'Less than' },
    { symbol: '>', latex: '>', label: 'Greater than' },
    { symbol: '≤', latex: '\\leq', label: 'Less than or equal' },
    { symbol: '≥', latex: '\\geq', label: 'Greater than or equal' },
    { symbol: '≈', latex: '\\approx', label: 'Approximately' },
    { symbol: '≡', latex: '\\equiv', label: 'Equivalent' },
    { symbol: '∝', latex: '\\propto', label: 'Proportional' },
    { symbol: '∞', latex: '\\infty', label: 'Infinity' },
  ],
  sets: [
    { symbol: '∈', latex: '\\in', label: 'Element of' },
    { symbol: '∉', latex: '\\notin', label: 'Not element of' },
    { symbol: '⊂', latex: '\\subset', label: 'Subset' },
    { symbol: '⊃', latex: '\\supset', label: 'Superset' },
    { symbol: '∪', latex: '\\cup', label: 'Union' },
    { symbol: '∩', latex: '\\cap', label: 'Intersection' },
    { symbol: '∅', latex: '\\emptyset', label: 'Empty set' },
    { symbol: 'ℕ', latex: '\\mathbb{N}', label: 'Natural numbers' },
    { symbol: 'ℤ', latex: '\\mathbb{Z}', label: 'Integers' },
    { symbol: 'ℚ', latex: '\\mathbb{Q}', label: 'Rational numbers' },
    { symbol: 'ℝ', latex: '\\mathbb{R}', label: 'Real numbers' },
  ],
  logic: [
    { symbol: '∧', latex: '\\land', label: 'And' },
    { symbol: '∨', latex: '\\lor', label: 'Or' },
    { symbol: '¬', latex: '\\neg', label: 'Not' },
    { symbol: '→', latex: '\\rightarrow', label: 'Implies' },
    { symbol: '↔', latex: '\\leftrightarrow', label: 'If and only if' },
    { symbol: '∀', latex: '\\forall', label: 'For all' },
    { symbol: '∃', latex: '\\exists', label: 'There exists' },
    { symbol: '∄', latex: '\\nexists', label: 'Does not exist' },
  ],
};

const CATEGORIES = [
  { key: 'basic', label: 'Cơ bản', icon: 'solar:pen-bold' },
  { key: 'fractions', label: 'Phân số', icon: 'solar:copy-bold' },
  { key: 'powers', label: 'Lũy thừa', icon: 'solar:import-bold' },
  { key: 'calculus', label: 'Giải tích', icon: 'solar:heart-bold' },
  { key: 'greek', label: 'Hy Lạp', icon: 'solar:flag-bold' },
  { key: 'comparison', label: 'So sánh', icon: 'solar:list-bold' },
  { key: 'sets', label: 'Tập hợp', icon: 'solar:inbox-bold' },
  { key: 'logic', label: 'Logic', icon: 'solar:share-bold' },
] as const;

// ----------------------------------------------------------------------

const CategoryButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  minWidth: 'auto',
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '0.75rem',
  color: active ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.secondary,
  backgroundColor: active ? theme.vars.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.vars.palette.primary.dark : theme.vars.palette.action.hover,
  },
}));

const SymbolButton = styled(Button)(({ theme }) => ({
  minWidth: 48,
  height: 48,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  fontSize: '1.1rem',
  fontWeight: 500,
  color: theme.vars.palette.text.primary,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.vars.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.vars.palette.action.hover,
    borderColor: theme.vars.palette.primary.main,
  },
  '&:active': {
    backgroundColor: theme.vars.palette.action.selected,
  },
}));

// ----------------------------------------------------------------------

export function MathKeyboard({ open, onClose, onInsert, sx }: MathKeyboardProps) {
  const [activeCategory, setActiveCategory] = useState<keyof typeof MATH_SYMBOLS>('basic');

  const handleSymbolClick = useCallback(
    (latex: string) => {
      onInsert?.(latex);
    },
    [onInsert]
  );

  const handleCategoryChange = useCallback((category: keyof typeof MATH_SYMBOLS) => {
    setActiveCategory(category);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="bottom"
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: [
            (theme) => ({
              height: '60vh',
              maxHeight: 500,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              right: { xs: 0, md: 16 },
              left: {
                xs: 0,
                md: 'max(var(--layout-nav-vertical-width, 300px), var(--layout-nav-mini-width, 88px))',
              },
              width: {
                xs: '100%',
                md: 'calc(100% - max(var(--layout-nav-vertical-width, 300px), var(--layout-nav-mini-width, 88px)) - 32px)',
              },
              maxWidth: '100%',
              [theme.breakpoints.up('md')]: {
                left: 'max(var(--layout-nav-vertical-width, 300px), var(--layout-nav-mini-width, 88px))',
                width:
                  'calc(100% - max(var(--layout-nav-vertical-width, 300px), var(--layout-nav-mini-width, 88px)) - 32px)',
              },
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Bàn phím toán học
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          gap: 0.5,
          overflowX: 'auto',
          borderBottom: (theme) => `1px solid ${theme.vars.palette.divider}`,
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => theme.vars.palette.action.disabled,
            borderRadius: 2,
          },
        }}
      >
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.key}
            active={activeCategory === category.key}
            onClick={() => handleCategoryChange(category.key)}
            startIcon={<Iconify icon={category.icon} width={16} />}
          >
            {category.label}
          </CategoryButton>
        ))}
      </Box>

      {/* Symbols Grid */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))',
          gap: 1,
          '&::-webkit-scrollbar': {
            width: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => theme.vars.palette.action.disabled,
            borderRadius: 4,
          },
        }}
      >
        {MATH_SYMBOLS[activeCategory]?.map((item, index) => (
          <SymbolButton
            key={index}
            onClick={() => handleSymbolClick(item.latex)}
            title={item.label}
          >
            {item.symbol}
          </SymbolButton>
        ))}
      </Box>
    </Drawer>
  );
}
