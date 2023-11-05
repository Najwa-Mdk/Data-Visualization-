import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { setPeriod } from '../redux/actions';

const DataVisualization = ({ selectedPeriod }) => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  

  const chartData = {
    labels: products.map((product) => product.title),
    datasets: [
      {
        label: 'Ratings',
        data: products.map((product) => product.rating.rate),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
 
  const chartOptions = {
    scales: {
        y: {
          beginAtZero: true,
          max: 5, 
        },
      },
    };
    
    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        dispatch(setPeriod(newPeriod));
    };


  return (
    <div className="data-visualization">
      <div className="period-selector">
        <label htmlFor="period">Select Period:</label>
        <select id="period" value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="month">Month</option>
          <option value="day">Day</option>
        </select>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPeriod: state.selectedPeriod,
});

export default connect(mapStateToProps)(DataVisualization);