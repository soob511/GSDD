import styled, { css } from "styled-components";

export const StyledMapContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledButtonVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  overflow:auto;
`;

export const StyledButtonHorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  overflow:auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

