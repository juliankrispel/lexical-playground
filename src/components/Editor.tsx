import React from "react";
import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect } from "react";

import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalAutoFormatterPlugin from "@lexical/react/LexicalAutoFormatterPlugin";
import LexicalAutoLinkPlugin from "@lexical/react/LexicalAutoLinkPlugin";
import LexicalTablePlugin from "@lexical/react/LexicalTablePlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {
  // Theme styling goes here
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

  });
  console.log(editorState.toJSON())
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  throw error;
}

export function Editor() {
  const initialConfig = {
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <LexicalOnChangePlugin onChange={onChange} />
      <LexicalAutoFormatterPlugin />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
}
