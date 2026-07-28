/** Tiny classnames joiner — no dependency needed for a project this size. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
