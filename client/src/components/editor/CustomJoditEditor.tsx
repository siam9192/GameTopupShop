'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

// Dynamically import JoditEditor to avoid SSR issues in Next.js
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface Props {
  onChange: (value: string) => void;
  defaultValue?: string;
  value?: string;
}

const CustomJoditEditor = ({ onChange, value, defaultValue }: Props) => {
  const editor = useRef<any>(null);

  const theme = useTheme();
  const mode = theme.palette.mode;

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...',
      minHeight: 400,
      maxHeight: 800,
      theme: mode,
    }),
    [mode],
  );

  return (
    <div className="editor-wrapper">
      <JoditEditor
        ref={editor}
        value={value || defaultValue}
        config={config}
        tabIndex={1}
        onChange={newContent => onChange(newContent)}
      />
    </div>
  );
};

export default CustomJoditEditor;
