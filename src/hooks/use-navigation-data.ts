import { useMemo } from 'react';

import type { NavSectionProps } from 'src/components/nav-section';

import { useWorkspaceContext } from 'src/contexts/workspace-context';

// ----------------------------------------------------------------------

export function useNavigationData(baseNavData: NavSectionProps['data']) {
  const { currentWorkspace, isAllTools } = useWorkspaceContext();

  return useMemo(() => {
    // Luôn hiển thị phần "Công cụ toán học"
    const toolsSection = baseNavData.find((section) => section.subheader === 'Công cụ toán học');

    if (isAllTools) {
      // Hiển thị toàn bộ menu khi chọn "Tất cả công cụ toán học"
      return baseNavData;
    }

    // Filter dựa trên workspace hiện tại
    const filteredData: NavSectionProps['data'] = [];

    // Luôn thêm "Công cụ toán học"
    if (toolsSection) {
      filteredData.push(toolsSection);
    }

    // Thêm các section tương ứng với workspace
    if (currentWorkspace) {
      switch (currentWorkspace.id) {
        case 'algebra-analysis':
          // Hiển thị "Toán học cơ bản" cho workspace "Đại số và Giải tích"
          const basicMathSection = baseNavData.find(
            (section) => section.subheader === 'Toán học cơ bản'
          );
          if (basicMathSection) {
            filteredData.push(basicMathSection);
          }
          break;

        case 'geometry-measurement':
          // Hiển thị "Hình học và lượng giác" cho workspace "Hình học và Đo lường"
          const geometrySection = baseNavData.find(
            (section) => section.subheader === 'Hình học và lượng giác'
          );
          if (geometrySection) {
            filteredData.push(geometrySection);
          }
          break;

        case 'statistics-probability':
          // Hiển thị "Thống kê và xác suất" cho workspace "Xác suất và Thống kê"
          const statisticsSection = baseNavData.find(
            (section) => section.subheader === 'Thống kê và xác suất'
          );
          if (statisticsSection) {
            filteredData.push(statisticsSection);
          }
          break;

        default:
          // Mặc định hiển thị toàn bộ nếu không match workspace nào
          return baseNavData;
      }
    }

    return filteredData;
  }, [baseNavData, currentWorkspace, isAllTools]);
}
