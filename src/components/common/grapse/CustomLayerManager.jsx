import * as React from 'react';
import { LayersResultProps, useEditor } from '@grapesjs/react';
import { useRef, useState } from 'react';
import LayerItem from './LayerItem';

const wrapGridStyle = {
  touchAction: 'none',
};

const LAYER_PAD = 5;

const getDragTarget = (ev) => {
  const el = document.elementFromPoint(ev.clientX, ev.clientY);
  const elLayer = el?.closest('[data-layer-item]');
  return {
    el: elLayer,
    cmp: (elLayer)?.__cmp,
  };
};

export default function CustomLayerManager({
  root,
}) {
  const editor = useEditor();
  const [pointerDown, setPointerDown] = useState(false);
  const [canMoveRes, setCanMoveRes] = useState({});
  const [cmpPointerOver, setCmpPointerOver] = useState();
  const [dragging, setDragging] = useState();
  const [dragParent, setDragParent] = useState();
  const [dragRect, setDragRect] = useState();
  const indicatorRef = useRef(null);
  const { Components } = editor;

  const onDragStart = () => {
    setPointerDown(true);
  };

  const onDragMove = (ev) => {
    if (!pointerDown) return;
    const { cmp, el: elLayer } = getDragTarget(ev);
    if (!elLayer || !cmp) return;
    const layerRect = elLayer.getBoundingClientRect();
    const layerH = elLayer.offsetHeight;
    const layerY = elLayer.offsetTop;
    const pointerY = ev.clientY;
    const isBefore = pointerY < layerRect.y + layerH / 2;
    const cmpSource = !dragging ? cmp : dragging;
    const cmpTarget = cmp.parent();
    const cmpIndex = cmp.index() + (isBefore ? 0 : 1);
    !dragging && setDragging(cmp);
    setCmpPointerOver(cmp);
    const canMove = Components.canMove(cmpTarget, cmpSource, cmpIndex);
    const canMoveInside = Components.canMove(cmp, cmpSource);
    const canMoveRes = {
      ...canMove,
      canMoveInside,
      index: cmpIndex,
    };
    let pointerInside = false;
    if (
      canMoveInside.result &&
      pointerY > layerRect.y + LAYER_PAD &&
      pointerY < layerRect.y + layerH - LAYER_PAD
    ) {
      pointerInside = true;
      canMoveRes.target = cmp;
      delete canMoveRes.index;
    }
    setDragParent(pointerInside ? cmp : undefined);
    setCanMoveRes(canMoveRes);
    setDragRect({
      pointerInside,
      y: layerY + (isBefore ? 0 : layerH),
      h: layerH,
    });
  };
  const onDragEnd = () => {
    canMoveRes?.result &&
      canMoveRes.source?.move(canMoveRes.target, { at: canMoveRes.index });
    setCanMoveRes({});
    setPointerDown(false);
    setDragging(undefined);
    setCmpPointerOver(undefined);
    setDragParent(undefined);
    setDragRect(undefined);
  };

  const dragLevel = (cmpPointerOver ? cmpPointerOver.parents() : []).length;
  const showIndicator = !!(
    dragging &&
    dragRect &&
    canMoveRes?.result &&
    !dragRect.pointerInside
  );
  const indicatorStyle = showIndicator
    ? { top: dragRect.y, left: 0, marginLeft: dragLevel * 10 + 20 }
    : {};

  return (
    <div
      className="gjs-custom-layer-manager h-full overflow-y-auto overflow-x-hidden text-sm text-left select-none relative"
      style={wrapGridStyle}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
    >
      {!!root && (
        <LayerItem
          component={root}
          level={-1}
          draggingCmp={dragging}
          dragParent={dragParent}
        />
      )}
      {showIndicator && (
        <div
          ref={indicatorRef}
          className={cx('absolute w-full h-0.5 bg-yellow-400')}
          style={indicatorStyle}
        ></div>
      )}
    </div>
  );
}
