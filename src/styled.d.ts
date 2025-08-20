import "styled-components";
import { globalTheme } from "./theme";

type GlobalThemeType = typeof globalTheme;

declare module "styled-components" {
  export interface DefaultTheme extends GlobalThemeType {}
}
