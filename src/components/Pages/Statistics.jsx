import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import ReactApexChart from "react-apexcharts";
import { fetchApplications } from "../Firebase/firebase";

const Statistics = () => {
  const [barChartData, setBarChartData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Applications",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            color: "#EAEAEA",
          },
        },
      },
      title: {
        text: "Job Application Statuses",
        align: "center",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#EAEAEA",
        },
      },
      theme: {
        mode: "dark",
        palette: "palette2",
      },
    },
    series: [],
  });

  const [radarChartData, setRadarChartData] = useState({
    options: {
      chart: {
        type: "radar",
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      title: {
        text: "Skill Set Match",
        align: "center",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#EAEAEA",
        },
      },
      xaxis: {
        categories: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
        labels: {
          style: {
            fontSize: "14px",
          },
        },
      },
      theme: {
        mode: "dark",
        palette: "palette1",
      },
    },
    series: [
      {
        name: "Skill Set",
        data: [80, 90, 70, 85, 60],
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Applications Over Time",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            color: "#EAEAEA",
          },
        },
      },
      title: {
        text: "Applications Over Time",
        align: "center",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#EAEAEA",
        },
      },
      theme: {
        mode: "dark",
        palette: "palette4",
      },
    },
    series: [],
  });

  const [areaChartData, setAreaChartData] = useState({
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Applications",
          style: {
            fontSize: "16px",
            fontWeight: 600,
            color: "#EAEAEA",
          },
        },
      },
      title: {
        text: "Applications by Month",
        align: "center",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#EAEAEA",
        },
      },
      theme: {
        mode: "dark",
        palette: "palette5",
      },
    },
    series: [],
  });

  const [heatmapChartData, setHeatmapChartData] = useState({
    options: {
      chart: {
        type: "heatmap",
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 10, color: "#00A100" },
              { from: 11, to: 20, color: "#128FD9" },
              { from: 21, to: 30, color: "#FFB200" },
              { from: 31, to: 40, color: "#FF0000" },
            ],
          },
        },
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: {
          style: {
            fontSize: "14px",
          },
        },
      },
      title: {
        text: "Applications Heatmap",
        align: "center",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#EAEAEA",
        },
      },
      theme: {
        mode: "dark",
        palette: "palette6",
      },
    },
    series: [
      {
        name: "Applications",
        data: Array.from({ length: 7 }, (_, index) => ({
          x: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index],
          y: Math.floor(Math.random() * 40),
        })),
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    options: {
      chart: {
        type: "pie",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#EAEAEA",
      },
      labels: [],
      theme: {
        mode: "dark",
        palette: "palette7",
      },
    },
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applications = await fetchApplications();

        // Initialize counters for each status
        const statusCounts = {
          applied: 0,
          offer_received: 0,
          hired: 0,
          rejected: 0,
          interview_scheduled: 0,
          interview_in_progress: 0,
          interview_completed: 0,
        };

        // Initialize data for line chart
        const monthlyApplications = Array(12).fill(0);

        // Process applications to count each status
        applications.forEach((app) => {
          if (statusCounts.hasOwnProperty(app.status)) {
            statusCounts[app.status]++;
          }

          // Increment the appropriate month for the area chart
          const applicationDate = new Date(app.date);
          monthlyApplications[applicationDate.getMonth()]++;
        });

        // Prepare data for charts
        const categories = [
          "Applied",
          "Offer Received",
          "Hired",
          "Rejected",
          "Interview Scheduled",
          "Interview In Progress",
          "Interview Completed",
        ];

        // Update barChartData state
        setBarChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
            colors: [
              "#1E3A8A",
              "#FBBF24",
              "#10B981",
              "#EF4444",
              "#3B82F6",
              "#6366F1",
              "#8B5CF6",
            ],
          },
          series: [
            {
              name: "Applications",
              data: [
                statusCounts.applied,
                statusCounts.offer_received,
                statusCounts.hired,
                statusCounts.rejected,
                statusCounts.interview_scheduled,
                statusCounts.interview_in_progress,
                statusCounts.interview_completed,
              ],
            },
          ],
        }));

        // Update lineChartData state
        setLineChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
          series: [
            {
              name: "Applications",
              data: [
                statusCounts.applied,
                statusCounts.offer_received,
                statusCounts.hired,
                statusCounts.rejected,
                statusCounts.interview_scheduled,
                statusCounts.interview_in_progress,
                statusCounts.interview_completed,
              ],
            },
          ],
        }));

        // Update areaChartData state
        setAreaChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          },
          series: [
            {
              name: "Applications",
              data: monthlyApplications,
            },
          ],
        }));

        // Update pieChartData state
        const pieData = Object.keys(statusCounts).map((status) => ({
          x: status,
          y: statusCounts[status],
        }));

        setPieChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            labels: Object.keys(statusCounts),
          },
          series: Object.values(statusCounts),
        }));
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gradient-to-r from-violet-600  via-black to-blue-600 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Job Application Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="Job Application Statuses">
            <ReactApexChart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              height={350}
            />
          </ChartCard>
          <ChartCard title="Skill Set Match">
            <ReactApexChart
              options={radarChartData.options}
              series={radarChartData.series}
              type="radar"
              height={350}
            />
          </ChartCard>
          <ChartCard title="Applications Over Time">
            <ReactApexChart
              options={lineChartData.options}
              series={lineChartData.series}
              type="line"
              height={350}
            />
          </ChartCard>
          <ChartCard title="Applications by Month">
            <ReactApexChart
              options={areaChartData.options}
              series={areaChartData.series}
              type="area"
              height={350}
            />
          </ChartCard>
          <ChartCard title="Applications Heatmap">
            <ReactApexChart
              options={heatmapChartData.options}
              series={heatmapChartData.series}
              type="heatmap"
              height={350}
            />
          </ChartCard>
          <ChartCard title="Job Application Status Distribution">
            <ReactApexChart
              options={pieChartData.options}
              series={pieChartData.series}
              type="pie"
              height={350}
            />
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    {children}
  </div>
);

export default Statistics;
