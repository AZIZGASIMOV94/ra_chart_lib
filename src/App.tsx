import React, { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";

import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
 
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => Math.floor(Math.random() * 700)),
    },
    {
      type: "line" as const,
      label: "Dataset 2",
      borderColor: "rgb(0,0,139)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => Math.floor(Math.random() * 700)),
    },
    {
      type: "line" as const,
      label: "Dataset 3",
      borderColor: "	rgb(255,0,255)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => Math.floor(Math.random() * 700)),
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => Math.floor(Math.random() * 700)),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar" as const,
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: labels.map(() => Math.floor(Math.random() * 700)),
    },
    //(255, 0, 0)
    {
      type: "bar" as const,
      label: "Dataset 4",
      backgroundColor: "rgb(255, 0, 0)",
      data: labels.map(() => Math.floor(Math.random() * 700)),
    },
  ],
};


function App() {

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };


  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    console.log(elements.length);
  };


  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <div>
    <header>Rockwell Automation</header>
    <br />
    <div
      style={{
        paddingLeft: "300px",
        width: "1200px",
        height: "850px",
      }}
    >
      <Chart
        ref={chartRef}
        type="bar"
        onClick={onClick}
        options={options}
        data={data}
      />
    </div>
  </div>
  );
}

export default App;
