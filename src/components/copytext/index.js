import React, { useEffect, useState } from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function CopyToClipboardButton({ text }) {

  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = () => {
    // Create a temporary textarea element
    setCopied(true);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Set the textarea style to be off-screen
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    
    // Append the textarea to the document body
    document.body.appendChild(textarea);
    
    // Select the text in the textarea
    textarea.select();
    
    // Execute the copy command
    const success = document.execCommand('copy');
    
    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
    
    // Return whether the operation was successful
    return success;
  };

  const handleCopyClick = () => {
    const copied = copyTextToClipboard(text);
    if (copied) {
      console.log('Text copied successfully:', text);
    } else {
      console.error('Failed to copy text:', text);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000); // Delay of 3000 milliseconds (3 seconds)

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [copied]);

  return (
    <ContentPasteIcon onClick={handleCopyClick} sx={{ml: 1, color:copied ? 'green':'#000'}}/>
  );
}

export default CopyToClipboardButton;