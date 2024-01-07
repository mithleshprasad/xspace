// src/components/LaunchCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './LaunchCard.css';

const LaunchCard = ({ launch }) => {
    return (
      <Card className="launch-card">
        <Card.Img variant="top" src={launch.links.mission_patch_small} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{launch.mission_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Rocket: {launch.rocket.rocket_name}
          </Card.Subtitle>
          <Card.Text className="launch-details" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {launch.details}
          </Card.Text>
          <Card.Link href={launch.links.article_link} target="_blank">
            Article Link
          </Card.Link>
          <Card.Link href={launch.links.video_link} target="_blank">
            Video Link
          </Card.Link>
        </Card.Body>
      </Card>
    );
  };
  

export default LaunchCard;

        // <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>