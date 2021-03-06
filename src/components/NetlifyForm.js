import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input, { StyledTextarea } from './Input';
import Button from './Button';
import Label from './Label';
import VisuallyHidden from './VisuallyHidden';
import Recaptcha from './Recaptcha';
import { pxToRem } from '../styles/utils';

const NetlifyForm = ({ name, children, handleChange, ...rest }) => (
  <form data-netlify="true" data-netlify-recaptcha="true" method="POST" name={name} {...rest}>
    <input type="hidden" name="form-name" value={name} />
    <noscript>Sorry. This form requires JavaScript.</noscript>
    {children}
  </form>
);

NetlifyForm.displayName = 'NetlifyForm';

NetlifyForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  children: PropTypes.node,
};

const StyledNetlifyForm = styled(NetlifyForm)`
  ${Input} {
    width: 100%;
  }

  ${StyledTextarea} {
    min-height: ${pxToRem(250)};
  }

  ${Label} {
    &:not(:first-of-type) {
      margin-top: 0.75rem;
    }
  }

  ${VisuallyHidden} ${Label} {
    margin-top: 0.75rem;
  }

  ${Button}, ${Recaptcha}, fieldset {
    margin-top: 0.75rem;
  }
`;

export default StyledNetlifyForm;
