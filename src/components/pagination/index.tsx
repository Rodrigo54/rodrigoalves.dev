import { ArrowLeft } from '@styled-icons/fluentui-system-regular/ArrowLeft';
import { ArrowRight } from '@styled-icons/fluentui-system-regular/ArrowRight';
import Link from 'next/link';
import React from 'react';

import * as S from './styles';

type Props = {
  page?: number;
  total: number;
};

const Pagination: React.FC<Props> = ({ total, page = 1 }) => {
  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <S.PaginationWrapper>
      <S.FirstCol>
        {!isFirst && (
          <Link href={`/blog/page/${page - 1}`} passHref>
            <ArrowLeft size={18} />
            <span>Página Anterior</span>
          </Link>
        )}
      </S.FirstCol>
      <S.MiddleCol>
        <p>
          {page} de {total}
        </p>
      </S.MiddleCol>
      <S.LastCol>
        {!isLast && (
          <Link href={`/blog/page/${page + 1}`} passHref>
            <span>Proxima Página</span>
            <ArrowRight size={18} />
          </Link>
        )}
      </S.LastCol>
    </S.PaginationWrapper>
  );
};

export default Pagination;
