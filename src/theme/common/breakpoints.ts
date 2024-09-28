const mediaBreakpoints = {
  md: '768px',
} as const;

const devicesUp = {
  md: `(min-width: ${mediaBreakpoints.md})`,
};

export const breakpoints = (deviceWidth: keyof typeof mediaBreakpoints) =>
  `@media screen and ${devicesUp[deviceWidth]}`;
