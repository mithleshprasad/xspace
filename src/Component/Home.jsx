import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LaunchList from './LauchList';
export default function Home() {
  return (
    <>
   
   <div className="App">
      <header className="App-header text-center">
        <h1>SpaceX Launches</h1>
      </header>
      <main>
        <LaunchList />
      </main>
    </div>
    </>
  );
}
