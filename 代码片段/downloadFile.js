const convertRes2Blob = (resData, documentName) => {
  const fileName = documentName;
  const resContentType = 'application/json';

  const blob = new Blob([JSON.stringify({ ...resData })], {
    type: resContentType,
  });

  if (typeof window.navigator?.msSaveBlob !== 'undefined') {
    // handle IE
    window.navigator?.msSaveBlob(blob, decodeURI(fileName));
  } else {
    console.log(window.URL.msSaveBlob);
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;

    // handle browser not support html5 download attribute
    // if (typeof link.download === 'undefined') {
    //     link.target = '_blank';
    // } else {
    //     link.download = decodeURI(fileName);
    // }

    link.download = fileName;
    link.style.display = 'none';
    // trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }
};
