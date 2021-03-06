import Link from 'gatsby-link';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { COLORS } from '../styles/vars';

const MainNavLink = styled(Link)`
  position: relative;
  text-transform: uppercase;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 0;
    left: 0;
    bottom: ${pxToRem(-5)};
    background-color: ${COLORS.brand[1]};
    transition: all 0.3s ease;
  }

  ${({ selected }) =>
    selected &&
    `
    &::after {
      height: 3px;
    }
  `};

  @media (hover) {
    &:hover::after {
      height: 3px;
    }
  }
`;

MainNavLink.displayName = 'styled(MainNavLink)';

export default MainNavLink;
