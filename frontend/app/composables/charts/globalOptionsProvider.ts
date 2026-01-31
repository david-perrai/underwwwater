import { ChartData } from "@/types/charts/globalChart";
import { Colors } from "@/plugins/utils/colors";
import { GasConsumptionItem } from "@/types/charts/gas";
import { TooltipItem } from "chart.js";

/**
 * Global Option Provider function.
 * @param {string} context string
 * @param {ChartData} data ChartData
 * @return {GasData}
 */
export function globalOptionsProvider(
  context: string,
  data: ChartData
): object {
  const itemsToDisplay = context === "gas_bar" ? 10 : 15;

  function getTitle(): object {
    const wording =
      "This chart display the last " +
      itemsToDisplay +
      " dives. You can zoom or drag to view the ancient ones.";

    switch (context) {
      case "gas_bar":
      case "depth_line":
        return { display: true, text: wording, color: Colors.grey_01 };
      default:
        return { display: false };
    }
  }

  function getTooltip(): object {
    return {
      enabled: true,
      bodyFont: {
        family: "Helvetica",
      },
      callbacks: {
        title: (item: TooltipItem<any>[]) => {
          switch (context) {
            case "depth_pie":
              return item[0].label + " zone:";
            case "depth_line":
              return "Depth:";
            case "gas_doughnut":
              return item[0].label;
            case "gas_bar":
              return item[0].dataset.label;
            case "themes_doughnut":
              return item[0].label;
            default:
              return "";
          }
        },
        label: (item: TooltipItem<any>) => {
          switch (context) {
            case "depth_pie":
            case "themes_doughnut":
              return (
                " " +
                (item.dataset.data[item.dataIndex] +
                  (item.dataset.data[item.dataIndex] > 1
                    ? " dives."
                    : " dive."))
              );
            case "depth_line":
              return " " + item.dataset.data[item.dataIndex] + "meters.";
            case "gas_doughnut":
              return (
                " " +
                (
                  (item.dataset.data[item.dataIndex] * 100) /
                  data.datasets[0].data.reduce(
                    (partialSum: number, a: number) => partialSum + a,
                    0
                  )
                ).toFixed(1) +
                "% of total tanks you used."
              );
            case "gas_bar":
              return " " + item.formattedValue + "bar.";
            default:
              return item.dataset.data[item.dataIndex] +
                item.dataset.data[item.dataIndex] >
                1
                ? " dives."
                : " dive.";
          }
        },
        afterLabel: (item: TooltipItem<any>) => {
          const customData = data.datasets[item.datasetIndex]
            .customData as Partial<GasConsumptionItem>[];

          if (customData) {
            const gasConsumptionItem = customData[item.dataIndex];

            switch (context) {
              case "gas_bar":
                return (
                  "Pressure consumed: " +
                  gasConsumptionItem.pressure +
                  "bar. " +
                  "\n" +
                  "Number of Tanks: " +
                  gasConsumptionItem.tanks +
                  "\n" +
                  "Mix: " +
                  gasConsumptionItem.label +
                  "\n" +
                  "Total Time: " +
                  gasConsumptionItem.totalTime +
                  "mn."
                );
              default:
                return null;
            }
          } else {
            return null;
          }
        },
      },
    };
  }

  function getZoom(): object | null {
    switch (context) {
      case "gas_bar":
      case "depth_line":
        return {
          limits: {
            x: { minRange: itemsToDisplay },
          },
          pan: {
            enabled: true,
            mode: "x" as const,
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x" as const,
          },
        };
      default:
        return null;
    }
  }

  function getScales(): object | null {
    switch (context) {
      case "gas_bar":
      case "depth_line":
        return {
          x: {
            min: data.labels.length - itemsToDisplay,
            max: data.labels.length,
            ticks: {
              color: Colors.grey_02,
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          y: {
            type: "linear" as const,
            display: true,
            ticks: {
              color: Colors.grey_02,
            },
            grid: {
              color: Colors.grey_05,
            },
          },
        };
      default:
        return null;
    }
  }

  return {
    responsive: true,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: context === "depth_pie" ? "left" : "bottom",
        labels: {
          color: Colors.grey_01,
        },
      },
      title: getTitle(),
      tooltip: getTooltip(),
      zoom: getZoom(),
    },
    scales: getScales(),
  };
}
