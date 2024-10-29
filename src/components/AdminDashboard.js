import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [supportMessages, setSupportMessages] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all data in parallel
    const fetchData = async () => {
      try {
        const [supportResponse, ordersResponse, totalOrdersResponse, totalSalesResponse, totalMoneyResponse] = await Promise.all([
          fetch('http://localhost/ecommerce-site/src/Backend/get_support_messages.php'),
          fetch('http://localhost/ecommerce-site/src/Backend/get_orders.php'),
          fetch('http://localhost/ecommerce-site/src/Backend/get_total_orders.php'),
          fetch('http://localhost/ecommerce-site/src/Backend/get_total_users.php'),
          fetch('http://localhost/ecommerce-site/src/Backend/get_total_money.php'),
        ]);

        setSupportMessages(await supportResponse.json());
        setOrdersData(await ordersResponse.json());
        setTotalOrders((await totalOrdersResponse.json()).total_orders);
        setTotalSales((await totalSalesResponse.json()).total_users);
        setTotalMoney(Number((await totalMoneyResponse.json()).total_money) || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const ordersCountByDay = ordersData.reduce((acc, order) => {
    const day = new Date(order.created_at).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const productsSoldByCategory = ordersData.flatMap(order => 
    order.items.map(item => item.product_name)
  ).reduce((acc, product) => {
    acc[product] = (acc[product] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(ordersCountByDay);
  const ordersCount = Object.values(ordersCountByDay);

  const productNames = Object.keys(productsSoldByCategory);
  const productsSold = Object.values(productsSoldByCategory);

  const ordersChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Number of Orders per Day',
        data: ordersCount,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const productsChartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Products Sold',
        data: productsSold,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const maxTotalMoney = 100000; // Set the maximum value for the totalMoney circular progress bar

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-12">
          <h2 className="mb-4 text-center">Admin Dashboard</h2>
          <div className="d-flex justify-content-around text-center">
            {/* Total Orders Card */}
            <div className="card shadow-sm p-4">
              <CircularProgressbar
                value={totalOrders}
                text={`${totalOrders}`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#007bff',
                  textColor: '#007bff',
                  trailColor: '#e9ecef',
                })}
              />
              <p className="mt-3">Total Orders</p>
            </div>
            {/* Total Sales Card */}
            <div className="card shadow-sm p-4">
              <CircularProgressbar
                value={totalSales}
                text={`${totalSales}`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#28a745',
                  textColor: '#28a745',
                  trailColor: '#e9ecef',
                })}
              />
              <p className="mt-3">Total Clients</p>
            </div>
            {/* Total Money Sold Card */}
            <div className="card shadow-sm p-4">
              <CircularProgressbar
                value={totalMoney}
                maxValue={maxTotalMoney}
                text={`${totalMoney.toFixed(2)} Dhs`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#ffc107',
                  textColor: '#ffc107',
                  trailColor: '#e9ecef',
                })}
              />
              <p className="mt-3">Total Money Sold</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          {/* Support Messages */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Support Messages</h3>
              {loading ? (
                <p>Loading support messages...</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {supportMessages.map(message => (
                    <li key={message.id} className="list-group-item">
                      <strong>Name:</strong> {message.name} <br />
                      <strong>Email:</strong> {message.email} <br />
                      <strong>Message:</strong> {message.message} <br />
                      <small>Received at: {new Date(message.created_at).toLocaleString()}</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          {/* Orders Chart */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3>Orders Over Time</h3>
              <Line data={ordersChartData} />
            </div>
          </div>

          {/* Products Sold Chart */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>Products Sold by Category</h3>
              <Bar data={productsChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
