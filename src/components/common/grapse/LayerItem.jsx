import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

const itemStyle = { maxWidth: `100%` };

export default function LayerItem({
  component,
  draggingCmp,
  dragParent,
  ...props
}) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join('-');
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      (layerRef.current).__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cx(
    'layer-item flex flex-col',
    selected && 'bg-sky-900',
    (!visible || isDragging) && 'opacity-50'
  );

  return (
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="group max-w-full"
        data-layer-item
        ref={layerRef}
      >
        <div
          className={cx(
            'flex items-center p-1 pr-2 border-b gap-1',
            level === 0 && 'border-t',
            MAIN_BORDER_COLOR,
            isHovered && 'bg-sky-700',
            selected && 'bg-sky-500'
          )}
        >
          <div
            style={{ marginLeft: `${level * 10}px` }}
            className={cx(
              'cursor-pointer',
              !components.length && 'pointer-events-none opacity-0'
            )}
            onClick={toggleOpen}
          >
              <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>          </div>
          <div className="truncate flex-grow" style={itemStyle}>
            {name}
          </div>
          <div
            className={cx(
              'group-hover:opacity-100 cursor-pointer',
              visible ? 'opacity-0' : 'opacity-100'
            )}
            onClick={toggleVisibility}
          >
              <svg class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
          </div>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={cx('max-w-full', !open && 'hidden')}>{cmpToRender}</div>
      )}
    </div>
  );
}
