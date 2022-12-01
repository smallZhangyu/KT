const readFile = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function (evt) {
    try {
      const fileContent = evt.target.result;
      console.log(fileContent);
    } catch (e) {
      console.log(e);
    }
  };
};
