const FileImport = () => {
  const importCSVFile = (e: any) => {
    e.preventDefault();

    const csvFile: any = document.getElementById('csvFile');

    const input: Blob = csvFile.files[0];
    const err = 'please select valid .csv file'
    if (!input || input.type !== 'text/csv') alert(err);

    const reader = new FileReader();
    reader.readAsText(input);

    reader.onload = function (e) {
      if (e.target) {
        const text = e.target.result;
        console.log(text);
        // document.write(text);
      }
    };
  }

  return (
    <form onSubmit={importCSVFile}>
      <div className='pseudo-btn'><input type='file' id='csvFile' accept='.csv' /></div>
      <button>Import .csv</button>
    </form>
  )
}

export default FileImport