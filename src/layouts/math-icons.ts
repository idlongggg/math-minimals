// Icon configuration for math navigation
// This file maps the icon names used in nav-config-dashboard.tsx to actual SVG icons

export const MATH_ICONS = {
  // Tools and Utilities
  'ic-tools': 'tools-outline',
  'ic-calculator': 'calculator-outline',
  'ic-converter': 'swap-horizontal-outline',
  'ic-solver': 'puzzle-outline',
  'ic-generator': 'create-outline',

  // Basic Math
  'ic-function': 'analytics-outline',
  'ic-integral': 'trending-up-outline',

  // Geometry
  'ic-geometry': 'shapes-outline',
  'ic-square': 'square-outline',
  'ic-cube': 'cube-outline',
  'ic-coordinate': 'grid-outline',
  'ic-triangle': 'triangle-outline',

  // Advanced Math
  'ic-matrix': 'grid-outline',
  'ic-vector': 'arrow-forward-outline',

  // Statistics
  'ic-chart-bar': 'bar-chart-outline',
  'ic-chart-line': 'trending-up-outline',
  'ic-dice': 'dice-outline',
  'ic-bell-curve': 'pulse-outline',

  // Specialized Areas
  'ic-number': 'calculator-outline',
  'ic-network': 'git-network-outline',
  'ic-logic': 'bulb-outline',
  'ic-money': 'card-outline',
  'ic-tree': 'git-branch-outline',
  'ic-graph': 'git-network-outline',
} as const;

// Icon categories for better organization
export const ICON_CATEGORIES = {
  tools: ['ic-tools', 'ic-calculator', 'ic-converter', 'ic-solver', 'ic-generator'],
  basic: ['ic-function', 'ic-integral'],
  geometry: ['ic-geometry', 'ic-square', 'ic-cube', 'ic-coordinate', 'ic-triangle'],
  advanced: ['ic-matrix', 'ic-vector'],
  statistics: ['ic-chart-bar', 'ic-chart-line', 'ic-dice', 'ic-bell-curve'],
  specialized: ['ic-number', 'ic-network', 'ic-logic', 'ic-money', 'ic-tree', 'ic-graph'],
} as const;

// Icon descriptions for documentation
export const ICON_DESCRIPTIONS = {
  'ic-tools': 'General tools and utilities',
  'ic-calculator': 'Mathematical calculators',
  'ic-converter': 'Unit and format converters',
  'ic-solver': 'Equation and problem solvers',
  'ic-generator': 'Number and pattern generators',
  'ic-function': 'Functions and algebra',
  'ic-integral': 'Calculus and advanced math',
  'ic-geometry': 'Geometric shapes and calculations',
  'ic-square': 'Plane geometry',
  'ic-cube': 'Spatial geometry',
  'ic-coordinate': 'Coordinate systems',
  'ic-triangle': 'Trigonometry',
  'ic-matrix': 'Linear algebra and matrices',
  'ic-vector': 'Vector operations',
  'ic-chart-bar': 'Statistical charts',
  'ic-chart-line': 'Graphs and functions',
  'ic-dice': 'Probability and randomness',
  'ic-bell-curve': 'Probability distributions',
  'ic-number': 'Number theory',
  'ic-network': 'Graph theory and networks',
  'ic-logic': 'Mathematical logic',
  'ic-money': 'Financial mathematics',
  'ic-tree': 'Combinatorics and trees',
  'ic-graph': 'Graph algorithms',
} as const;
