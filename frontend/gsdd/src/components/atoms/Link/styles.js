import styled, {css} from "styled-components";

export const Styles = css`
  cursor: pointer;
//   :hover {
//     color: #023CFF;
//   }
//   :active {
//     color: #023CFF;
//   }
`;

export const Text = css`
  cursor: pointer;  
  text-decoration: none;
    color: ${({ theme }) =>
    css`
      ${theme.colors['blue']}
    `};
  font-size: 20px;
  ${(props) => (props.href === '/logout') && css`
    color: ${({theme}) =>
    css`
      ${theme.colors['red']}
    `};
    flex-direction: column-reverse; 
  `}  
`
export const NextLink = styled.a`
  ${Styles};
`;

export const TextLink = styled.a`
  ${Text};
`
