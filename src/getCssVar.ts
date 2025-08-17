/**
 * Get the value of a CSS variable.
 * This function retrieves the value of a CSS variable from the document's root element.
 * It is useful for accessing design tokens or theme variables defined in CSS.
 * @param name - The name of the CSS variable to retrieve
 * @returns The value of the CSS variable, or an empty string if not found
 */
export function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}
