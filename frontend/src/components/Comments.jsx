import CommentForm from './CommentForm'
import { Card, ListGroup } from 'react-bootstrap'

const Comments =({ blog }) => {
  const comments=blog.comments
  return (
    <Card className='mt-3'>
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <ListGroup variant="flush">
          {comments.map((cmt, index) => (
            <ListGroup.Item key={index}>{cmt}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <CommentForm blog={blog} />
      </Card.Footer>
    </Card>
  )
}
export default Comments