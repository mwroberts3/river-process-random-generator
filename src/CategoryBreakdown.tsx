const CategoryBreakdown = ({ unmutatedTaskList, totalMinutes }: { unmutatedTaskList: any, totalMinutes: number }) => {

  const categoryList = groupByMainCategory(unmutatedTaskList);

  function groupByMainCategory(taskList: any) {
    let tempList: any = [];
    for (let i = 0; i < taskList.length; i++) {
      tempList.push(JSON.stringify(taskList.filter((task: any) => task.categories[0] === taskList[i].categories[0])));
    }

    tempList = listParse(tempList);

    tempList.forEach((cate: any) => {
      let totalMinutesByCategory: number = 0;
      let subCategories: Array<object> = [];
      cate.forEach((task: any) => {
        totalMinutesByCategory += task.timesPerWeek * task.minEstimate;

        subCategories.push({ category: task.categories[1], minutes: task.minEstimate * task.timesPerWeek });
      });

      cate.unshift({ totalMin: totalMinutesByCategory, category: cate[cate.length - 1].categories[0], subCategories: tallySubcategories(subCategories) });
    });

    console.log(tempList);
    return tempList;
  }

  function tallySubcategories(subCategories: Array<any>) {
    let subCategoryTotals: Array<any> = []
    // console.log(subCategories);

    for (let i = 0; i < subCategories.length; i++) {
      let totalSubcateMinutes = 0;
      for (let k = 0; k < subCategories.length; k++) {
        if (subCategories[i].category === subCategories[k].category) {
          totalSubcateMinutes += subCategories[k].minutes;
        }
      }

      subCategoryTotals.push(JSON.stringify({ category: subCategories[i].category, minutes: totalSubcateMinutes }));
    }

    return listParse(subCategoryTotals);
  }

  function listParse(list: Array<any>) {
    list = [...new Set(list)];

    for (let i = 0; i < list.length; i++) {
      list.splice(i, 1, JSON.parse(list[i]))
    }

    return list;
  }

  return <>
    <h1>Category Breakdown</h1>
    {categoryList.map((category: any, index: number) => {
      return <li key={index}>{category[0].category} {Math.round(category[0].totalMin / totalMinutes * 100)}%</li>
    })}
  </>
}

export default CategoryBreakdown