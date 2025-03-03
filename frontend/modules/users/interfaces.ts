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

export interface UpdateAppUser {
  image?: string | null;
  name?: string;

  email?: string;
  password?: string;

  emailVerified?: boolean;
  role?: AppUser["role"];
}

export type ExposedAppUser = Omit<AppUser, "password">;
