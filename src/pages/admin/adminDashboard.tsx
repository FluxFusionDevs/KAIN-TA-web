import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import './dashboardPage.css';
import { EstablishmentModel } from '../../models/establishmentModel';

type Props = {
  establishment: EstablishmentModel;
};

function AdminDashboard({ establishment }: Props) {
  const [ratingData, setSetRatingData] = useState<Array<[string, number]>>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRaters, setTotalRaters] = useState<number>(0);

  // Payment Revenue
  useEffect(() => {
    const generatePieChartData = async () => {
      const ratingCounts: Record<string, number> = {};
      const result: Array<[string, number]> = [];
      let total_rating = 0;

      establishment.ratings.forEach((item) => {
        const rating_val = item.rating;
        total_rating += item.rating;

        ratingCounts[rating_val] = (ratingCounts[rating_val] || 0) + 1;
      });

      for (const [date, count] of Object.entries(ratingCounts)) {
        result.push([date, count]);
      }

      setTotalRaters(establishment.ratings.length);
      setAverageRating(total_rating / establishment.ratings.length);
      setSetRatingData(result);
    };

    generatePieChartData();
  }, []);

  const chartOptions = {
    animation: {
      startup: false,
      easing: 'linear',
      duration: 1000,
    },
  };

  return (
    <div className="super-dashboard-wrapper">
      {/* MORE CHARTS HERE https://www.react-google-charts.com/examples */}
      <div className="row">
        <div className="section">
          <div className="header" style={{ fontSize: 36 }}>
            Number of Ratings %
          </div>
          <Chart
            style={{ padding: 0, margin: 0 }}
            chartType="PieChart"
            data={[['Rating', 'Value'], ...ratingData]}
            legendToggle
            options={chartOptions}
          />
        </div>

        <div className="section">
          <div className="header" style={{ fontSize: 36 }}>
            Average Ratings
          </div>
          <div className="header" style={{ fontSize: 22 }}>
            {averageRating.toPrecision(2)} / 5 ({totalRaters})
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
