import React from 'react';

interface item {
  code: string;
}

interface Props {
  formData: item;
}

class Download extends React.Component<Props> {
  handleClick = () => {
    const { formData } = this.props;
    const code = formData.code;

    let fileExtension;
let blob;

// Determine file extension based on the type of code
if (code.startsWith('<svg')) {
    fileExtension = '.svg';
    blob = new Blob([code], { type: 'image/svg+xml' });
} else if (code.startsWith('<!DOCTYPE html>') || code.startsWith('<html>')) {
    fileExtension = '.html';
    blob = new Blob([code], { type: 'text/html' });
} else {
    fileExtension = '.txt';
    blob = new Blob([code], { type: 'text/plain' });
}

const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = `code${fileExtension}`;

    link.click();
  };

  render() {
    return (
        <button
        id="downloadButton"
        className="invert max-w-[27px] max-h-[27px] ml-2"
        onClick={this.handleClick}
        type="button" 
      >
        <img src="/download.svg" alt="Download" />
      </button>
    );
  }
}

export default Download;
