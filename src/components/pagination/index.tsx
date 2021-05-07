import getThemeColor from '@utils/getThemeColor';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React from 'react';

import * as S from './styles';

type Props = {
  isFirst?: boolean,
  isLast?: boolean,
  currentPage?: number,
  numPages?: number,
  prevPage?: string,
  nextPage?: string,
  children?: React.ReactNode,
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
          <AniLink
            to={prevPage}
            cover={true}
            direction='left'
            bg={getThemeColor()}
            duration={0.6}
          >
            ← Página Anterior
          </AniLink>
        )}
        <p>
          {currentPage} de {numPages}
        </p>
        {!isLast && (
          <AniLink
            to={nextPage}
            cover={true}
            direction='right'
            bg={getThemeColor()}
            duration={0.6}
          >
            Proxima Página →
          </AniLink>
        )}
      </>
    );
  }
  return (
    <S.PaginationWrapper>
      {content}
    </S.PaginationWrapper>
  );
}

export default Pagination;
