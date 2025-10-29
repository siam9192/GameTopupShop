import React from 'react';

interface Props {
  value: string;
}

function PreviewEditorValue({ value }: Props) {
  if (!value?.trim()) {
    return <p className="text-gray-500 italic text-center py-4">No content to display</p>;
  }

  return (
    <div
      className="
        prose 
        prose-sm sm:prose-base md:prose-lg lg:prose-xl 
        max-w-full break-words
        text-gray-800
        dark:prose-invert dark:text-gray-200
        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        prose-a:text-blue-600 hover:prose-a:underline dark:prose-a:text-blue-400
        prose-strong:text-gray-900 dark:prose-strong:text-gray-100
        prose-img:rounded-xl prose-img:shadow-md prose-img:max-w-full prose-img:h-auto
        prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-4
        prose-table:w-full prose-table:overflow-x-auto
        leading-relaxed
      "
      style={{
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default PreviewEditorValue;
