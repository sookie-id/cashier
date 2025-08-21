import "styled-components";
import { appTheme } from "./theme";

type GlobalThemeType = typeof appTheme;

declare module "styled-components" {
  export interface DefaultTheme extends GlobalThemeType {}
}
