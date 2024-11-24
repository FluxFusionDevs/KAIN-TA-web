import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Chart } from "react-google-charts";

import './dashboardPage.css'
import { getPayments } from "../../handlers/APIController";

function DashboardPage() {
  const [paymentData, setPaymentData] = useState<Array<[string, number]>>([]);
  const [revenueData, setRevenueData] = useState<Array<[string, number]>>([]);

  // Payment Revenue
  useEffect(() => {
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const fetch = async () => {
      const data = await getPayments();
      const dateCounts: Record<string, number> = {};
      const result: Array<[string, number]> = [];

    
      data.forEach((item) => {
        const isoString = item.createdAt;
        const date = new Date(isoString);
        const curr_date = `${months[date.getMonth() + 1]} ${date.getDate()}`;

      
        dateCounts[curr_date] = (dateCounts[curr_date] || 0) + 1;
      });

    
      for (const [date, count] of Object.entries(dateCounts)) {
        result.push([date, count]);
      }

      setPaymentData(result);
    }

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
      }

    fetch();
    fetchRevenue();
  }, [])

  return (
    <div className="super-dashboard-wrapper">
      {/* MORE CHARTS HERE https://www.react-google-charts.com/examples */}
      <div className="row">
        <div className="section">
          <div className="header">
            Amount of Subscribers
          </div>
          <Chart
            style={{padding: 0, margin: 0}}
            chartType="LineChart"
            data={[
              ["Day", "Subscribers"],
              ...paymentData
            ]}
            legendToggle />
        </div>

        <div className="section">
        <div className="header">
            Revenue
          </div>
        <Chart
          chartType="Bar"
          data={[
            ["Day", "Subscribers"],
            ...revenueData
          ]}
          legendToggle />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
