import type { CardContentProps, CardHeaderProps, CardProps } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

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
