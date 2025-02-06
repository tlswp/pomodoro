import * as React from 'react';

import { cn } from '@/shared/lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, autoResize = false, minRows, maxRows, onInput, ...props },
    forwardedRef
  ) => {
    const localRef = React.useRef<HTMLTextAreaElement | null>(null);

    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>
          ).current = node;
        }
        localRef.current = node;
      },
      [forwardedRef]
    );

    const handleResize = React.useCallback(
      (textarea: HTMLTextAreaElement) => {
        if (!textarea) return;
        textarea.style.height = 'auto';
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseInt(computedStyle.lineHeight, 10) || 0;
        const { scrollHeight } = textarea;
        if (minRows) {
          const minHeight = minRows * lineHeight;
          if (scrollHeight < minHeight) {
            textarea.style.height = `${minHeight}px`;
            return;
          }
        }
        if (maxRows) {
          const maxHeight = maxRows * lineHeight;
          if (scrollHeight > maxHeight) {
            textarea.style.height = `${maxHeight}px`;
            return;
          }
        }
        textarea.style.height = `${scrollHeight}px`;
      },
      [minRows, maxRows]
    );

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (!autoResize || !localRef.current) {
        onInput?.(e);
        return;
      }
      handleResize(localRef.current);
      onInput?.(e);
    };

    React.useEffect(() => {
      if (autoResize && localRef.current) {
        handleResize(localRef.current);
      }
    }, [autoResize, handleResize]);

    return (
      <textarea
        ref={mergedRef}
        onInput={handleInput}
        className={cn(
          `flex min-h-[60px] w-full rounded-md border border-input
          bg-transparent px-3 py-2 text-base shadow-sm
          placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
