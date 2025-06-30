import type { CardProps, CardHeaderProps, CardContentProps } from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ----------------------------------------------------------------------

export type CustomCardProps = CardProps;
export type CustomCardContentProps = CardContentProps;
export type CustomCardHeaderProps = CardHeaderProps;

export function CustomCard(props: CustomCardProps) {
  return <Card {...props} />;
}

export function CustomCardContent(props: CustomCardContentProps) {
  return <CardContent {...props} />;
}

export function CustomCardHeader(props: CustomCardHeaderProps) {
  return <CardHeader {...props} />;
}
