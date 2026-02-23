'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  'data-language'?: string;
  language?: string;
}

const CodeBlock = ({ 
  children, 
  className,
  title,
  'data-language': dataLanguage,
  language: explicitLanguage
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  // Extract code text from the pre element content
  const getCodeText = useCallback((element: React.ReactNode): string => {
    if (!element) return '';
    
    if (typeof element === 'string') return element;
    
    if (typeof element === 'object' && element !== null && 'props' in element) {
      const props = element.props as any;
      if (props.children) {
        if (Array.isArray(props.children)) {
          return props.children.map(getCodeText).join('');
        }
        return getCodeText(props.children);
      }
    }
    
    return '';
  }, []);

  const codeText = getCodeText(children);
  const language = explicitLanguage || dataLanguage || '';

  // Copy function
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [codeText]);

  // Simple enhanced code block with copy functionality
  return (
    <div className="relative group not-prose my-6">
      {/* Header with language and copy button */}
      {language && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border rounded-t-lg bg-muted/50">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            {language}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600 font-medium">Copié!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Code content - render rehype-highlight output */}
      <div className="rounded-b-lg overflow-x-auto border border-border bg-background">
        <div className="relative">
          <pre className={className}>
            <code>{children}</code>
          </pre>
          {!language && (
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-medium">Copié!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;