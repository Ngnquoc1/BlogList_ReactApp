import apiClient from "./apiClient";

const getAll = async () => {
  const { data } = await apiClient.get("/blogs");
  return data;
};
const getById = async (id) => {
  const { data } = await apiClient.get(`/blogs/${id}`);
  return data;
};
const create = async (newObject) => {
  const { data } = await apiClient.post("/blogs", newObject);
  return data;
};
const remove = async (id) => {
  const { data } = await apiClient.delete(`/blogs/${id}`);
  return data;
};
const update = async (id, newObject) => {
  const { data } = await apiClient.put(`/blogs/${id}`, newObject);
  return data;
};
const comment = async (id, comment) => {
  const { data } = await apiClient.post(`/blogs/${id}/comments`, { comment });
  return data;
};
const like = async (id) => {
  const { data } = await apiClient.put(`/blogs/${id}/like`);
  return data;
};
export default { getAll, getById, create, remove, update, comment, like };
