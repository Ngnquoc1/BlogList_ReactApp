import { useUsers } from "../hooks/queries/useUsers";
import { Container, Table, Card, Badge } from "react-bootstrap";
import { FiUser, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import UserSkeleton from "../components/ui/skeletons/UserSkeleton";
import { motion } from "framer-motion";
import ErrorState from "../components/ui/ErrorState";

const UsersPage = () => {
  const { data: users = [], isPending, isError, refetch } = useUsers();

  if (isPending) {
    return <UserSkeleton />;
  }

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <Container className="mt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="shadow border-0 mb-4">
          <Card.Header className=" border-0 pt-4 pb-3">
            <h2 className="mb-0 d-flex align-items-center">
              <FiUser className="me-2" />
              Users
              <Badge bg="primary" className="ms-2">
                {users.length}
              </Badge>
            </h2>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th className="ps-4">User</th>
                  <th className="text-center">
                    <FiFileText className="me-1" />
                    Blogs Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="ps-4">
                      <Link
                        to={`/users/${user.id}`}
                        className="text-decoration-none d-flex align-items-center"
                        style={{ color: "inherit" }}
                      >
                        <Avatar
                          username={user.username}
                          size="sm"
                          className="me-3"
                        />
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <small className="text-muted">@{user.username}</small>
                        </div>
                      </Link>
                    </td>
                    <td className="text-center align-middle">
                      <Badge
                        bg={user.blogs.length > 0 ? "primary" : "secondary"}
                        style={{ fontSize: "0.875rem", minWidth: "40px" }}
                      >
                        {user.blogs.length}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};
export default UsersPage;
