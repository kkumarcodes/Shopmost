import React from 'react';
import PropTypes from 'prop-types';
import { Field } from '@components/common/form/Field';
import { _ } from '@shopmost/shopmost/src/lib/locale/translate';

export function State({
  selectedCountry,
  selectedState,
  allowCountries,
  fieldName = 'State'
}) {
  const States = selectedCountry
    ? allowCountries.find((c) => c.code === selectedCountry).States
    : [];
  return (
    <Field
      type="select"
      value={States.find((p) => p.code === selectedState)?.code}
      name={fieldName}
      label={_('State')}
      placeholder={_('State')}
      validationRules={[
        {
          rule: 'notEmpty',
          message: _('State is required')
        }
      ]}
      options={States.map((p) => ({ value: p.code, text: p.name }))}
    />
  );
}

State.propTypes = {
  selectedState: PropTypes.string,
  selectedCountry: PropTypes.string,
  allowCountries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      States: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          name: PropTypes.string
        })
      )
    })
  ).isRequired,
  fieldName: PropTypes.string
};

State.defaultProps = {
  selectedState: '',
  selectedCountry: '',
  fieldName: 'State'
};
