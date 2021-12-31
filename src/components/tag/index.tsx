import React from 'react';
import { TagsList } from '@model/tags';

import * as S from './styles';

type Props = {
  tag: string;
};

const PostTag: React.FC<Props> = ({ tag }) => {
  return <S.PostTag color={TagsList[tag] ?? '#2196f3'}>{tag}</S.PostTag>;
};

export default PostTag;
