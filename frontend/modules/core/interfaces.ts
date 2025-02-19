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
