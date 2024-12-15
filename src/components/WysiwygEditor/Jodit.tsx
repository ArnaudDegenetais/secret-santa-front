import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useStore } from "@tanstack/react-store";
import userStore from '../../utils/UserStore';
import { motion } from "framer-motion";

interface JoditProps {
  placeholder?: string;
  setWish: (wish: string) => void;
}

const Jodit: React.FC<JoditProps> = ({ placeholder, setWish }) => {
  const editor = useRef(null);
  const user = useStore(userStore, (state) => state);
  const [content, setContent] = useState(user.wishes);
  console.log("TANSTACK JODIT User: ", user);

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Start typings...',
    style: {
      color: 'black',
      height: 300,
    },
  }),
    [placeholder]
  );

  const handleContentChange = (newContent: string) => {
    console.log("newContent : ", newContent);
    setWish(newContent);
  }

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        // tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      <motion.div
        className='mt-4'
        initial={{ scale: 1, opacity: 0, y: 20, x: 0 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1, y: 0, x: 50 }}
      >
        <button onClick={() => handleContentChange(content)}>Envoie ta liste au Père Noël</button>
      </motion.div>
    </>
  );
};

export default Jodit;