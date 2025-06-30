#!/bin/bash
# Migration script to replace MUI components with custom components

echo "🚀 Starting Custom Components Migration..."

# Define search and replace patterns
declare -a patterns=(
  "s/import.*Card.*from '@mui\/material\/Card';/import { CustomCard, CustomCardContent, CustomCardHeader } from 'src\/components\/custom-card';/g"
  "s/import.*Button.*from '@mui\/material\/Button';/import { CustomButton } from 'src\/components\/custom-button';/g"  
  "s/import.*TextField.*from '@mui\/material\/TextField';/import { CustomTextField } from 'src\/components\/custom-text-field';/g"
  "s/import.*Alert.*from '@mui\/material\/Alert';/import { CustomAlert } from 'src\/components\/custom-alert';/g"
  "s/import.*Tab.*from '@mui\/material\/Tab';/import { CustomTab } from 'src\/components\/custom-tabs';/g"
  "s/<Card/<CustomCard/g"
  "s/<\/Card>/<\/CustomCard>/g"
  "s/<CardContent/<CustomCardContent/g"
  "s/<\/CardContent>/<\/CustomCardContent>/g"
  "s/<CardHeader/<CustomCardHeader/g"
  "s/<\/CardHeader>/<\/CustomCardHeader>/g"
  "s/<Button/<CustomButton/g"
  "s/<\/Button>/<\/CustomButton>/g"
  "s/<TextField/<CustomTextField/g"
  "s/<\/TextField>/<\/CustomTextField>/g"
  "s/<Alert/<CustomAlert/g"
  "s/<\/Alert>/<\/CustomAlert>/g"
  "s/<Tab/<CustomTab/g"
  "s/<\/Tab>/<\/CustomTab>/g"
)

# Apply patterns to all tsx files in sections
for pattern in "${patterns[@]}"; do
  echo "📝 Applying pattern: $pattern"
  find src/sections -name "*.tsx" -type f -exec sed -i "$pattern" {} \;
done

echo "✅ Migration completed!"
echo "⚠️  Please review changes and fix any import conflicts manually."
echo "🧪 Run tests to ensure everything works correctly."
