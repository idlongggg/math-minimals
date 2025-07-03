import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ApplicationConfig = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  authentication: {
    method: 'jwt';
    skipAuthForDevelopment: boolean;
    skipAuthCompletely: boolean;
    defaultRedirectPath: string;
  };
  mapboxApiKey: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ApplicationConfig = {
  appName: 'MathHub - Trung tâm Toán học Trực tuyến',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT ?? 'false'),
  /**
   * Cấu hình xác thực người dùng
   * @method jwt - Sử dụng JSON Web Token cho xác thực
   */
  authentication: {
    method: 'jwt',
    skipAuthForDevelopment: false,
    skipAuthCompletely: process.env.NEXT_PUBLIC_SKIP_AUTH === 'true' || false,
    defaultRedirectPath: paths.dashboard.root,
  },
  /**
   * API Key cho Mapbox (sử dụng trong các công cụ bản đồ)
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
};
