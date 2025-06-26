#!/bin/bash

# Script để migration các view sang sử dụng DashboardPageLayout mới

echo "🚀 Bắt đầu migration Dashboard Page Layout..."

# Danh sách các file cần migration
declare -a views=(
  "src/sections/arithmetic/base-conversion-view.tsx"
  "src/sections/arithmetic/common-denominator-view.tsx"
  "src/sections/arithmetic/division-with-remainder-view.tsx"
  "src/sections/arithmetic/divisors-multiples-view.tsx"
  "src/sections/arithmetic/factors-irrationals-view.tsx"
  "src/sections/calculus"
  "src/sections/algebra"
  "src/sections/charts"
)

# Function để backup file
backup_file() {
  local file=$1
  if [ -f "$file" ]; then
    cp "$file" "${file}.backup"
    echo "✅ Đã backup: $file"
  fi
}

# Function để check file có tồn tại không
check_file() {
  local file=$1
  if [ -f "$file" ]; then
    echo "📁 Tìm thấy: $file"
    return 0
  else
    echo "❌ Không tìm thấy: $file"
    return 1
  fi
}

echo ""
echo "📋 Checklist migration:"
echo "1. ✅ Đã tạo DashboardPageLayout"
echo "2. ✅ Đã tạo DashboardPageWithTabsLayout"
echo "3. ✅ Đã migration BlankView"
echo "4. ✅ Đã migration PictographView"
echo "5. ✅ Đã migration FractionView"
echo "6. ✅ Đã migration PrimeNumbersView"
echo ""

echo "🎯 Các bước migration cho file mới:"
echo ""
echo "1. Import layout component:"
echo "   import { DashboardPageLayout } from 'src/components/dashboard-page-layout';"
echo "   hoặc"
echo "   import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';"
echo ""
echo "2. Thay thế DashboardContent wrapper:"
echo "   Từ:"
echo "   return ("
echo "     <DashboardContent maxWidth=\"xl\">"
echo "       <Typography variant=\"h4\">Title</Typography>"
echo "       {content}"
echo "     </DashboardContent>"
echo "   );"
echo ""
echo "   Thành:"
echo "   return ("
echo "     <DashboardPageLayout title=\"Title\" description=\"Description\">"
echo "       {content}"
echo "     </DashboardPageLayout>"
echo "   );"
echo ""
echo "3. Đối với page có tabs, sử dụng DashboardPageWithTabsLayout"
echo ""

echo "📖 Xem chi tiết tại: src/components/dashboard-page-layout/README.md"

echo ""
echo "✨ Migration hoàn thành cho các file mẫu!"
echo "🔄 Tiếp tục apply cho các file còn lại theo pattern đã tạo."
