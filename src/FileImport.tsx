const FileImport = ({ setCSVImport }: { setCSVImport: Function }) => {
  const importCSVFile = (e: any) => {
    e.preventDefault();

    const csvFile: any = document.getElementById('csvFile');

    const input: Blob = csvFile.files[0];
    const err = 'please select valid .csv file'
    if (!input || input.type !== 'text/csv') alert(err);

    const reader = new FileReader();
    reader.readAsText(input);

    const csvImportArray: any = [];
    reader.onload = function (e) {
      if (e.target) {
        let text: any = e.target.result;
        text = text.split('\r\n').splice(1);

        text.forEach((row: string, index: number) => {
          csvImportArray.push({
            id: index,
            task: row.split(',')[0],
            categories: [row.split(',')[1], row.split(',')[2]],
            timesPerWeek: +row.split(',')[3],
            color: row.split(',')[4],
            minEstimate: +row.split(',')[5],
            active: row.split(',')[6] === '1' ? true : false
          })
        })
      }
    };

    setCSVImport(() => csvImportArray);
  }

  return (
    <form onSubmit={importCSVFile}>
      <div className='pseudo-btn'><input type='file' id='csvFile' accept='.csv' /></div>
      <button>Import .csv</button>
    </form>
  )
}

export default FileImport