import * as React from 'react';

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}) {
  const addNewSelector = () => {
    const next = selectors.length + 1;
    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const targetStr = targets.join(', ');

  return (
    <div className="gjs-custom-selector-manager p-2 flex flex-col gap-2 text-left">
      <div className="flex items-center">
        <div className="flex-grow">Selectors</div>
        {/* <FormControl size="small">
          <Select
            value={selectedState}
            onChange={(ev) => setState(ev.target.value)}
            displayEmpty
          >
            <MenuItem value="">- State -</MenuItem>
            {states.map((state) => (
              <MenuItem value={state.id} key={state.id}>
                {state.getName()}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </div>
      <div
        className={'flex items-center gap-2 flex-wrap p-2 bg-black/30 border rounded min-h-[45px]'}
      >
        {targetStr ? (
          <button
            type="button"
            onClick={addNewSelector}
            className={'border rounded px-2 py-1'}
          >
            <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </button>
        ) : (
          <div className="opacity-70">Select a component</div>
        )}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className="px-2 py-1 flex items-center gap-1 whitespace-nowrap bg-sky-500 rounded"
          >
            <div>{selector.getLabel()}</div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className="opacity-70">{targetStr || 'None'}</span>
      </div>
    </div>
  );
}
