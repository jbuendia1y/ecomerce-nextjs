export interface Paginate<T> {
  data: Array<T>;
  meta: {
    pagination: {
      page: number; // page number
      pageSize: number; // items in the page
      pageCount: number; // total pages
      total: number; // total items in database
    };
  };
}

export interface StrapiImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  width: number;
  height: number;
  url: string;
  formats: Record<
    "thumbnail" | "small" | "medium",
    { name: string; url: string }
  >;
}

export type StrapiUser = {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  provider: "local" | "google";
};

export type StrapiLoginResponse = {
  jwt: string;
  user: StrapiUser;
};

export type StrapiError = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};
