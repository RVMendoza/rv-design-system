import type { BlockquoteHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import styles from './Typography.module.css';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Controls visual emphasis without changing paragraph semantics. */
  size?: 'small' | 'body' | 'lead';
  children: ReactNode;
}

export function Paragraph({ size = 'body', className = '', children, ...props }: ParagraphProps) {
  return <p className={[styles['rvds-paragraph'], styles[`rvds-paragraph--${size}`], className].filter(Boolean).join(' ')} {...props}>{children}</p>;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The semantic heading level. Choose this from document hierarchy. */
  level: HeadingLevel;
  /** Optional visual size independent from the semantic level. */
  size?: HeadingLevel;
  children: ReactNode;
}

export function Heading({ level, size = level, className = '', children, ...props }: HeadingProps) {
  const Element = `h${level}` as const;
  return <Element className={[styles['rvds-heading'], styles[`rvds-heading--${size}`], className].filter(Boolean).join(' ')} {...props}>{children}</Element>;
}

export interface QuoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  attribution?: ReactNode;
  citationUrl?: string;
  children: ReactNode;
}

export function Quote({ attribution, citationUrl, className = '', children, ...props }: QuoteProps) {
  return <figure className={[styles['rvds-quote'], className].filter(Boolean).join(' ')}>
    <blockquote className={styles['rvds-quote__body']} cite={citationUrl} {...props}>{children}</blockquote>
    {attribution && <figcaption className={styles['rvds-quote__attribution']}>{citationUrl ? <a href={citationUrl}>{attribution}</a> : attribution}</figcaption>}
  </figure>;
}

export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  code: string;
  language?: string;
  caption?: ReactNode;
  wrap?: boolean;
}

export function CodeBlock({ code, language, caption, wrap = false, className = '', ...props }: CodeBlockProps) {
  return <figure className={[styles['rvds-code-block'], wrap ? styles['rvds-code-block--wrap'] : '', className].filter(Boolean).join(' ')}>
    {caption && <figcaption className={styles['rvds-code-block__caption']}>{caption}</figcaption>}
    <pre className={styles['rvds-code-block__pre']}><code className={styles['rvds-code-block__code']} data-language={language} {...props}>{code}</code></pre>
  </figure>;
}

export type DividerProps = HTMLAttributes<HTMLHRElement>;
export function Divider({ className = '', ...props }: DividerProps) {
  return <hr className={[styles['rvds-divider'], className].filter(Boolean).join(' ')} {...props} />;
}
