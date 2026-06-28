import { Card, Row, Col, Placeholder } from "react-bootstrap";

export const StatsCardSkeleton = () => {
  return (
    <Card className="text-center shadow-sm">
      <Card.Body>
        <Placeholder as="div" animation="glow">
          <div style={{ height: "40px", marginBottom: "8px" }}>
            <Placeholder xs={12} style={{ height: "40px" }} />
          </div>
          <Placeholder xs={8} size="lg" />
          <Placeholder xs={12} size="sm" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

const StatsSkeleton = () => {
  return (
    <>
      <Row className="mb-4">
        {[1, 2, 3, 4].map(i => (
          <Col md={3} key={i}>
            <StatsCardSkeleton />
          </Col>
        ))}
      </Row>

      <Card className="mb-4 shadow-sm">
        <Card.Header>
          <Placeholder as="h4" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </Card.Header>
        <Card.Body>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={7} size="lg" />
            <Placeholder xs={4} />
            <Placeholder xs={5} />
          </Placeholder>
        </Card.Body>
      </Card>
    </>
  );
};

export default StatsSkeleton;
