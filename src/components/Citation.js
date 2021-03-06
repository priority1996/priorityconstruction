import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Citation = ({ tag: Tag, children, ...rest }) => (
  <Tag {...rest}>
    <cite>{children}</cite>
  </Tag>
);

Citation.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
};

Citation.defaultProps = {
  tag: 'footer',
};

Citation.displayName = 'Citation';

export default styled(Citation)``;
