export type PaginationProps = {
    currentPage:number,
    totalPages:number,
    onPageChange:(e:number)=>void
}