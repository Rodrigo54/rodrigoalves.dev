import Image from 'next/image';
import React from 'react';
import * as S from './styles';

type Props = {
  title?: string;
  subtitle?: string;
  image?: string;
  alt?: string;
  children: React.ReactNode;
};

const PaperLayout: React.FC<Props> = ({
  title,
  subtitle,
  image = '/img/post-bg-01.jpg',
  alt,
  children,
}) => {
  return (
    <S.PaperWrapper>
      <S.Thumbnail>
        <Image alt={alt ?? 'Featured Image'} src={image} fill priority />
      </S.Thumbnail>
      <S.PaperBox>
        <S.Header>
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </S.Header>
        <S.PaperContent>{children}</S.PaperContent>
      </S.PaperBox>
    </S.PaperWrapper>
  );
};

export default PaperLayout;
