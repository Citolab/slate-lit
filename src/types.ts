import { BaseEditor, BaseElement, BaseText, BaseRange } from 'slate';
import { HistoryEditor } from 'slate-history';

// Extend Slate's type definitions for custom properties
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & HistoryEditor & {
      undo: () => void;
      redo: () => void;
    };
    Element: BaseElement & {
      type?: string;
      [key: string]: any;
    };
    Text: BaseText & {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      code?: boolean;
      highlight?: boolean;
      [key: string]: any;
    };
    Range: BaseRange & {
      placeholder?: string;
      [PLACEHOLDER_SYMBOL]?: boolean;
    };
  }
}

// Add ShadowRoot extensions for getSelection
declare global {
  interface ShadowRoot {
    getSelection(): Selection | null;
    caretPositionFromPoint?(x: number, y: number): CaretPosition | null;
  }
  
  interface CaretPosition {
    readonly offset: number;
    readonly offsetNode: Node;
  }

  interface Window {
    MSStream?: any;
  }
}

export const PLACEHOLDER_SYMBOL = Symbol('placeholder');