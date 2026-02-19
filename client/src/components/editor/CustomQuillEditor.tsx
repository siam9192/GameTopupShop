import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CustomQuillEditor() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState<string>('');
  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={(value: string) => {
        try {
          setContent(value);
        } catch (err) {
          console.error('Content update failed:', err);
        }
      }}
      theme="snow"
    />
  );
}

export default CustomQuillEditor;
