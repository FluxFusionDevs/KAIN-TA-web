import { useState } from "react";
import { Button } from "@mui/material";
import { Chart } from "react-google-charts";

import './dashboardPage.css'

function DashboardPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  return (
    <div className="wrapper">
      {/* MORE CHARTS HERE https://www.react-google-charts.com/examples */}
      <Chart
        chartType="LineChart"
        data={[
          ["Day", "Subscribers"],
          [1, 3],
          [2, 7],
          [3, 1],
          [4, 11],
          [6, 3],
          [7, 8],
          [8, 3],
          [9, 11],
          [10, 4],
          [11, 3],
          [12, 16],
          [13, 11],
          [14, 25],
          [15, 20],
          [16, 19],
          [17, 23],
        ]}
        width="100%"
        height="400px"
        legendToggle />
    </div>
  );
}

const styles = {
  table: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  selected_button: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  section: {
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    width: 150,
  },
  text_input: {
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
  },
  sub_header: {},
  sidebar: {
    backgroundColor: "#2673DD",
    width: 260,
    color: "white",
  },
  selected_sidebar_button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  sidebar_button: {
    width: "100%",
    color: "white",
    borderRadius: 20
  },
  tab_button: {
    width: "100%",
    color: "black",
  },
};

export default DashboardPage;
