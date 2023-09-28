/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from '@grapesjs/react';
import CustomModal from '@components/common/grapse/CustomModal';
import CustomAssetManager from '@components/common/grapse/CustomAssetManager';
import Topbar from '@components/common/grapse/Topbar';
import RightSidebar from '@components/common/grapse/RightSidebar';

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
        component: `<h1>GrapesJS React Custom UI</h1>`,
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
  const editorRef = React.useRef();
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const [fileBrowser, setFileBrowser] = React.useState(false);
  const [editor, setEditor] = React.useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorData, setEditorData] = React.useState(value);

  React.useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div className="grapseeditor">
      <input type={'hidden'} name={name} value={editorData} />
      {editorLoaded && (
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
          <div className={`flex h-full border-t border-slate-500`}>
            <div className="gjs-column-m flex flex-col flex-grow">
              <Topbar className="min-h-[48px]" />
              <Canvas className="flex-grow gjs-custom-editor-canvas" />
            </div>
            <RightSidebar
              className={`gjs-column-r w-[300px] border-l border-slate-500`}
            />
          </div>
          <ModalProvider>
            {({ open, title, content, close }) => (
              <CustomModal
                open={open}
                title={title}
                children={content}
                close={close}
              />
            )}
          </ModalProvider>
          <AssetsProvider>
            {({ assets, select, close, Container }) => (
              <Container>
                <CustomAssetManager
                  assets={assets}
                  select={select}
                  close={close}
                />
              </Container>
            )}
          </AssetsProvider>
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
