import styled from 'styled-components';
import List from './List';
import { pxToRem } from '../styles/utils';

const Gallery = styled(List)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
  grid-gap: 0.5rem;
  grid-auto-rows: ${pxToRem(260)};
  grid-auto-flow: dense;
`;

export default Gallery;
