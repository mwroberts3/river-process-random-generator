import CategoryHeader from "./CategoryHeader";
import { PieChart } from "react-minimal-pie-chart";
import { useState, useRef } from 'react';

const CategoryBreakdown = ({ csvImport, totalMinutes, minToHours }: { csvImport: any, totalMinutes: number, minToHours: Function }) => {

  type Data = {
    color: string;
    value: number;
    key?: string | number;
    title?: string | number;
    [key: string]: any;
  }[];

  const categoryList = groupByMainCategory(csvImport);
  const chartData: Data = [];
  let smallChartData: any = useRef([]);
  const [showSubChart, setShowSubChart] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  convertToChartData(categoryList);
  generateRandomColorHex();

  function convertToChartData(list: any) {
    for (let i = 0; i < list.length; i++) {
      chartData.push({ title: `${list[i][0].category}`, value: Math.round(list[i][0].totalMin / totalMinutes * 100), color: generateRandomColorHex() })
    }
  };

  function generateRandomColorHex() {
    let hex = '#';

    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * 16);

      if (randomNum === 15) hex += 'F';
      else if (randomNum === 14) hex += 'E';
      else if (randomNum === 13) hex += 'D';
      else if (randomNum === 12) hex += 'C';
      else if (randomNum === 11) hex += 'B';
      else if (randomNum === 10) hex += 'A';
      else hex += randomNum;
    }

    return hex;
  }

  function groupByMainCategory(taskList: any) {
    let tempList: any = [];
    for (let i = 0; i < taskList.length; i++) {
      tempList.push(JSON.stringify(taskList.filter((task: any) => task.categories[0] === taskList[i].categories[0] && task.active)));
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

  function createSubCatPieChart(e: any) {
    smallChartData.current = [];

    let selectedCategoryTitle: string = e.target.innerHTML.split('>')[1].split('</')[0];

    for (let i = 0; i < categoryList.length; i++) {
      if (selectedCategoryTitle === categoryList[i][0].category) {
        for (let k = 0; k < categoryList[i][0].subCategories.length; k++) {
          smallChartData.current.push({ title: `${categoryList[i][0].subCategories[k].category}`, value: Math.round(categoryList[i][0].subCategories[k].totalMin / totalMinutes * 100), color: generateRandomColorHex() })
        }
      }
    }

    setShowSubChart(!showSubChart);
  }

  if (showBreakdown) {
    return <>
      <div className="header-and-btn-container">
        <h1>Category Breakdown</h1>
        <button onClick={() => setShowBreakdown(false)}>Hide</button>
      </div>
      {categoryList.map((category: any, index: number) => {
        return <CategoryHeader key={index} categoryInfo={category[0]} totalMinutes={totalMinutes} minToHours={minToHours} />
      })}
      <div className="chart-container">
        <PieChart
          onClick={createSubCatPieChart}
          className="big-chart"
          animate
          animationDuration={500}
          animationEasing="linear"
          center={[50, 50]}
          data={chartData} label={(data) => `${data.dataEntry.title} \n ${data.dataEntry.value}%`}
          lengthAngle={360}
          lineWidth={15}
          paddingAngle={5}
          radius={50}
          startAngle={90}
          viewBoxSize={[100, 100]}
          labelPosition={100}
          labelStyle={{
            fontSize: "4px",
            fontWeight: "800",
          }}
        />
        {showSubChart &&
          <PieChart
            className="small-chart"
            animate
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            data={smallChartData.current} label={(data) => `${data.dataEntry.title}`}
            lengthAngle={270}
            lineWidth={20}
            paddingAngle={0}
            radius={35}
            startAngle={270}
            viewBoxSize={[100, 100]}
            labelPosition={70}
            labelStyle={{
              fontSize: "3.5px",
            }}
          />
        }
      </div>
    </>
  }

  return <>
    <div className="header-and-btn-container">
      <h1>Category Breakdown</h1>
      <button onClick={() => csvImport.length > 0 ? setShowBreakdown(true) : alert('please load .csv file')}>Show</button>
    </div>
  </>
}

export default CategoryBreakdown