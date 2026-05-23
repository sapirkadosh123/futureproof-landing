// Tiny class-name joiner — avoids pulling clsx as a dep.
export function clsx(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
