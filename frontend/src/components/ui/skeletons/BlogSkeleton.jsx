import { Card, Placeholder } from "react-bootstrap";

const BlogSkeleton = () => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={4} /> <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={6} /> <Placeholder xs={2} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={3} />
      </Card.Body>
    </Card>
  );
};

export const BlogListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(i => (
        <BlogSkeleton key={i} />
      ))}
    </>
  );
};

export default BlogSkeleton;
