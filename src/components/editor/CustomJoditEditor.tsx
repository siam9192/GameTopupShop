'use client';
import React, { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

// Dynamically import JoditEditor to avoid SSR issues in Next.js
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const CustomJoditEditor: React.FC = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const theme = useTheme();

  const mode = theme.palette.mode;

  // Jodit editor configuration
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: 'Start typing...',
      minHeight: 400,
      theme: mode,
    }),
    [mode],
  );

  return (
    <div className="editor-wrapper">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onChange={newContent => setContent(newContent)}
      />
    </div>
  );
};

export default CustomJoditEditor;
