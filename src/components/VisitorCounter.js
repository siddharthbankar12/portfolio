import React from "react";
import { Container, Segment, Header, Icon } from "semantic-ui-react";
import useVisitorTracker from "../hooks/useVisitorTracker";

const VisitorCounter = () => {
  const { visitorCount } = useVisitorTracker();

  return (
    <Container textAlign="center" style={{ marginTop: "2rem" }}>
      <Segment placeholder>
        <Header as="h2" color="teal">
          <Icon name="eye" />
          Visitor Counter
        </Header>
        <Header as="h1" color="blue">
          {(visitorCount || 0).toLocaleString()}
        </Header>
        <p style={{ color: "#666" }}>people have visited this portfolio</p>
      </Segment>
    </Container>
  );
};

export default VisitorCounter;
