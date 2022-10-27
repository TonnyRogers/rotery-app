export function gOAuthPasswordGen(password: string): string {
  return `@${password.slice(0, 10)}!`;
}
