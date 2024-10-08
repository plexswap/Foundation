import { vars } from "@plexswap/style";
import { darkColors, lightColors } from "../../theme/colors";
import { CardTheme } from "./types";

export const light: CardTheme = {
  background: lightColors.backgroundAlt,
  boxShadow: vars.shadows.level1,
  boxShadowActive: vars.shadows.active,
  boxShadowSuccess: vars.shadows.success,
  boxShadowWarning: vars.shadows.warning,
  cardHeaderBackground: {
    default: lightColors.gradientCardHeader,
    blue: lightColors.gradientBlue,
    cloudyday: lightColors.gradientCloudyday,
    violet: lightColors.gradientViolet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};

export const dark: CardTheme = {
  background: darkColors.backgroundAlt,
  boxShadow: vars.shadows.level1,
  boxShadowActive: vars.shadows.active,
  boxShadowSuccess: vars.shadows.success,
  boxShadowWarning: vars.shadows.warning,
  cardHeaderBackground: {
    default: darkColors.gradientCardHeader,
    blue: darkColors.gradientBlue,
    cloudyday: lightColors.gradientCloudyday,
    violet: darkColors.gradientViolet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
