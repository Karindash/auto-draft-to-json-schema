import React from 'react';

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevel;
}

export const Title: React.FC<TitleProps> = ({ level = 1, children, className = '', ...props }) => {
  const Tag = `h${level}` as const;
  
  return React.createElement(Tag, { className, ...props }, children);
};
