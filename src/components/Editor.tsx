import React, { useLayoutEffect, useMemo, useState } from "react";
import { $getRoot, $getSelection, EditorState, LexicalNode, ElementNode, createEditor } from "lexical";
import { useEffect } from "react";

import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalAutoFormatterPlugin from "@lexical/react/LexicalAutoFormatterPlugin";
import LexicalAutoLinkPlugin from "@lexical/react/LexicalAutoLinkPlugin";
import LexicalTreeView from "@lexical/react/LexicalTreeView";
import LexicalRichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import LexicalTablePlugin from "@lexical/react/LexicalTablePlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

const theme = {
  // Theme styling goes here
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    editor.addListener(
      "command",
      (a: any, b: any) => {
        console.log("what", a, b);
        return false;
      },
      1
    );
  });

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

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div>
      <button
        onClick={() => {
          editor.execCommand("insertTable", {
            columns: 2,
            rows: 3,
          });
        }}
      >
        Insert table
      </button>
    </div>
  );
}

export function Editor() {
  
  const [editorState, setEditorState] = useState<EditorState>();
  
  const initialConfig: React.ComponentProps<
    typeof LexicalComposer
  >["initialConfig"] = {
    theme,
    onError,
    nodes: [TableNode, TableCellNode, TableRowNode],
  };

  // console.log(editorState?.toJSON());

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />

        <LexicalPlainTextPlugin
          contentEditable={<LexicalContentEditable/>}
          initialEditorState={editorState}
          placeholder={<div>Enter some text...</div>}
        />

        <LexicalOnChangePlugin onChange={(_update, editor) => {
          _update.read(() => {
            // Read the contents of the EditorState here.
            const root = $getRoot();
            const selection = $getSelection();
            console.log(_update.toJSON())
            setEditorState(_update)
          });
        }} />
        <LexicalRichTextPlugin
          contentEditable={<LexicalContentEditable />}
          initialEditorState={editorState}
          placeholder={<div>Enter some text...</div>}
        />
        <LexicalAutoFormatterPlugin />
        <LexicalTablePlugin />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <LexicalTreeView />
      </LexicalComposer>
    </div>
  );
}
