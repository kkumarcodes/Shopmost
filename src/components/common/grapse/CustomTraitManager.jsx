import * as React from 'react';
import TraitPropertyField from './TraitPropertyField';

export default function CustomTraitManager({ traits }) {
  return (
    <div className="gjs-custom-style-manager text-left mt-3 p-1">
      {
        !traits.length ?
          <div>No properties available</div>
          :
          traits.map(trait => (
            <TraitPropertyField key={trait.getId()} trait={trait} />
          ))}
    </div>
  );
}