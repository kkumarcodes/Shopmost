import * as React from 'react';
import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from '@grapesjs/react';

import { useState } from 'react';
import { Tabs, Tab } from "../Tab";
import CustomBlockManager from './CustomBlockManager';
import CustomPageManager from './CustomPageManager';
import CustomLayerManager from './CustomLayerManager';
import CustomSelectorManager from './CustomSelectorManager';
import CustomStyleManager from './CustomStyleManager';
import CustomTraitManager from './CustomTraitManager';
import './RightSidebar.scss';

export default function RightSidebar() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className={'gjs-right-sidebar flex flex-col'}>
      <Tabs>
        <Tab component="content of tab 1">Tab 1</Tab>
        <Tab component="content of tab 2" active>
          Tab 2
        </Tab>
        <Tab component="content of tab 3">Tab 3</Tab>
        <Tab component="content of tab 4">Tab 4</Tab>
        <p>fgsdgs</p>
      </Tabs>
      <div
        className={'overflow-y-auto flex-grow border-t'}
      >
        {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {(props) => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
        {selectedTab === 4 && (
          <PagesProvider>
            {(props) => <CustomPageManager {...props} />}
          </PagesProvider>
        )}
      </div>
    </div>
  );
}
