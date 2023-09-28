import * as React from 'react';
import { AssetsResultProps, useEditor } from '@grapesjs/react';

export default function CustomAssetManager({
  assets,
  select,
}) {
  const editor = useEditor();

  const remove = (asset) => {
    editor.Assets.remove(asset);
  };

  return (
    <div className="grid grid-cols-3 gap-2 pr-2">
      {assets.map((asset) => (
        <div
          key={asset.getSrc()}
          className="relative group rounded overflow-hidden"
        >
          <img className="display-block" src={asset.getSrc()} />
          <div className="flex flex-col items-center justify-end absolute top-0 left-0 w-full h-full p-5 bg-zinc-700/75 group-hover:opacity-100 opacity-0 transition-opacity">
            <button
              type="button"
              className={BTN_CLS}
              onClick={() => select(asset, true)}
            >
              Select
            </button>
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => remove(asset)}
            >
              <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
