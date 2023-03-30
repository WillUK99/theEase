export enum UserRoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'SUPER' = 'SUPER',
}

export type UserRoles = keyof typeof UserRoleEnum;
