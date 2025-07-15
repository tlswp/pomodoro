/**
 * .
 * @param {React.RefObject<SVGPathElement>} pathRef - Time in milliseconds.
 */
export const TimerProgress = ({ pathRef }: { pathRef: React.RefObject<SVGPathElement> }) => {
  return (
    <svg
      width="322"
      height="280"
      viewBox="0 0 322 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g filter="url(#filter0_i_104_1036)">
        <path
          d="M58.4696 263.53C38.191 243.252 24.3811 217.415 18.7862 189.288C13.1914 161.161 16.0628 132.006 27.0375 105.511C38.0122 79.0156 56.5973 56.3697 80.4424 40.4369C104.288 24.5041 132.322 16 161 16C189.678 16 217.713 24.5041 241.558 40.4369C265.403 56.3697 283.988 79.0156 294.963 105.511C305.937 132.006 308.809 161.161 303.214 189.288C297.619 217.415 283.809 243.252 263.531 263.53"
          stroke="#E2E8F0"
          strokeWidth="32"
          strokeLinecap="round"
        />
      </g>
      <path
        ref={pathRef}
        d="M58.4696 263.53C38.191 243.252 24.3811 217.415 18.7862 189.288C13.1914 161.161 16.0628 132.006 27.0375 105.511C38.0122 79.0156 56.5973 56.3697 80.4424 40.4369C104.288 24.5041 132.322 16 161 16C189.678 16 217.713 24.5041 241.558 40.4369C265.403 56.3697 283.988 79.0156 294.963 105.511C305.937 132.006 308.809 161.161 303.214 189.288C297.619 217.415 283.809 243.252 263.531 263.53"
        stroke="url(#paint0_linear_104_1036)"
        strokeWidth="32"
        strokeLinecap="round"
        strokeDashoffset="683.2960205078125"
        strokeDasharray="683.2960205078125"
        // strokeDashoffset="791.68"
      />
      <defs>
        <filter
          id="filter0_i_104_1036"
          x="0"
          y="1.23978e-05"
          width="322"
          height="283.53"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_104_1036" />
        </filter>
        <linearGradient
          id="paint0_linear_104_1036"
          x1="263.531"
          y1="58.4695"
          x2="58.4696"
          y2="263.53"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#64748B" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
      </defs>
    </svg>
  );
};
