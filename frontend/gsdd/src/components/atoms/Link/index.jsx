import React from 'react'
import * as S from "./styles";

const Link = ({ styleType, children, href }) => {
    
  const props = {
    styleType,
    href
  }

  if (styleType === "NextLink") return <S.NextLink {...props}>{children}</S.NextLink>;
  else if (styleType === "TextLink") return <S.TextLink {...props}>{children}</S.TextLink>
  else return <></>;

}

export default Link;