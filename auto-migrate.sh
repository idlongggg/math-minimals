#!/bin/bash

# Script tự động migration các view files
# Chạy từ root directory của project

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Bắt đầu migration Dashboard Page Layout...${NC}"

# Array của các file cần migration
declare -a files=(
  "src/sections/arithmetic/division-with-remainder-view.tsx"
  "src/sections/arithmetic/divisors-multiples-view.tsx"
  "src/sections/arithmetic/factors-irrationals-view.tsx"
  "src/sections/calculus/derivative-view.tsx"
  "src/sections/calculus/integral-view.tsx"
  "src/sections/calculus/limit-view.tsx"
  "src/sections/calculus/sequence-view.tsx"
  "src/sections/charts/view/line-chart-view.tsx"
  "src/sections/algebra/linear/matrix-view.tsx"
  "src/sections/algebra/linear/system-view.tsx"
)

# Function để backup file
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "${file}.backup"
    echo -e "${GREEN}✅ Backup: $file${NC}"
  else
    echo -e "${RED}❌ File not found: $file${NC}"
    return 1
  fi
  return 0
}

# Function để migration file
migrate_file() {
  local file=$1
  echo -e "${YELLOW}🔄 Processing: $file${NC}"
  
  # Backup first
  if ! backup_file "$file"; then
    return 1
  fi
  
  # Check if file uses DashboardContent
  if grep -q "DashboardContent" "$file"; then
    echo -e "${BLUE}📝 Migrating DashboardContent in: $file${NC}"
    
    # Replace import
    sed -i 's/import { DashboardContent } from '\''src\/layouts\/dashboard'\'';/import { DashboardPageLayout } from '\''src\/components\/dashboard-page-layout'\'';/' "$file"
    
    # Check if file has tabs (look for CustomTabs)
    if grep -q "CustomTabs" "$file"; then
      echo -e "${BLUE}📑 File has tabs, using DashboardPageWithTabsLayout${NC}"
      sed -i 's/import { DashboardPageLayout } from '\''src\/components\/dashboard-page-layout'\'';/import { DashboardPageWithTabsLayout } from '\''src\/components\/dashboard-page-layout'\'';/' "$file"
    fi
    
    echo -e "${GREEN}✅ Completed: $file${NC}"
  else
    echo -e "${YELLOW}⚠️  No DashboardContent found in: $file${NC}"
  fi
}

# Main migration loop
echo -e "${BLUE}📋 Files to migrate:${NC}"
for file in "${files[@]}"; do
  echo "  - $file"
done
echo ""

read -p "Continue with migration? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Migration cancelled.${NC}"
  exit 1
fi

echo ""
for file in "${files[@]}"; do
  migrate_file "$file"
  echo ""
done

echo -e "${GREEN}🎉 Migration completed!${NC}"
echo ""
echo -e "${BLUE}📖 Next steps:${NC}"
echo "1. Review the migrated files"
echo "2. Update the layout structure manually for each file"
echo "3. Test the pages to ensure they work correctly"
echo "4. Remove backup files when satisfied"
echo ""
echo -e "${YELLOW}⚠️  Note: This script only handles basic import replacement.${NC}"
echo -e "${YELLOW}   You still need to update the JSX structure manually.${NC}"
