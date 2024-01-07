// // src/components/LaunchList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import LaunchCard from './LauchCard';
// import Pagination from 'react-bootstrap/Pagination';
// import { Container } from 'react-bootstrap';

// const LaunchList = () => {
//   const [launches, setLaunches] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchLaunches = async () => {
//       try {
//         const response = await axios.get('https://api.spacexdata.com/v3/launches');
//         setLaunches(response.data);
//       } catch (error) {
//         console.error('Error fetching launches:', error);
//       }
//     };

//     fetchLaunches();
//   }, []);

//   const cardsPerPage = 10;
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentLaunches = launches.slice(indexOfFirstCard, indexOfLastCard);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (

//     <div className="container">
//       <div className="row">
//         {currentLaunches.map((launch) => (
//           <div key={launch.flight_number} className="col-md-4 mb-3">
//             <LaunchCard launch={launch} />
//           </div>
//         ))}
//       </div>
//       <Pagination>
//         {[...Array(Math.ceil(launches.length / cardsPerPage)).keys()].map((number) => (
//           <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
//             {number + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//     </div>
 
//      );
// };

// export default LaunchList;
// src/components/LaunchList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LaunchCard from './LauchCard';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    rocketName: '',
    launchDate: '',
    launchStatus: '',
    isUpcoming: false,
  });

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await axios.get('https://api.spacexdata.com/v3/launches');
        setLaunches(response.data);
        setFilteredLaunches(response.data);
      } catch (error) {
        console.error('Error fetching launches:', error);
      }
    };

    fetchLaunches();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const applyFilters = () => {
    let filteredData = launches;

    // Apply Rocket Name filter
    if (filters.rocketName) {
      filteredData = filteredData.filter((launch) =>
        launch.rocket.rocket_name.toLowerCase().includes(filters.rocketName.toLowerCase())
      );
    }

    // Apply Launch Date filter
    if (filters.launchDate) {
      const today = new Date();
      const filterDate = new Date(filters.launchDate);

      if (filters.launchDate === 'lastWeek') {
        today.setDate(today.getDate() - 7);
      } else if (filters.launchDate === 'lastMonth') {
        today.setMonth(today.getMonth() - 1);
      } else if (filters.launchDate === 'lastYear') {
        today.setFullYear(today.getFullYear() - 1);
      }

      filteredData = filteredData.filter((launch) => new Date(launch.launch_date_utc) > today);
    }

    // Apply Launch Status filter
    if (filters.launchStatus) {
      filteredData = filteredData.filter((launch) => {
        if (filters.launchStatus === 'success') {
          return launch.launch_success === true;
        } else if (filters.launchStatus === 'failure') {
          return launch.launch_success === false;
        }
        return true;
      });
    }

    // Apply Is Upcoming filter
    if (filters.isUpcoming) {
      const today = new Date();
      filteredData = filteredData.filter((launch) => new Date(launch.launch_date_utc) > today);
    }

    setFilteredLaunches(filteredData);
  };

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [filters, launches]);

  const cardsPerPage = 10;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
    <Form className="filters">
      <Row className="align-items-center">
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Search by Rocket Name"
            value={filters.rocketName}
            onChange={(e) => handleFilterChange('rocketName', e.target.value)}
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            as="select"
            value={filters.launchDate}
            onChange={(e) => handleFilterChange('launchDate', e.target.value)}
          >
            <option value="">Select Launch Date</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
          </Form.Control>
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            as="select"
            value={filters.launchStatus}
            onChange={(e) => handleFilterChange('launchStatus', e.target.value)}
          >
            <option value="">Select Launch Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </Form.Control>
        </Col>
        <Col xs={12} md={2}>
          <Form.Check
            type="checkbox"
            label="Is it upcoming?"
            checked={filters.isUpcoming}
            onChange={() => handleFilterChange('isUpcoming', !filters.isUpcoming)}
          />
        </Col>
        <Col xs={12} md={1}>
          <Button type='btn' variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        

        </Col>
      </Row>
    </Form>
    <Row>
      {currentLaunches.map((launch) => (
        <Col key={launch.flight_number} xs={12} md={4} className="mb-3">
          <LaunchCard launch={launch} />
        </Col>
      ))}
    </Row>
    <Pagination>
      {[...Array(Math.ceil(filteredLaunches.length / cardsPerPage)).keys()].map((number) => (
        <Pagination.Item
          key={number + 1}
          active={number + 1 === currentPage}
          onClick={() => paginate(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  </div>
  );
};

export default LaunchList;
