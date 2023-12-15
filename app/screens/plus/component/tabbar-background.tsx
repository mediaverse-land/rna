import { memo } from "react";
import { SvgCss } from "react-native-svg";
import { windowSize } from "../../../utils/window-size";

const {  width } = windowSize();

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${
  width / 3.3
} viewBox="0 0 390 119" fill="none">
  <g filter="url(#filter0_b_99_514)">
    <path d="M-2 0C150.475 49.0326 236.521 48.9644 391 0V119H-2V0Z" fill="#0E0E12" fill-opacity="0.5"/>
    <path d="M-1.5 118.5V0.685837C74.4505 25.0703 133.967 37.2574 193.749 37.2489C253.533 37.2403 313.549 25.0354 390.5 0.682833V118.5H-1.5Z" stroke="url(#paint0_linear_99_514)" stroke-opacity="0.7"/>
  </g>
  <defs>
    <filter id="filter0_b_99_514" x="-12" y="-10" width=${width} height=${
  width / 3.3
} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_99_514"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_99_514" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_99_514" x1="36.5" y1="-159.5" x2="297" y2="93" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CFCFFC"/>
      <stop offset="1" stop-color="#CFCFFC" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>`;

const SvgComponent = () => {
  return (
    <SvgCss
      style={{
        position: "absolute",
        bottom: -1,
      }}
      xml={xml}
      width={width}
      height={width / 3.3}
    />
  );
};


export const TabbarBackground = memo(SvgComponent)