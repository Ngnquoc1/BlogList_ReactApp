import apiClient from "./apiClient";

const getAll = async () => {
  const { data } = await apiClient.get("/users");
  return data;
};
// const create = async (newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   try {
//     const response = await axios.post(baseUrl, newObject, config)
//     return response.data
//   } catch (error) {
//     console.error('Error creating blog:', error.response?.data || error.message)
//     throw error
//   }

// }
// const remove = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.delete(`${baseUrl}/${id}`, config)
//   return response.data
// }
// const update = async (id, newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
//   return response.data
// }
export default { getAll };
