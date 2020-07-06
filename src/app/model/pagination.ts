export interface Pagination<T = any> {
  content: T[],
  totalPages: number,
  totalElements: number,
  last: boolean,
  first: boolean,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  size: number,
  number: number,
  numberOfElements: number,
  empty: boolean
}