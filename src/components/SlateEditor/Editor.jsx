import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./Toolbar/Toolbar";
import { getMarked, getBlock } from "./utils/SlateUtilityFunctions.js";
import withLinks from "./plugins/withLinks.js";
import withTables from "./plugins/withTable.js";
import withEmbeds from "./plugins/withEmbeds.js";
import withEquation from "./plugins/withEquation.js";
import "./Editor.css";

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};
const SlateEditor = ({ initialValue, handleDescriptionChange, name }) => {
  const editor = useMemo(
    () =>
      withEquation(
        withHistory(
          withEmbeds(withTables(withLinks(withReact(createEditor()))))
        )
      ),
    []
  );
  const [value, setValue] = useState(initialValue);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    handleDescriptionChange(newValue, name);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={value} onChange={handleEditorChange}>
      <Toolbar />
      <div
        className="editor-wrapper"
        style={{ border: "1px solid #f3f3f3", padding: "0 10px" }}
      >
        <Editable
          placeholder="Write something"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
      {/* {htmlAction.showInput && <CodeToText {...htmlAction} />} */}
    </Slate>
  );
};

export default SlateEditor;
