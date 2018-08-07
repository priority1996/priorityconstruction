import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Button from '../components/Button';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import Type5 from '../components/Type5';
import InvisibleButton from '../components/InvisibleButton';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import Tabs from '../components/Tabs';
import { pxToRem } from '../styles/utils';
import states from '../content/usStates.json';

const TabTitle = Type5.extend`
  margin-bottom: 0;
  text-transform: uppercase;
`;

const FormErrorMessage = ErrorMessage.extend`
  margin-top: 1rem;
`;

const PageLayout = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;

  ${Button} {
    flex: 1;

    @media (min-width: ${pxToRem(500)}) {
      &:first-of-type {
        margin-right: 0.5rem;
      }

      &:last-of-type {
        margin-left: 0.5rem;
      }
    }
  }
`;

const ContactForm = styled.form`
  display: grid;

  ${Textarea} {
    min-height: ${pxToRem(250)};
  }

  ${Label} {
    margin-top: 1rem;
  }
`;

class Careers extends React.Component {
  static displayName = 'Careers';
  static propTypes = {
    className: PropTypes.string,
  };

  fields = [
    'name',
    'address',
    'homePhone',
    'cellPhone',
    'email',
    'dob',
    'beginWorkDate',
    'desiredSalary',
    'position',
    'canWorkWeekends',
    'capableOfPhysicalLabor',
    'convictedOfFelony',
    'felonyExplanation',
    'previouslyWorkedForPriority',
    'previousWorkforPriorityDetails',
    'previousEmployerCompany',
    'previousEmployerPhone',
    'previousEmployerCity',
    'previousEmployerState',
    'previousEmployerJobTitle',
    'previousEmployerResponsibilities',
    'previousEmployerStartDate',
    'previousEmployerEndDate',
    'previousEmployerReasonForLeaving',
    'additionalQualifications',
    'signature',
    'date',
    'certification',
  ];

  tabs = [
    'personalInformation',
    'previousEmployment',
    'additionalQualifications',
    'disclaimerAndSignature',
  ];

  thankYouMessage = React.createRef();
  errorMessage = React.createRef();

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  render() {
    const { className } = this.props;
    return (
      <Tabs tabs={this.tabs}>
        <PageContainer tag="section" className={className}>
          <PageLayout>
            <NetlifyFormComposer
              name="careers"
              fields={this.fields}
              onSubmitError={this.handleSetErrorFocus}
              onSubmitSuccess={this.handleSetThankYouFocus}
            >
              {state => (
                <React.Fragment>
                  <FormSuccessMessage
                    aria-hidden={state.submissionState !== 'success'}
                    show={state.submissionState === 'success'}
                    tabIndex={-1}
                    innerRef={this.thankYouMessage}
                  >
                    <div>
                      <Type2 tag="p">Thanks! We&rsquo;ll be in touch.</Type2>
                      <Type4 tag={InvisibleButton} onClick={state.handleResetFormSubmission}>
                        All done.
                      </Type4>
                    </div>
                  </FormSuccessMessage>
                  <ContactForm {...state.form}>
                    <input type="hidden" name="form-name" value={state.form.name} />

                    <Tabs.Content name="personalInformation">
                      {/* TODO: move this text to markdown */}
                      <p>
                        Interested in working with us in the construction field? We are always
                        looking for individuals who would like to develop their skills and apply
                        them to ongoing projects we currently have. We are always in demand for
                        dedicated foreman, laborers, skilled workers, mechanics, CDL drivers, and
                        operators. Working outside in the construction field isn’t for you? We are
                        also interested in individuals who specialize in estimating, accounting,
                        finance, project management, and office management. We are not only a team
                        at Priority Construction, we are also a family.
                      </p>
                      <TabTitle>Personal Information</TabTitle>
                      <Field nameAs="name" fragment>
                        <Label>Name</Label>
                        <Input required {...state.fields.name} />
                      </Field>
                      <Field nameAs="address" fragment>
                        <Label>Address</Label>
                        <Input required {...state.fields.address} />
                      </Field>
                      <Field nameAs="homePhone" fragment>
                        <Label>Home phone</Label>
                        <Input
                          type="tel"
                          placeholder="123-456-7890"
                          pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                          required
                          {...state.fields.homePhone}
                        />
                      </Field>
                      <Field nameAs="cellPhone" fragment>
                        <Label>Cell phone</Label>
                        <Input
                          type="tel"
                          placeholder="123-456-7890"
                          pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                          required
                          {...state.fields.cellPhone}
                        />
                      </Field>
                      <Field nameAs="email" fragment>
                        <Label>Email</Label>
                        <Input {...state.fields.email} type="email" required />
                      </Field>
                      <Field nameAs="dob" fragment>
                        <Label>Date of birth</Label>
                        <Input
                          {...state.fields.dob}
                          placeholder="MM/DD/YYYY"
                          maxLength="10"
                          required
                        />
                      </Field>
                      <Field nameAs="beginWorkDate" fragment>
                        <Label>Date available to begin working</Label>
                        <Input
                          {...state.fields.beginWorkDate}
                          placeholder="MM/DD/YYYY"
                          maxLength="10"
                          required
                        />
                      </Field>
                      <Field nameAs="desiredSalary" fragment>
                        <Label>Desired salary</Label>
                        <Input {...state.fields.desiredSalary} />
                      </Field>
                      <Field nameAs="position" fragment>
                        <Label>Position you are applying for</Label>
                        <Input {...state.fields.position} required />
                      </Field>
                      <Label>Are you available to work on weekends?</Label>
                      <fieldset>
                        <label>
                          <Input
                            {...state.fields.canWorkWeekends}
                            checked={state.fields.canWorkWeekends.value === 'yes'}
                            type="radio"
                            value="yes"
                          />{' '}
                          Yes
                        </label>
                        <label>
                          <Input
                            {...state.fields.canWorkWeekends}
                            checked={state.fields.canWorkWeekends.value === 'no'}
                            type="radio"
                            value="no"
                          />{' '}
                          No
                        </label>
                      </fieldset>
                      <Label>Are you capable of physical labor?</Label>
                      <fieldset>
                        <label>
                          <Input
                            {...state.fields.capableOfPhysicalLabor}
                            checked={state.fields.capableOfPhysicalLabor.value === 'yes'}
                            type="radio"
                            value="yes"
                          />{' '}
                          Yes
                        </label>
                        <label>
                          <Input
                            {...state.fields.capableOfPhysicalLabor}
                            checked={state.fields.capableOfPhysicalLabor.value === 'no'}
                            type="radio"
                            value="no"
                          />{' '}
                          No
                        </label>
                      </fieldset>
                      <Label>Have you ever been convicted of a felony?</Label>
                      <fieldset>
                        <label>
                          <Input
                            {...state.fields.convictedOfFelony}
                            checked={state.fields.convictedOfFelony.value === 'yes'}
                            type="radio"
                            value="yes"
                          />{' '}
                          Yes
                        </label>
                        <label>
                          <Input
                            {...state.fields.convictedOfFelony}
                            checked={state.fields.convictedOfFelony.value === 'no'}
                            type="radio"
                            value="no"
                          />{' '}
                          No
                        </label>
                      </fieldset>
                      {state.fields.convictedOfFelony.value === 'yes' && (
                        <Field nameAs="felonyExplanation" fragment>
                          <Label>Please explain:</Label>
                          <Textarea {...state.fields.felonyExplanation} required />
                        </Field>
                      )}
                      <Label>Have you previously worked for Priority Construction?</Label>
                      <fieldset>
                        <label>
                          <Input
                            {...state.fields.previouslyWorkedForPriority}
                            checked={state.fields.previouslyWorkedForPriority.value === 'yes'}
                            type="radio"
                            value="yes"
                          />{' '}
                          Yes
                        </label>
                        <label>
                          <Input
                            {...state.fields.previouslyWorkedForPriority}
                            checked={state.fields.previouslyWorkedForPriority.value === 'no'}
                            type="radio"
                            value="no"
                          />{' '}
                          No
                        </label>
                      </fieldset>
                      {state.fields.previouslyWorkedForPriority.value === 'yes' && (
                        <Field nameAs="previousWorkforPriorityDetails" fragment>
                          <Label>
                            When did you work for Priority Construction and who was your supervisor?
                          </Label>
                          <Textarea {...state.fields.previousWorkforPriorityDetails} required />
                        </Field>
                      )}
                    </Tabs.Content>

                    <Tabs.Content name="previousEmployment">
                      <TabTitle>Previous Employment Experience</TabTitle>
                      <Field nameAs="previousEmployerCompany" fragment>
                        <Label>Company</Label>
                        <Input {...state.fields.previousEmployerCompany} />
                      </Field>
                      <Field nameAs="previousEmployerPhone" fragment>
                        <Label>Phone</Label>
                        <Input
                          {...state.fields.previousEmployerPhone}
                          type="tel"
                          placeholder="123-456-7890"
                          pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                        />
                      </Field>
                      <Field nameAs="previousEmployerCity" fragment>
                        <Label>City</Label>
                        <Input {...state.fields.previousEmployerCity} />
                      </Field>
                      <Field nameAs="previousEmployerState" fragment>
                        <Label>State</Label>
                        <Select {...state.fields.previousEmployerState}>
                          <option />
                          {Object.keys(states).map(key => (
                            <option key={key} value={key}>
                              {states[key]}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field nameAs="previousEmployerJobTitle" fragment>
                        <Label>Job title</Label>
                        <Input {...state.fields.previousEmployerJobTitle} />
                      </Field>
                      <Field nameAs="previousEmployerResponsibilities" fragment>
                        <Label>Responsibilities</Label>
                        <Textarea {...state.fields.previousEmployerResponsibilities} />
                      </Field>
                      <Field nameAs="previousEmployerStartDate" fragment>
                        <Label>Start date</Label>
                        <Input
                          {...state.fields.previousEmployerStartDate}
                          placeholder="MM/DD/YYYY"
                          maxLength="10"
                          required
                        />
                      </Field>
                      <Field nameAs="previousEmployerEndDate" fragment>
                        <Label>End date</Label>
                        <Input
                          {...state.fields.previousEmployerEndDate}
                          placeholder="MM/DD/YYYY"
                          maxLength="10"
                          required
                        />
                      </Field>
                      <Field nameAs="previousEmployerReasonForLeaving" fragment>
                        <Label>Reason for leaving</Label>
                        <Textarea {...state.fields.previousEmployerReasonForLeaving} />
                      </Field>
                    </Tabs.Content>

                    <Tabs.Content name="additionalQualifications">
                      <TabTitle>Additional Qualifications</TabTitle>
                      <Field nameAs="additionalQualifications" fragment>
                        <Label>Additional qualifications</Label>
                        <Textarea {...state.fields.additionalQualifications} />
                      </Field>
                    </Tabs.Content>

                    <Tabs.Content name="disclaimerAndSignature">
                      <TabTitle>Disclaimer and Signature</TabTitle>
                      {/* TODO: move this text to markdown */}
                      <Field nameAs="signature" fragment>
                        <Label>Signature</Label>
                        <Input {...state.fields.signature} placeholder="Enter your name" required />
                      </Field>
                      <Field nameAs="date" fragment>
                        <Label>Date</Label>
                        <Input
                          {...state.fields.date}
                          placeholder="MM/DD/YYYY"
                          maxLength="10"
                          required
                        />
                      </Field>
                      <div>
                        <p>Please Call To Provide:</p>
                        <ol>
                          <li>Your Social Security Number</li>
                          <li>Your Driver&rsquo;s License Number / State / EXP</li>
                        </ol>
                      </div>
                      <Field nameAs="certification" fragment>
                        <Label>
                          I certify that my answers are true and complete to the best of my
                          knowledge. If this application leads to employment, I understand that
                          false or misleading information in my application or interview may result
                          in my release.
                        </Label>
                        {/* TODO: fix bug: spreading props for checkbox and radio buttons don't work well */}
                        <Input
                          {...state.fields.certification}
                          checked={state.fields.certification.value === 'yes'}
                          type="checkbox"
                          value="yes"
                          required
                        />
                      </Field>
                    </Tabs.Content>

                    <Tabs.Consumer>
                      {tabState => (
                        <ButtonContainer>
                          {/* NOTE: keep the "key" property else React will act strangely when swapping the next and submit buttons */}
                          <Button key="previous" type="button" onClick={tabState.setPreviousTab}>
                            Previous
                          </Button>
                          {tabState.activeTab === this.tabs[this.tabs.length - 1] ? (
                            <Button key="submit" type="submit">
                              Submit
                            </Button>
                          ) : (
                            <Button key="next" type="button" onClick={tabState.setNextTab}>
                              Next
                            </Button>
                          )}
                        </ButtonContainer>
                      )}
                    </Tabs.Consumer>

                    {state.submissionState === 'error' && (
                      <FormErrorMessage tabIndex={-1} innerRef={this.errorMessage}>
                        Sorry.{' '}
                        <span role="img" aria-label="Sad face">
                          😔
                        </span>{' '}
                        There was an problem submitting your message. Please try again.
                      </FormErrorMessage>
                    )}
                  </ContactForm>
                </React.Fragment>
              )}
            </NetlifyFormComposer>
          </PageLayout>
        </PageContainer>
      </Tabs>
    );
  }
}

export default styled(Careers)`
  padding-top: 2rem;
`;
