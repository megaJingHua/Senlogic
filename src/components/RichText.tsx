import React from 'react';

interface RichTextProps {
  text: string;
  className?: string;
}

export function RichText({ text, className = '' }: RichTextProps) {
  // 將 **text** 轉換為 <strong>text</strong>
  const parseText = (input: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      // 添加普通文字
      if (match.index > lastIndex) {
        parts.push(input.substring(lastIndex, match.index));
      }
      // 添加粗體文字
      parts.push(
        <strong key={match.index} className="font-bold text-gray-900">
          {match[1]}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }

    // 添加剩餘的普通文字
    if (lastIndex < input.length) {
      parts.push(input.substring(lastIndex));
    }

    return parts;
  };

  return <span className={className}>{parseText(text)}</span>;
}
