import { API } from '@/utils/constant';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React, { useRef, useState } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);
  const [percent, setPercent] = useState(0);

  const handleUploadFile = async (
    callback: (url: string, meta: any) => void,
    value: any,
    meta: any
  ) => {
    if (meta.filetype === 'image') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.style.display = 'none';

      input.onchange = async () => {
        const file = input.files![0];
        const formData = new FormData();
        formData.append('fileEditor', file);

        try {
          const config = {
            onUploadProgress: function (progressEvent: any) {
              if (progressEvent && progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setPercent(percentCompleted);
              }
            },
          };
          const response = await axios.post(
            `${API.CLOUD}/drive/upload`,
            formData,
            config
          );
          const data = response.data;

          callback(data.link, { alt: file.name });
          setPercent(0); // Reset percent after upload is done

          // Ensure cursor is placed correctly after inserting the image
          const editor = editorRef.current;
          editor.focus();
          editor.selection.setCursorLocation();
        } catch (error) {
          console.error('Error uploading file:', error);
          setPercent(0); // Reset percent if there is an error
        }
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.getContent()); // Get editor content
    }
  };

  return (
    <>
      <div className='flex items-center'>
        <div
          className='bg-green-700 h-1.5'
          style={{ width: `${percent}%` }}
        ></div>
        <span className='ml-2'>{percent > 0 && `${percent}%`}</span>
      </div>
      <Editor
        apiKey='1z9mpcvuyes4vbu3i8gmw8xcw6qx0nzbusjwxb05dpzmazq4'
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          menubar: false,
          paste_data_images: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'heading',
          ],
          toolbar:
            'undo redo | ' +
            'codesample | bold italic forecolor | alignleft aligncenter |' +
            'alignright alignjustify | bullist numlist |' +
            'image |' +
            'h1 h2 h3 h4 h5 h6 | preview | fullscreen |' +
            'link',
          file_browser_callback_types: 'image',
          file_picker_callback: handleUploadFile,
          setup: (editor) => {
            editor.on('change', handleEditorChange); // Update value on change
          },
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
      />
    </>
  );
};

export default TextEditor;
