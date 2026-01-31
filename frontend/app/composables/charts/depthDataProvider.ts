import { ApolloResponse } from "@/types/utils/apollo";
import { ChartData } from "../../types/charts/globalChart";
import { Colors } from "@/plugins/utils/colors";
import { DepthData } from "@/types/charts/depth";
import { DiveInterface } from "@/types/global/dive";
import { PanelData } from "@/types/charts/panel";
import format from "date-fns/format";
import { useDivesCollectionLoader } from "@/composables/utils/divesCollectionLoader";

/**
 * Depth Data Provider function.
 * @param {ApolloResponse} collection ApolloResponse
 * @return {DepthData}
 */
export function useDepthDataProvider(collection: ApolloResponse): DepthData {
  function getDepthGroups(): number[] {
    const depthGroup = [0, 0, 0, 0, 0, 0, 0];

    dives.forEach((dive) => {
      dive.maxDepth <= 9
        ? depthGroup[0]++
        : dive.maxDepth <= 19
        ? depthGroup[1]++
        : dive.maxDepth <= 29
        ? depthGroup[2]++
        : dive.maxDepth <= 39
        ? depthGroup[3]++
        : dive.maxDepth <= 49
        ? depthGroup[4]++
        : dive.maxDepth <= 59
        ? depthGroup[5]++
        : depthGroup[6]++;
    });

    return depthGroup;
  }

  function loadPieData(): ChartData {
    return {
      labels: [
        "-10m",
        "10-19m",
        "20-29m",
        "30-39m",
        "40-49m",
        "50-59m",
        "+60m",
      ],
      datasets: [
        {
          backgroundColor: [
            Colors.depth_00,
            Colors.depth_01,
            Colors.depth_02,
            Colors.depth_03,
            Colors.depth_04,
            Colors.depth_05,
            Colors.depth_06,
          ],
          data: getDepthGroups(),
        },
      ],
    };
  }

  function loadLineData(): ChartData {
    const data: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    let highlight: number | null = null;

    dives.forEach((dive) => {
      data.push(-Math.abs(dive.maxDepth));
      labels.push(format(new Date(dive.date), "PP"));
    });

    highlight = Math.min(...Object.values(data));

    Object.values(data).forEach((value) => {
      const color = value === highlight ? Colors.warning : Colors.depth_02;
      colors?.push(color);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Max depth. (in meters)",
          id: "maxDepth",
          backgroundColor: colors,
          borderColor: colors,
          pointBackgroundColor: colors,
          data: data,
        },
      ],
    };
  }

  function loadPanelData(): PanelData {
    const averageDepths = Math.floor(
      dives.reduce((total: number, next) => total + next.maxDepth, 0) /
        dives.length
    );

    const deepestDives = () => {
      const topThree = dives
        .sort((previous, next) => next.maxDepth - previous.maxDepth)
        .slice(0, 3);

      const subtitles: string[] = [];

      topThree.forEach((dive) => {
        subtitles.push(
          "-" + dive.maxDepth + "m : " + format(new Date(dive.date), "PPP")
        );
      });

      return subtitles;
    };

    return {
      rows: [
        {
          cols: [
            {
              title: "Deepest Dives",
              subtitle: deepestDives(),
              highlight: true,
            },
          ],
        },
        {
          cols: [
            {
              title: "Average Depths",
              subtitle: ["-" + averageDepths + "m"],
            },
          ],
        },
      ],
    };
  }

  const dives = useDivesCollectionLoader(collection) as Pick<
    DiveInterface,
    "maxDepth" | "date"
  >[];

  return {
    pie: loadPieData(),
    line: loadLineData(),
    panel: loadPanelData(),
  };
}
