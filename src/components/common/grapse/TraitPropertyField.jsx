import * as React from 'react';
import { useEditor } from '@grapesjs/react';

export default function TraitPropertyField({
  trait,
  ...rest
}) {
  const editor = useEditor();
  const handleChange = (value) => {
    trait.setValue(value);
  };

  const onChange = (ev) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');
    if (command) {
      typeof command === 'string'
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== 'undefined' ? value : defValue;

  let inputToRender = (
    <div
      placeholder={defValue}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
    />
  );

  switch (type) {
    case 'select':
      {
        inputToRender = (
          <div fullWidth size="small">
            <div value={value} onChange={onChange}>
              {trait.getOptions().map((option) => (
                <div
                  key={trait.getOptionId(option)}
                  value={trait.getOptionId(option)}
                >
                  {trait.getOptionLabel(option)}
                </div>
              ))}
            </div>
          </div>
        );
      }
      break;
    case 'color':
      {
        inputToRender = (
          <div
            fullWidth
            placeholder={defValue}
            value={value}
            onChange={onChange}
            size="small"
            InputProps={{
              startAdornment: (
                <div position="start">
                  <div
                    className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`}
                    style={{ backgroundColor: valueWithDef }}
                  >
                    <input
                      type="color"
                      className="w-[15px] h-[15px] cursor-pointer opacity-0"
                      value={valueWithDef}
                      onChange={(ev) => handleChange(ev.target.value)}
                    />
                  </div>
                </div>
              ),
            }}
          />
        );
      }
      break;
    case 'checkbox':
      {
        inputToRender = (
          <div
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
            size="small"
          />
        );
      }
      break;
    case 'button':
      {
        inputToRender = (
          <div fullWidth onClick={handleButtonClick}>
            {trait.getLabel()}
          </div>
        );
      }
      break;
  }

  return (
    <div {...rest} className={cx('mb-3 px-1 w-full')}>
      <div className={'flex mb-2 items-center'}>
        <div className="flex-grow capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  );
}
