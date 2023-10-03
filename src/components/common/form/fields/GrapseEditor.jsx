/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import GjsEditor from '@grapesjs/react';

import './GrapseEditor.scss';

const gjsOptions = {
  height: '100vh',
  storageManager: false,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
    ],
    pages: [
      {
        name: 'Home page',
        component: `<h1>Custom Page UI</h1>`,
      },
    ],
  },
};

const onEditor = (editor) => {
  console.log('Editor loaded');
  (window).editor = editor;
};

export default function GrapseEditor({
  name,
  value,
  label,
  browserApi,
  deleteApi,
  uploadApi,
  folderCreateApi
}) {
  const [editorData, setEditorData] = React.useState(value);
  return (
    <div className="grapseeditor">
      <input type={'hidden'} name={name} value={editorData} />
      {(
        <GjsEditor
          className="gjs-custom-editor text-white bg-slate-900"
          grapesjs="https://unpkg.com/grapesjs"
          grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
          options={gjsOptions}
          plugins={[
            {
              id: 'gjs-blocks-basic',
              src: 'https://unpkg.com/grapesjs-blocks-basic',
            },
          ]}
          onEditor={onEditor}
        >
        </GjsEditor>
      )}

    </div>
  );
}

GrapseEditor.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  browserApi: PropTypes.string.isRequired,
  deleteApi: PropTypes.string.isRequired,
  uploadApi: PropTypes.string.isRequired,
  folderCreateApi: PropTypes.string.isRequired
};

GrapseEditor.defaultProps = {
  label: ''
};
