import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "./dashboardPage.css";
import { getPayments } from "../../handlers/APIController";

function DashboardPage() {
  const [paymentData, setPaymentData] = useState<Array<[string, number]>>([
    ["Jan 1", 0],
    ["Jan 2", 0],
    ["Jan 3", 0],
  ]);
  const [revenueData, setRevenueData] = useState<Array<[string, number]>>([
    ["Jan 1", 0],
    ["Jan 2", 0],
    ["Jan 3", 0],
  ]);

  // Payment Revenue
  useEffect(() => {
    const months = [
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
    ];
    const fetch = async () => {
      const data = await getPayments();
      const dateCounts: Record<string, number> = {};
      const result: Array<[string, number]> = [];

      data.forEach((item) => {
        if (item.status !== "COMPLETED") return;

        const isoString = item.createdAt;
        const date = new Date(isoString);
        const curr_date = `${months[date.getMonth() + 1]} ${date.getDate()}`;

        dateCounts[curr_date] = (dateCounts[curr_date] || 0) + 1;
      });

      for (const [date, count] of Object.entries(dateCounts)) {
        result.push([date, count]);
      }

      setPaymentData(result);
    };

    const fetchRevenue = async () => {
      const data = await getPayments();
      const dateCounts: Record<string, number> = {};
      const result: Array<[string, number]> = [];

      data.forEach((item) => {
        const isoString = item.createdAt;
        const date = new Date(isoString);
        const curr_date = `${months[date.getMonth() + 1]} ${date.getDate()}`;

        dateCounts[curr_date] = (dateCounts[curr_date] || 0) + item.amount;
      });

      for (const [date, count] of Object.entries(dateCounts)) {
        result.push([date, count]);
      }

      setRevenueData(result);
    };

    fetch();
    fetchRevenue();
  }, []);

  const chartOptions = {
    animation: {
      startup: false,
      easing: "linear",
      duration: 1000,
    },
  };

  const barChartOptions = {
    animation: {
      startup: false,
      easing: 'inAndOut',
      duration: 1000,
    },
  };


  return (
    <div className="super-dashboard-wrapper">
      {/* MORE CHARTS HERE https://www.react-google-charts.com/examples */}
      <div className="row">
        <div className="section">
          <div className="header">Amount of Subscribers</div>
          <Chart
            style={{ padding: 0, margin: 0 }}
            chartType="LineChart"
            data={[["Day", "Subscribers"], ...paymentData]}
            legendToggle
            options={chartOptions}
          />
        </div>

        <div className="section">
          <div className="header">Revenue</div>
          <Chart
            chartType="ColumnChart"
            data={[["Day", "Revenue"], ...revenueData]}
            legendToggle
            options={barChartOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
