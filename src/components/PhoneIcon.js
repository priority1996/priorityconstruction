import React from 'react';
import styled from 'styled-components';

export const PhoneIcon = props => (
  <svg viewBox="4.101 2.52 7.814 7.779" {...props}>
    <path
      d="M6.097,2.729l1.269,1.269c0.269,0.269,0.346,0.73,0.077,1L6.789,5.65l1.961,1.96l0.652-0.653
	c0.309-0.269,0.73-0.192,1,0.077l1.269,1.269c0.269,0.27,0.346,0.73,0.077,1l-0.73,0.691c-0.654,0.653-1.922,0.191-3.229-0.77
	C6.828,8.495,5.905,7.572,5.175,6.611C4.214,5.343,3.752,4.036,4.406,3.383l0.73-0.692C5.405,2.422,5.828,2.499,6.097,2.729z
	 M7.02,4.382L5.751,3.113C5.674,3.037,5.559,2.96,5.482,3.037l-0.73,0.73C4.329,4.19,4.791,5.228,5.598,6.304
	C6.29,7.227,7.174,8.11,8.096,8.803c1.076,0.807,2.114,1.268,2.576,0.846l0.691-0.73c0.077-0.039,0-0.192-0.039-0.23L10.018,7.38
	c-0.038-0.039-0.191-0.116-0.23-0.039l-1.037,1L6.059,5.65l1.038-1C7.135,4.574,7.058,4.42,7.02,4.382z"
    />
  </svg>
);

PhoneIcon.displayName = 'PhoneIcon';

export default styled(PhoneIcon)``;
