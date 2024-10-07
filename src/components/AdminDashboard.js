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
    const fetchSupportMessages = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_support_messages.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSupportMessages(data);
      } catch (error) {
        console.error('Error fetching support messages:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_orders.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrdersData(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_total_orders.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTotalOrders(data.total_orders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    const fetchTotalSales = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_total_users.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTotalSales(data.total_users); // Use `total_users` to match PHP response
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    const fetchTotalMoney = async () => {
      try {
        const response = await fetch('http://localhost/ecommerce-site/src/Backend/get_total_money.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTotalMoney(Number(data.total_money) || 0); // Convert to number and fallback to 0
      } catch (error) {
        console.error('Error fetching total money:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchSupportMessages(),
        fetchOrders(),
        fetchTotalOrders(),
        fetchTotalSales(),
        fetchTotalMoney()
      ]);
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
      <div className="row">
        <div className="col-md-12 mb-4">
          {/* Stats Speed Circles */}
          <div className="d-flex justify-content-around mb-4">
            <div className="text-center">
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
              <p className="mt-2">Total Orders Confirmed</p>
            </div>
            <div className="text-center">
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
              <p className="mt-2">Total Clients</p>
            </div>
            <div className="text-center">
              <CircularProgressbar
                value={totalMoney}
                maxValue={maxTotalMoney} // Set the maximum value for the progress bar
                text={`${totalMoney.toFixed(2)} Dhs`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#ffc107',
                  textColor: '#ffc107',
                  trailColor: '#e9ecef',
                })}
              />
              <p className="mt-2">Total Money Sold</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h3>Support Messages</h3>
          {loading ? (
            <p>Loading support messages...</p>
          ) : (
            <ul>
              {supportMessages.map(message => (
                <li key={message.id}>
                  <strong>Name:</strong> {message.name} <br />
                  <strong>Email:</strong> {message.email} <br />
                  <strong>Message:</strong> {message.message} <br />
                  <small>Received at: {new Date(message.created_at).toLocaleString()}</small>
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
