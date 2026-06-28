import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import Blog from "../components/Blog";
import CreateBlogForm from "../components/CreateBlogForm";
describe("<Blog />", () => {
  const blog = {
    title: "I Love you",
    author: "Shawn",
    url: "asddad.com",
    likes: 2,
    user: {
      username: "test",
      id: "68a98d11bf01f3ffd683890b"
    },
    id: "68a992f8b05302ecdc7e13ea"
  };

  const user = {
    username: "test",
    blogs: [
      {
        title: "I Love you",
        author: "Shawn",
        url: "asddad.com",
        id: "68a992f8b05302ecdc7e13ea"
      }
    ],
    id: "68a98d11bf01f3ffd683890b"
  };

  const mockUpdateBlog = vi.fn();
  const mockRemoveBlog = vi.fn();
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleUpdateBlog={mockUpdateBlog}
        handleRemoveBlog={mockRemoveBlog}
        user={user}
      />
    );
  });

  test("renders the title and author by default, but does not render the url or likes by default", () => {
    const defaultView = component.container.querySelector(".blog-default");
    expect(defaultView).toHaveTextContent(blog.title);
    expect(defaultView).toHaveTextContent(blog.author);
    expect(defaultView).not.toHaveTextContent(blog.url);
    expect(defaultView).not.toHaveTextContent(blog.likes);
  });

  test("renders the url and likes after the \View' button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const div = component.container.querySelector(".blog-details");
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);
  });
  test("like button when clicked twice calls the corresponding event handler twice", async () => {
    const user = userEvent.setup();

    // Click view button first
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    // Then click like button twice
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
  });
});
describe("Create Blog Form", () => {
  let component;

  const blogObject = {
    title: "Example Blog",
    author: "Jane Doe",
    url: "http://www.example.com/blog",
    likes: 0,
  };

  const mockAddBlog = vi.fn();

  beforeEach(() => {
    component = render(
      <CreateBlogForm handleCreateBlog={mockAddBlog} />
    );
  });
  test("calls the addBlog fn with the correct details during a submit event", async () => {
    const form = component.container.querySelector("form");
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText(/Title/i);
    const authorInput = screen.getByLabelText(/Author/i);
    const urlInput = screen.getByLabelText(/URL/i);

    await user.type(titleInput, blogObject.title);
    await user.type(authorInput, blogObject.author);
    await user.type(urlInput, blogObject.url);

    const createBtn = screen.getByText("Create");
    await user.click(createBtn);
    expect(mockAddBlog).toHaveBeenCalledWith({
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: 0
    });
  });
});
