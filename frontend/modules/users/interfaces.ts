export interface CreateAppUser {
  name: string;
  email: string;
  password: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  image: string | null;
  emailVerified: boolean;

  role?: "admin" | "deliveryman";
}

export type ExposedAppUser = Omit<AppUser, "password">;
