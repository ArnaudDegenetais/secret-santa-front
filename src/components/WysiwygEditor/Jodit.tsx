import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useStore } from "@tanstack/react-store";
import userStore from '../../utils/UserStore';
import { motion } from "framer-motion";

interface JoditProps {
  placeholder?: string;
  setWish: (wish: string) => void;
  isSending: boolean;
}

const Jodit: React.FC<JoditProps> = ({ placeholder, setWish, isSending }) => {
  const editor = useRef(null);
  const user = useStore(userStore, (state) => state);
  const [content, setContent] = useState(user.wishes);
  const [joditHeight, setJoditHeight] = useState(300);
  const [buttonMessage, setButtonMessage] = useState('Envoie ta liste au Père Noël');

  useEffect(() => {
    // Check the device type and set the height accordingly
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setJoditHeight(300);
      document.body.classList.add('is-mobile');
    } else {
      document.body.classList.remove('is-mobile');
    }
    if (user.wishes.length > 0) {
      setButtonMessage('Mettre à jour ta liste');
    }
  }, []);


  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || 'Start typings...',
    style: {
      color: 'black',
      height: joditHeight,
    },
  }),
    [placeholder]
  );

  const handleContentChange = (newContent: string) => {
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
        initial={{ scale: 1, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1, y: 0 }}
      >
        {isSending && (
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
        {!isSending &&
          <div className="flex items-center justify-center">
            <button disabled={isSending} onClick={() => handleContentChange(content)}>{buttonMessage}</button>
          </div>
        }
      </motion.div>
    </>
  );
};

export default Jodit;