import { useState } from 'react';
import '../App.css'
import NavBar from '../component/NavBar';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Chart from 'chart.js/auto'

function Profile() {
  return (
    <Container>
      <NavBar />
      <Container className="mt-5 p-5">
        <h1>Profile</h1>
      </Container>
    </Container>
  );
}

export default Profile;
