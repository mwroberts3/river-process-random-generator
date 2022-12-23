import CategoryHeader from "./CategoryHeader";

const CategoryBreakdown = ({ unmutatedTaskList, totalMinutes, minToHours }: { unmutatedTaskList: any, totalMinutes: number, minToHours: Function }) => {

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

        subCategories.push({ category: task.categories[1], totalMin: task.minEstimate * task.timesPerWeek });
      });

      cate.unshift({ totalMin: totalMinutesByCategory, category: cate[cate.length - 1].categories[0], subCategories: tallySubcategories(subCategories) });

    });

    sortCategories(tempList, false);


    return tempList;
  }

  function tallySubcategories(subCategories: Array<any>) {
    let subCategoryTotals: Array<any> = []

    for (let i = 0; i < subCategories.length; i++) {
      let totalSubcateMinutes = 0;
      for (let k = 0; k < subCategories.length; k++) {
        if (subCategories[i].category === subCategories[k].category) {
          totalSubcateMinutes += subCategories[k].totalMin;
        }
      }

      subCategoryTotals.push(JSON.stringify({ category: subCategories[i].category, totalMin: totalSubcateMinutes }));
    }

    return listParse(subCategoryTotals);
  }

  function listParse(list: Array<any>) {
    list = [...new Set(list)];

    for (let i = 0; i < list.length; i++) {
      list.splice(i, 1, JSON.parse(list[i]))
    }

    sortCategories(list, true);

    return list;
  }

  function sortCategories(categoryList: any, subCatList: boolean) {
    if (!subCatList) {
      return categoryList.sort((a: any, b: any) => {
        if (a[0].totalMin > b[0].totalMin) return -1;
        else return 1;
      })
    } else {
      return categoryList.sort((a: any, b: any) => {
        if (a.totalMin > b.totalMin) return -1;
        else return 1;
      })
    }
  }

  return <>
    <h1>Category Breakdown</h1>
    {categoryList.map((category: any, index: number) => {
      return <CategoryHeader key={index} categoryInfo={category[0]} totalMinutes={totalMinutes} minToHours={minToHours} />
    })}
  </>
}

export default CategoryBreakdown