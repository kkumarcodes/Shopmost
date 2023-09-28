import * as React from 'react';
import { DevicesProvider, WithEditor } from '@grapesjs/react';
import TopbarButtons from './TopbarButtons';

export default function Topbar({
  className,
}) {
  return (
    <div className={'gjs-top-sidebar flex items-center p-1'}>
      <DevicesProvider>
        {({ selected, select, devices }) => (
          <div size="small">
            <div value={selected} onChange={(ev) => select(ev.target.value)}>
              {devices.map((device) => (
                <div value={device.id} key={device.id}>
                  {device.getName()}
                </div>
              ))}
            </div>
          </div>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className="ml-auto px-2" />
      </WithEditor>
    </div>
  );
}
