import React, { useEffect } from 'react';

interface CodePreviewProps {
  code: string;
}
const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  useEffect(() => {
    console.log(document);
  }, []); 
  const containerClass = code.startsWith('<svg') ? 'svg-container' : '';
  return (
    <div className={`w-600 ${containerClass}`} style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: code }} />
  );
};

export default CodePreview;





