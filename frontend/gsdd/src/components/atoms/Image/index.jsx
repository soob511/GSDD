import React from "react";
import styled from "styled-components";
import {prop} from "styled-tools";

const StyledImage = styled.img`
    // width: 100%;
    // height:100%;
    // background: blue;
    cursor: pointer;
    width: ${prop('width')}px;
    height:${prop('height')}px;
`

const Image = ({width, height, src}) => {
    const props = {
        src,
        width,
        height
    }

    return(
        <StyledImage {...props} />
    )
}

export default Image;