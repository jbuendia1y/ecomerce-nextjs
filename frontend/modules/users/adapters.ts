import { AppUser, ExposedAppUser } from "./interfaces";

export const createAppUserExposed = (user: AppUser): ExposedAppUser => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userData } = user;
  // Remove the password property to ensure secure exposed user data
  return userData;
};
