import React, { useState, useEffect } from "react";
import { Container, Segment, Header, Icon } from "semantic-ui-react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const backendUrl =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
        const response = await fetch(`${backendUrl}/api/visitor-count`);
        const data = await response.json();
        setVisitorCount(data.count || 0);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setVisitorCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();

    // Refresh count every 5 minutes
    const interval = setInterval(fetchVisitorCount, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container textAlign="center" style={{ marginTop: "2rem" }}>
        <Segment placeholder>
          <Header color="teal">
            <Icon name="eye" />
            Tracking visitors...
          </Header>
        </Segment>
      </Container>
    );
  }

  return (
    <Container textAlign="center" style={{ marginTop: "2rem" }}>
      <Segment placeholder>
        <Header as="h2" color="teal">
          <Icon name="eye" />
          Visitor Counter
        </Header>
        <Header as="h1" color="blue">
          {visitorCount.toLocaleString()}
        </Header>
        <p style={{ color: "#666" }}>people have visited this portfolio</p>
      </Segment>
    </Container>
  );
};

export default VisitorCounter;
