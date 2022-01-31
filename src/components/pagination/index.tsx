import { IosArrowLeft } from '@styled-icons/fluentui-system-regular/IosArrowLeft';
import { IosArrowRight } from '@styled-icons/fluentui-system-regular/IosArrowRight';
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
            <a>
              <IosArrowLeft size={18} />
              <span>Página Anterior</span>
            </a>
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
            <a>
              <span>Proxima Página</span>
              <IosArrowRight size={18} />
            </a>
          </Link>
        )}
      </S.LastCol>
    </S.PaginationWrapper>
  );
};

export default Pagination;
