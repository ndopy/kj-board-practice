import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import type { Meta } from '@/types/post.ts';

interface PaginationProps {
  meta: Meta;
  page: number;
  onPageChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

export default function Pagination({ meta, page, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const currentPageGroup = Math.ceil(page / PAGE_GROUP_SIZE);
    let lastPageGroup = Math.ceil(meta.last_page / PAGE_GROUP_SIZE);
    if (lastPageGroup === 0) lastPageGroup = 1;

    const startPage = (currentPageGroup - 1) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, meta.last_page);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="mt-4 flex justify-center items-center">
      <ul
        className="flex items-center gap-2
        [&>li]:w-8 [&>li]:h-8 [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded-md
        [&>li]:transition-all [&>li]:duration-250 [&>li]:cursor-pointer
        [&>li:hover]:bg-green-600 [&>li:hover]:text-white"
      >
        <li className={page === 1 ? 'cursor-not-allowed' : ''}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="disabled:opacity-50 cursor-pointer"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-label="이전 페이지" />
          </button>
        </li>
        {getPageNumbers().map(pageNumber => (
          <li
            key={pageNumber}
            className={page === pageNumber ? 'bg-green-600 text-white' : ''}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        <li className={page === meta.last_page ? 'cursor-not-allowed' : ''}>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === meta.last_page}
            className="disabled:opacity-50 cursor-pointer"
          >
            <ArrowRightIcon className="h-4 w-4" aria-label="다음 페이지" />
          </button>
        </li>
      </ul>
    </div>
  );
}
