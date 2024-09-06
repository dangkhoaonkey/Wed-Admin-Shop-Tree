import { useState } from 'react';
import '../App.css'
import NavBar from '../component/NavBar';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

function Home() {

  return (
    <Container>
      <NavBar />
      <Container className="mt-5 p-5">
        <h1 className="text-center">Dashboard</h1>
        <h3 className="text-center">Thống kê sản phẩm</h3>
        <Bar
          data={{
            labels: [
              "Cây trồng",
              "Chậu cây trồng",
              "Phụ kiện chăm sóc",
            ],
            datasets: [
              {
                label: "Số lượng",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                ],
                data: [100, 4, 2]
              }
            ]
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Số lượng sản phẩm theo loại"
            }
          }}
        />
      </Container>
    </Container>

  );
}

export default Home;
