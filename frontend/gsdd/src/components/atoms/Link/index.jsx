import React from 'react'
import * as S from "./styles";

const Link = ({ styleType, children, href }) => {
    
  const props = {
    styleType,
    href
  }

  if (styleType === "NextLink") return <S.NextLink {...props}>{children}</S.NextLink>;
  else return <></>;

}

export default Link;