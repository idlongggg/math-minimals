import type { CSSObject } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Generates a background gradient CSS object.
 *
 * @param {BgGradientProps} props - The properties for the background gradient.
 * @param {string[]} props.images - The background images or gradients.
 * @param {string[]} [props.sizes] - The sizes of the background images.
 * @param {string[]} [props.positions] - The positions of the background images.
 * @param {string[]} [props.repeats] - The repeat settings for the background images.
 * @returns {CSSObject} The CSS object for the background gradient.
 *
 * @example
 * ...theme.mixins.bgGradient({
 *   images: [
 *     `linear-gradient(0deg, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)})`,
 *     `url(/assets/background/overlay.png)`,
 *   ],
 *   sizes: ['cover', '80px 80px'],
 *   positions: ['center', 'top right'],
 * });
 */
export type BgGradientProps = {
  images: string[];
  sizes?: string[];
  positions?: string[];
  repeats?: string[];
};

export function bgGradient({
  sizes,
  repeats,
  images,
  positions,
}: BgGradientProps): CSSObject {
  return {
    backgroundImage: images?.join(', '),
    backgroundSize: sizes?.join(', ') ?? 'cover',
    backgroundRepeat: repeats?.join(', ') ?? 'no-repeat',
    backgroundPosition: positions?.join(', ') ?? 'center',
  };
}

// ----------------------------------------------------------------------

/**
 * Generates a background blur CSS object.
 *
 * @param {BgBlurProps} props - The properties for the background blur.
 * @param {string} props.color - The background color.
 * @param {number} [props.blur=6] - The blur intensity.
 * @param {string} [props.imgUrl] - The background image URL.
 * @returns {CSSObject} The CSS object for the background blur.
 *
 * @example
 * ...theme.mixins.bgBlur({
 *   color: varAlpha(theme.vars.palette.background.paperChannel, 0.8),
 *   imgUrl: '/assets/background/overlay.png',
 *   blur: 6,
 * });
 */
export type BgBlurProps = {
  color: string;
  blur?: number;
  imgUrl?: string;
};

export function bgBlur({ color, blur = 6, imgUrl }: BgBlurProps): CSSObject {
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imgUrl})`,
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
      },
    };
  }
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
  };
}

// Windows 11 Fluent Design Acrylic Material
// ----------------------------------------------------------------------

type AcrylicProps = {
  tint: string;
  opacity?: number;
  luminosity?: number;
  blur?: number;
  noiseOpacity?: number;
};

export function acrylicMaterial({
  tint,
  opacity = 0.85,
  luminosity = 0.96,
  blur = 30,
  noiseOpacity = 0.02,
}: AcrylicProps): CSSObject {
  return {
    position: 'relative',
    backdropFilter: `blur(${blur}px) saturate(${luminosity})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${luminosity})`,
    backgroundColor: tint,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: noiseOpacity,
      pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
      backgroundSize: '4px 4px',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: tint,
      opacity,
      pointerEvents: 'none',
    },
  };
}

// Enhanced blur for Windows 11 style
export function fluentBlur({
  color,
  blur = 20,
  imgUrl,
}: BgBlurProps): CSSObject {
  const base = {
    backdropFilter: `blur(${blur}px) saturate(1.2)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(1.2)`,
    backgroundColor: color,
  };

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imgUrl})`,
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        ...base,
      },
    };
  }
  return base;
}
