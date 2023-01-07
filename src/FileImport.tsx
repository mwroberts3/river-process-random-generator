const FileImport = ({ setCSVImport, filename }: { setCSVImport: Function, filename: any }) => {

  const importCSVFile = (e: any) => {
    e.preventDefault();

    const csvFile: any = document.getElementById('csvFile');

    // csvFile.value = 'test';

    const input: Blob = csvFile.files[0];
    const err = 'please select valid .csv file'
    if (!input || input.type !== 'text/csv') alert(err);

    console.log(input.name);


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

    filename.current = input.name;
    setCSVImport(() => csvImportArray);
  }

  return (
    <form onChange={importCSVFile}>
      <div className='pseudo-btn'><input type='file' id='csvFile' accept='.csv' /><span id="filename-overlay">{filename.current}</span></div>
    </form>
  )
}

export default FileImport