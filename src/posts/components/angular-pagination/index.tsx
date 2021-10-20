import { range } from 'lodash';
import React, { useState, useEffect } from 'react';
import * as S from './styles';

type PageType = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
};

type PagedItemType = {
  pager: PageType;
  list: number[];
};

const AngularPagination: React.FC = () => {
  function getPager(
    totalItems: number,
    currentPage = 1,
    pageSize = 10
  ): PageType {
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  function setPage(page: number, allItems: number[]): PagedItemType {
    const pager = getPager(allItems.length, page);
    return {
      pager,
      list: allItems.slice(pager.startIndex, pager.endIndex + 1),
    };
  }

  const createList = () => {
    const allItems = new Array(150).fill('').map((value, index) => index + 1);
    const list: PagedItemType[] = [];
    for (let index = 1; index <= 15; index++) {
      const pageItem = setPage(index, allItems);
      list.push(pageItem);
    }
    return list;
  };

  return (
    <S.PaginationColumn>
      {createList().map((item) => {
        return (
          <S.PaginationRow key={item.pager.currentPage}>
            {item.pager.pages.map((page) => {
              const stringPage = page.toFixed().padStart(2, '0');
              if (item.pager.currentPage === page) {
                return <S.PageStrong key={page}>{stringPage}</S.PageStrong>;
              } else {
                return <S.PageSpan key={page}>{stringPage}</S.PageSpan>;
              }
            })}
          </S.PaginationRow>
        );
      })}
    </S.PaginationColumn>
  );
};

export default AngularPagination;
