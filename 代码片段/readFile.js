const readFile = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function (evt) {
    try {
      const fileContent = evt.target.result;
      const json = JSON.parse(fileContent);
      console.log(json);
    } catch (e) {
      console.log(e);
    }
  };
};
