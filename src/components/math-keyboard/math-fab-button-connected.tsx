'use client';

import { MathFabButton } from './math-fab-button';
import { useMathInput } from './math-input-context';

// ----------------------------------------------------------------------

export function MathFabButtonConnected() {
  const { insertSymbol } = useMathInput();

  return <MathFabButton onInsert={insertSymbol} />;
}
