import React from 'react'
import { StaticImage } from "gatsby-plugin-image"

import * as S from './styles';

const Avatar = ({ alt }) => {
  return (
    <S.AvatarWrapper>
      <StaticImage
        src="../../img/profile-photo.jpg"
        alt={alt}
        placeholder="blurred"
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
