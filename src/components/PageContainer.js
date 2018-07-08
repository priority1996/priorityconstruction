import React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { TagPropType } from '../propTypes';

export const PageContainer = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

PageContainer.propTypes = {
  tag: TagPropType,
};

PageContainer.defaultProps = {
  tag: 'div',
};

PageContainer.displayName = 'PageContainer';

export default styled(PageContainer)`
  margin: 0 auto;
  max-width: ${pxToRem(960)};
  padding: 0px 1.0875rem 1.45rem;
`;
