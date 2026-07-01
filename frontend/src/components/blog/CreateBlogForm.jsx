import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../../hooks/queries/useCreateBlog";

import {
  Form,
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FiEdit, FiLink, FiUser, FiImage, FiFileText } from "react-icons/fi";
import TagInput from "./TagInput";
import MarkdownEditor from "./MarkdownEditor";

const CreateBlogForm = () => {
  const createBlogMutation = useCreateBlog();

  const { values, fields, resetForm } = useForm({
    title: "",
    author: "",
    url: "",
  });

  const [tags, setTags] = useState([]);
  const [type, setType] = useState("link");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const isArticle = type === "article";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const base = {
      title: values.title.trim(),
      author: values.author.trim(),
      type,
      tags,
    };
    const newBlog = isArticle
      ? { ...base, content, coverUrl }
      : { ...base, url: values.url.trim() };

    createBlogMutation.mutate(newBlog, {
      onSuccess: (created) => {
        resetForm();
        setTags([]);
        setContent("");
        setCoverUrl("");
        setType("link");
        navigate(`/blogs/${created.id}`);
      },
    });
  };

  const isSubmitting = createBlogMutation.isPending;

  const isInvalid =
    isSubmitting ||
    !values.title.trim() ||
    !values.author.trim() ||
    (isArticle ? !content.trim() : !values.url.trim());

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header as="h5">Create New Blog</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <div>
                    <ButtonGroup>
                      <Button
                        type="button"
                        variant={isArticle ? "outline-primary" : "primary"}
                        onClick={() => setType("link")}
                      >
                        <FiLink className="me-1" />
                        Link
                      </Button>
                      <Button
                        type="button"
                        variant={isArticle ? "primary" : "outline-primary"}
                        onClick={() => setType("article")}
                      >
                        <FiFileText className="me-1" />
                        Article
                      </Button>
                    </ButtonGroup>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>
                    <FiEdit className="me-2" />
                    Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={fields.title.value}
                    onChange={fields.title.onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAuthor">
                  <Form.Label>
                    <FiUser className="me-2" />
                    Author
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    value={fields.author.value}
                    onChange={fields.author.onChange}
                    required
                  />
                </Form.Group>

                {!isArticle && (
                  <Form.Group className="mb-3" controlId="formUrl">
                    <Form.Label>
                      <FiLink className="me-2" />
                      URL
                    </Form.Label>
                    <Form.Control
                      type="url"
                      name="url"
                      placeholder="Enter blog URL"
                      value={fields.url.value}
                      onChange={fields.url.onChange}
                    />
                  </Form.Group>
                )}

                {isArticle && (
                  <>
                    <Form.Group className="mb-3" controlId="formCover">
                      <Form.Label>
                        <FiImage className="me-2" />
                        Cover image URL (optional)
                      </Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://…"
                        value={coverUrl}
                        onChange={(e) => setCoverUrl(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FiFileText className="me-2" />
                        Content (Markdown)
                      </Form.Label>
                      <MarkdownEditor value={content} onChange={setContent} />
                    </Form.Group>
                  </>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <TagInput tags={tags} onChange={setTags} />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={isInvalid}>
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlogForm;
