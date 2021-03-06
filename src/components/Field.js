import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from './Label';
import Input, { StyledSelect } from './Input';

const isLabel = child => child.type.displayName === Label.displayName;
const isFormField = child => {
  if (child.type.displayName === Input.displayName) {
    return true;
  }
  return false;
};

const applyNameAs = (child, nameAs) => {
  if (!nameAs) {
    return child;
  }

  if (isLabel(child)) {
    return React.cloneElement(
      child,
      Object.assign(
        {
          htmlFor: nameAs,
        },
        child.props,
      ),
    );
  }

  if (isFormField(child)) {
    return React.cloneElement(
      child,
      Object.assign(
        {
          id: nameAs,
          name: nameAs,
        },
        child.props,
      ),
    );
  }
  return child;
};

export const Field = props => {
  const { tag: Tag, nameAs, children, stack, fragment, ...rest } = props;
  const renderedChildren = React.Children.map(children, child => applyNameAs(child, nameAs));
  if (fragment) {
    return <React.Fragment>{renderedChildren}</React.Fragment>;
  }
  return <Tag {...rest}>{renderedChildren}</Tag>;
};

Field.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  stack: PropTypes.bool,
  children: PropTypes.node,
  nameAs: PropTypes.string,
  fragment: PropTypes.bool,
};

Field.defaultProps = {
  tag: 'div',
};

Field.displayName = 'Field';

export default styled(Field)`
  display: flex;
  align-items: baseline;
  ${props => props.stack && 'flex-direction: column;'} margin-bottom: 1rem;

  ${Label} {
    ${props =>
      !props.stack &&
      `
      flex: 0 1 100px;
      max-width: 200px;
    `};
  }
  ${Input}, ${StyledSelect} {
    width: 100%;
  }
`;
