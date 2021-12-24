import Link from 'next/link';
import React from 'react';

import * as S from './styles';

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  currentPage?: number;
  numPages?: number;
  prevPage?: number;
  nextPage?: number;
  children?: React.ReactNode;
};

const Pagination: React.FC<Props> = ({
  isFirst,
  isLast,
  currentPage,
  numPages,
  prevPage,
  nextPage,
  children,
}) => {
  let content: React.ReactNode;
  if (children) {
    content = children;
  } else {
    content = (
      <>
        {!isFirst && (
          <Link href={`/blog/page/${prevPage}`} passHref>
            <a>← Página Anterior</a>
          </Link>
        )}
        <p>
          {currentPage} de {numPages}
        </p>
        {!isLast && (
          <Link href={`/blog/page/${nextPage}`} passHref>
            <a>Proxima Página →</a>
          </Link>
        )}
      </>
    );
  }
  return <S.PaginationWrapper>{content}</S.PaginationWrapper>;
};

export default Pagination;
