const USER_ID_TO_ROLE_MAPPER: Record<number, string> = {
  1: 'Podstawowy użytkownik',
  2: 'Administrator',
};

export function getRoleName(roleId: number): string {
  return USER_ID_TO_ROLE_MAPPER[roleId];
}
