import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgIcon } from 'src/components/svg-icon';

// ----------------------------------------------------------------------

const icon = (name: string) => (
    <SvgIcon src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
    home: icon('ic-home'), // Trang chủ
    demo: icon('ic-demo'), // Biểu tượng demo

    // Công cụ toán học cơ bản
    calculator: icon('ic-calculator'), // Máy tính cơ bản
    converter: icon('ic-converter'), // Công cụ chuyển đổi
    generator: icon('ic-generator'), // Trình tạo

    // Số học và Đại số cơ bản
    arithmetic: icon('ic-arithmetic'), // Số học cơ bản
    algebra: icon('ic-algebra'), // Đại số cơ bản

    // Hàm số và Đại số nâng cao
    function: icon('ic-function'), // Hàm số và đồ thị
    matrix: icon('ic-matrix'), // Đại số tuyến tính
    equation: icon('ic-equation'), // Giải phương trình nâng cao

    // Giải tích
    calculus: icon('ic-calculus'), // Công cụ giải tích

    // Hình học và lượng giác
    plane: icon('ic-plane'), // Hình học mặt phẳng
    spatial: icon('ic-cube'), // Hình học không gian
    coordinate: icon('ic-coordinate'), // Hình học tọa độ
    trigonometry: icon('ic-triangle'), // Lượng giác cơ bản

    // Thống kê và xác suất
    chart: icon('ic-chart'), // Biểu đồ và dữ liệu
    statistics: icon('ic-statistics'), // Thống kê mô tả
    probability: icon('ic-probability'), // Xác suất cơ bản
    distribution: icon('ic-distribution'), // Phân phối xác suất
    solver: icon('ic-equation'), // Solver (sử dụng icon equation)
};

// ----------------------------------------------------------------------

type WorkspaceType = 'all-tools' | 'algebra' | 'statistics' | 'geometry';

interface NavDataOptions {
    workspace?: WorkspaceType;
    userAccess?: string[];
}

export function getNavData(
    t: (key: string) => string,
    options: NavDataOptions = {}
): NavSectionProps['data'] {
    const { workspace = 'all-tools', userAccess = [] } = options;

    // Kiểm tra biến môi trường để hiển thị menu Demo
    const showDemoMenu = process.env.NEXT_PUBLIC_SHOW_DEMO_MENU === 'true';

    const homeAndDemoItems: any[] = [
        {
            title: t('nav.home'),
            path: paths.dashboard.root,
            icon: ICONS.home,
        },
    ];

    // Chỉ thêm menu Demo nếu biến môi trường được bật
    if (showDemoMenu) {
        homeAndDemoItems.push({
            title: 'Demo',
            path: paths.dashboard.demo.root,
            icon: ICONS.demo,
            children: [
                {
                    title: 'Demo 01',
                    path: paths.dashboard.demo.demo01,
                },
                {
                    title: 'Demo 02',
                    path: paths.dashboard.demo.demo02,
                },
            ],
        });
    }

    const allNavData = [
        /**
         * Trang chủ và Demo
         */
        {
            items: homeAndDemoItems,
        },
        /**
         * Công cụ toán học cơ bản
         */
        {
            subheader: t('nav.sections.basicTools'),
            items: [
                {
                    title: t('nav.tools.calculators.root'),
                    path: paths.dashboard.tools.calculators.root,
                    icon: ICONS.calculator,
                    children: [
                        {
                            title: t('nav.tools.calculators.basic'),
                            path: paths.dashboard.tools.calculators.basic,
                        },
                        {
                            title: t('nav.tools.calculators.scientific'),
                            path: paths.dashboard.tools.calculators.scientific,
                        },
                        {
                            title: t('nav.tools.calculators.graphing'),
                            path: paths.dashboard.tools.calculators.graphing,
                        },
                        {
                            title: t('nav.tools.calculators.complex'),
                            path: paths.dashboard.tools.calculators.complex,
                        },
                    ],
                },
                {
                    title: t('nav.tools.converters.root'),
                    path: paths.dashboard.tools.converters.root,
                    icon: ICONS.converter,
                    children: [
                        {
                            title: t('nav.tools.converters.units'),
                            path: paths.dashboard.tools.converters.units,
                        },
                    ],
                },
                {
                    title: t('nav.tools.generators.root'),
                    path: paths.dashboard.tools.generators.root,
                    icon: ICONS.generator,
                    children: [
                        {
                            title: t('nav.tools.generators.random'),
                            path: paths.dashboard.tools.generators.random,
                        },
                        {
                            title: t('nav.tools.generators.fibonacci'),
                            path: paths.dashboard.tools.generators.fibonacci,
                        },
                        {
                            title: t('nav.tools.generators.pattern'),
                            path: paths.dashboard.tools.generators.pattern,
                        },
                    ],
                },
            ],
        },
        /**
         * Số học và Đại số cơ bản
         */
        {
            subheader: t('nav.sections.arithmeticAlgebra'),
            items: [
                {
                    title: t('nav.arithmetic.root'),
                    path: paths.dashboard.arithmetic.root,
                    icon: ICONS.arithmetic,
                    children: [
                        {
                            title: t('nav.arithmetic.baseConversion'),
                            path: paths.dashboard.arithmetic.baseConversion,
                        },
                        {
                            title: t('nav.arithmetic.commonDenominator'),
                            path: paths.dashboard.arithmetic.commonDenominator,
                        },
                        {
                            title: t('nav.arithmetic.divisionRemainder'),
                            path: paths.dashboard.arithmetic.divisionRemainder,
                        },
                        {
                            title: t('nav.arithmetic.primeNumbers'),
                            path: paths.dashboard.arithmetic.primeNumbers,
                        },
                        {
                            title: t('nav.arithmetic.factorsIrrationals'),
                            path: paths.dashboard.arithmetic.factorsIrrationals,
                        },
                        {
                            title: t('nav.arithmetic.divisorsMultiples'),
                            path: paths.dashboard.arithmetic.divisorsMultiples,
                        },
                        {
                            title: t('nav.arithmetic.fractions'),
                            path: paths.dashboard.arithmetic.fractions,
                        },
                    ],
                },
                {
                    title: t('nav.algebra.basic.root'),
                    path: paths.dashboard.algebra.basic.root,
                    icon: ICONS.algebra,
                    children: [
                        {
                            title: t('nav.algebra.basic.expressions'),
                            path: paths.dashboard.algebra.basic.expressions,
                        },
                        {
                            title: t('nav.algebra.basic.equations'),
                            path: paths.dashboard.algebra.basic.equations,
                        },
                        {
                            title: t('nav.algebra.basic.inequalities'),
                            path: paths.dashboard.algebra.basic.inequalities,
                        },
                        {
                            title: t('nav.algebra.basic.factoring'),
                            path: paths.dashboard.algebra.basic.factoring,
                        },
                        {
                            title: t('nav.algebra.basic.polynomials'),
                            path: paths.dashboard.algebra.basic.polynomials,
                        },
                    ],
                },
            ],
        },
        /**
         * Hàm số và Đại số nâng cao
         */
        {
            subheader: t('nav.sections.functionsAdvancedAlgebra'),
            items: [
                {
                    title: t('nav.algebra.functions.root'),
                    path: paths.dashboard.algebra.functions.root,
                    icon: ICONS.function,
                    children: [
                        {
                            title: t('nav.algebra.functions.linear'),
                            path: paths.dashboard.algebra.functions.linear,
                        },
                        {
                            title: t('nav.algebra.functions.quadratic'),
                            path: paths.dashboard.algebra.functions.quadratic,
                        },
                        {
                            title: t('nav.algebra.functions.polynomial'),
                            path: paths.dashboard.algebra.functions.polynomial,
                        },
                        {
                            title: t('nav.algebra.functions.rational'),
                            path: paths.dashboard.algebra.functions.rational,
                        },
                        {
                            title: t('nav.algebra.functions.exponential'),
                            path: paths.dashboard.algebra.functions.exponential,
                        },
                        {
                            title: t('nav.algebra.functions.logarithmic'),
                            path: paths.dashboard.algebra.functions.logarithmic,
                        },
                        {
                            title: t('nav.algebra.functions.trigonometric'),
                            path: paths.dashboard.algebra.functions.trigonometric,
                        },
                        {
                            title: t('nav.algebra.functions.inverse'),
                            path: paths.dashboard.algebra.functions.inverse,
                        },
                        {
                            title: t('nav.algebra.functions.composite'),
                            path: paths.dashboard.algebra.functions.composite,
                        },
                    ],
                },
                {
                    title: t('nav.algebra.linear.root'),
                    path: paths.dashboard.algebra.linear.root,
                    icon: ICONS.matrix,
                    children: [
                        {
                            title: t('nav.algebra.linear.matrix'),
                            path: paths.dashboard.algebra.linear.matrix,
                        },
                        {
                            title: t('nav.algebra.linear.system'),
                            path: paths.dashboard.algebra.linear.system,
                        },
                    ],
                },
                {
                    title: t('nav.solvers.root'),
                    path: paths.dashboard.tools.solvers.root,
                    icon: ICONS.solver,
                    children: [
                        {
                            title: t('nav.solvers.differential'),
                            path: paths.dashboard.tools.solvers.differential,
                        },
                        {
                            title: t('nav.solvers.optimization'),
                            path: paths.dashboard.tools.solvers.optimization,
                        },
                    ],
                },
            ],
        },
        /**
         * Giải tích
         */
        {
            subheader: t('nav.sections.calculus'),
            items: [
                {
                    title: t('nav.calculus.root'),
                    path: paths.dashboard.calculus.root,
                    icon: ICONS.calculus,
                    children: [
                        {
                            title: t('nav.calculus.derivative'),
                            path: paths.dashboard.calculus.derivative,
                        },
                        {
                            title: t('nav.calculus.integral'),
                            path: paths.dashboard.calculus.integral,
                        },
                        {
                            title: t('nav.calculus.limit'),
                            path: paths.dashboard.calculus.limit,
                        },
                        {
                            title: t('nav.calculus.sequence'),
                            path: paths.dashboard.calculus.sequence,
                        },
                    ],
                },
            ],
        },
        /**
         * Hình học và lượng giác
         */
        {
            subheader: t('nav.sections.geometryTrigonometry'),
            items: [
                {
                    title: t('nav.geometry.plane.root'),
                    path: paths.dashboard.geometry.plane.root,
                    icon: ICONS.plane,
                    children: [
                        {
                            title: t('nav.geometry.plane.pointsSegments'),
                            path: paths.dashboard.geometry.plane.pointsSegments,
                        },
                        {
                            title: t('nav.geometry.plane.lines'),
                            path: paths.dashboard.geometry.plane.lines,
                        },
                        {
                            title: t('nav.geometry.plane.angles'),
                            path: paths.dashboard.geometry.plane.angles,
                        },
                        {
                            title: t('nav.geometry.plane.triangles'),
                            path: paths.dashboard.geometry.plane.triangles,
                        },
                        {
                            title: t('nav.geometry.plane.quadrilaterals'),
                            path: paths.dashboard.geometry.plane.quadrilaterals,
                        },
                        {
                            title: t('nav.geometry.plane.polygons'),
                            path: paths.dashboard.geometry.plane.polygons,
                        },
                        {
                            title: t('nav.geometry.plane.circles'),
                            path: paths.dashboard.geometry.plane.circles,
                        },
                        {
                            title: t('nav.geometry.plane.conics'),
                            path: paths.dashboard.geometry.plane.conics,
                        },
                    ],
                },
                {
                    title: t('nav.geometry.spatial.root'),
                    path: paths.dashboard.geometry.spatial.root,
                    icon: ICONS.spatial,
                    children: [
                        {
                            title: t('nav.geometry.spatial.prisms'),
                            path: paths.dashboard.geometry.spatial.prisms,
                        },
                        {
                            title: t('nav.geometry.spatial.pyramids'),
                            path: paths.dashboard.geometry.spatial.pyramids,
                        },
                        {
                            title: t('nav.geometry.spatial.cylinders'),
                            path: paths.dashboard.geometry.spatial.cylinders,
                        },
                        {
                            title: t('nav.geometry.spatial.cones'),
                            path: paths.dashboard.geometry.spatial.cones,
                        },
                        {
                            title: t('nav.geometry.spatial.spheres'),
                            path: paths.dashboard.geometry.spatial.spheres,
                        },
                        {
                            title: t('nav.geometry.spatial.surfaces'),
                            path: paths.dashboard.geometry.spatial.surfaces,
                        },
                    ],
                },
                {
                    title: t('nav.geometry.coordinate.root'),
                    path: paths.dashboard.geometry.coordinate.root,
                    icon: ICONS.coordinate,
                    children: [
                        {
                            title: t('nav.geometry.coordinate.cartesian'),
                            path: paths.dashboard.geometry.coordinate.cartesian,
                        },
                        {
                            title: t('nav.geometry.coordinate.polar'),
                            path: paths.dashboard.geometry.coordinate.polar,
                        },
                        {
                            title: t('nav.geometry.coordinate.parametric'),
                            path: paths.dashboard.geometry.coordinate.parametric,
                        },
                        {
                            title: t('nav.geometry.coordinate.vectors'),
                            path: paths.dashboard.geometry.coordinate.vectors,
                        },
                    ],
                },
                {
                    title: t('nav.trigonometry.basic.root'),
                    path: paths.dashboard.trigonometry.basic.root,
                    icon: ICONS.trigonometry,
                    children: [
                        {
                            title: t('nav.trigonometry.basic.ratios'),
                            path: paths.dashboard.trigonometry.basic.ratios,
                        },
                        {
                            title: t('nav.trigonometry.basic.identities'),
                            path: paths.dashboard.trigonometry.basic.identities,
                        },
                        {
                            title: t('nav.trigonometry.basic.equations'),
                            path: paths.dashboard.trigonometry.basic.equations,
                        },
                        {
                            title: t('nav.trigonometry.basic.graphs'),
                            path: paths.dashboard.trigonometry.basic.graphs,
                        },
                    ],
                },
            ],
        },
        /**
         * Thống kê và xác suất
         */
        {
            subheader: t('nav.sections.statisticsProbability'),
            items: [
                {
                    title: t('nav.statistics.charts.root'),
                    path: paths.dashboard.statistics.charts.root,
                    icon: ICONS.chart,
                    children: [
                        {
                            title: t('nav.statistics.charts.pictograph'),
                            path: paths.dashboard.statistics.charts.pictograph,
                        },
                        {
                            title: t('nav.statistics.charts.line'),
                            path: paths.dashboard.statistics.charts.line,
                        },
                        {
                            title: t('nav.statistics.charts.area'),
                            path: paths.dashboard.statistics.charts.area,
                        },
                        {
                            title: t('nav.statistics.charts.singleColumn'),
                            path: paths.dashboard.statistics.charts.singleColumn,
                        },
                        {
                            title: t('nav.statistics.charts.doubleColumn'),
                            path: paths.dashboard.statistics.charts.doubleColumn,
                        },
                        {
                            title: t('nav.statistics.charts.stackedColumn'),
                            path: paths.dashboard.statistics.charts.stackedColumn,
                        },
                        {
                            title: t('nav.statistics.charts.pie'),
                            path: paths.dashboard.statistics.charts.pie,
                        },
                        {
                            title: t('nav.statistics.charts.frequencyTable'),
                            path: paths.dashboard.statistics.charts.frequencyTable,
                        },
                        {
                            title: t('nav.statistics.charts.histogram'),
                            path: paths.dashboard.statistics.charts.histogram,
                        },
                        {
                            title: t('nav.statistics.charts.boxplot'),
                            path: paths.dashboard.statistics.charts.boxplot,
                        },
                        {
                            title: t('nav.statistics.charts.scatter'),
                            path: paths.dashboard.statistics.charts.scatter,
                        },
                    ],
                },
                {
                    title: t('nav.statistics.descriptive.root'),
                    path: paths.dashboard.statistics.descriptive.root,
                    icon: ICONS.statistics,
                    children: [
                        {
                            title: t('nav.statistics.descriptive.centralTendency'),
                            path: paths.dashboard.statistics.descriptive.centralTendency,
                        },
                        {
                            title: t('nav.statistics.descriptive.dispersion'),
                            path: paths.dashboard.statistics.descriptive.dispersion,
                        },
                        {
                            title: t('nav.statistics.descriptive.distribution'),
                            path: paths.dashboard.statistics.descriptive.distribution,
                        },
                        {
                            title: t('nav.statistics.descriptive.correlation'),
                            path: paths.dashboard.statistics.descriptive.correlation,
                        },
                        {
                            title: t('nav.statistics.descriptive.regression'),
                            path: paths.dashboard.statistics.descriptive.regression,
                        },
                    ],
                },
                {
                    title: t('nav.statistics.probability.root'),
                    path: paths.dashboard.statistics.probability.root,
                    icon: ICONS.probability,
                    children: [
                        {
                            title: t('nav.statistics.probability.basic'),
                            path: paths.dashboard.statistics.probability.basic,
                        },
                        {
                            title: t('nav.statistics.probability.conditional'),
                            path: paths.dashboard.statistics.probability.conditional,
                        },
                        {
                            title: t('nav.statistics.probability.bayes'),
                            path: paths.dashboard.statistics.probability.bayes,
                        },
                    ],
                },
                {
                    title: t('nav.statistics.distributions.root'),
                    path: paths.dashboard.statistics.distributions.root,
                    icon: ICONS.distribution,
                    children: [
                        {
                            title: t('nav.statistics.distributions.discrete'),
                            path: paths.dashboard.statistics.distributions.discrete,
                        },
                        {
                            title: t('nav.statistics.distributions.continuous'),
                            path: paths.dashboard.statistics.distributions.continuous,
                        },
                        {
                            title: t('nav.statistics.distributions.normal'),
                            path: paths.dashboard.statistics.distributions.normal,
                        },
                        {
                            title: t('nav.statistics.distributions.binomial'),
                            path: paths.dashboard.statistics.distributions.binomial,
                        },
                    ],
                },
            ],
        },
    ];

    // Filter navigation data based on workspace
    if (!workspace || workspace === 'all-tools') {
        // For all-tools workspace, filter based on user access
        if (userAccess.length === 0) {
            // If no access specified, show all sections (fallback for backward compatibility)
            return allNavData;
        }

        const accessibleData = allNavData.filter((section) => {
            const sectionKey = section.subheader;

            // Trang chủ luôn hiển thị
            if (!sectionKey) {
                return true;
            }

            // Basic Math Tools is always accessible
            if (sectionKey === t('nav.sections.basicTools')) {
                return true;
            }

            // Check access for each section
            if (
                userAccess.includes('algebra') &&
                [
                    t('nav.sections.arithmeticAlgebra'),
                    t('nav.sections.functionsAdvancedAlgebra'),
                    t('nav.sections.calculus'),
                ].includes(sectionKey)
            ) {
                return true;
            }

            if (
                userAccess.includes('statistics') &&
                [t('nav.sections.statisticsProbability')].includes(sectionKey)
            ) {
                return true;
            }

            if (
                userAccess.includes('geometry') &&
                [t('nav.sections.geometryTrigonometry')].includes(sectionKey)
            ) {
                return true;
            }

            return false;
        });

        return accessibleData;
    }

    const filteredData = allNavData.filter((section) => {
        const sectionKey = section.subheader;

        // Trang chủ luôn hiển thị
        if (!sectionKey) {
            return true;
        }

        // Basic Math Tools is common for all workspaces
        if (sectionKey === t('nav.sections.basicTools')) {
            return true;
        }

        // Filter based on workspace
        switch (workspace) {
            case 'algebra':
                return [
                    t('nav.sections.arithmeticAlgebra'),
                    t('nav.sections.functionsAdvancedAlgebra'),
                    t('nav.sections.calculus'),
                ].includes(sectionKey);

            case 'statistics':
                return [t('nav.sections.statisticsProbability')].includes(sectionKey);

            case 'geometry':
                return [t('nav.sections.geometryTrigonometry')].includes(sectionKey);

            default:
                return false;
        }
    });

    return filteredData;
}

// Backward compatibility - export a default navData using Vietnamese
export const navData: NavSectionProps['data'] = getNavData(
    (key: string) =>
        // This is a fallback when using navData directly without translation context
        // In actual usage, getNavData should be called with proper translation function
        key.split('.').pop() || key,
    { workspace: 'all-tools' }
);
