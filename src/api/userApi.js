import { userAxiosInstance } from "./axiosInstance";

export const userRegister = async (signupData) => {
  const data = await userAxiosInstance.post("/", signupData);
  return data;
};
export const getStudents = async (search,sort,page,rowsPerPage,sortItem) => {
  const data = await userAxiosInstance.get(`/students?sort=${sort}&search=${search}&pageNumber=${page}&rowsPerPage=${rowsPerPage}&sortItem=${sortItem}`)
  return data
}

export const deleteStudent = async(studentId) => {
  const data = await userAxiosInstance.get(`/delete?id=${studentId}`)
  return data
}

export const editStudent = async (formData) => {
  const data = await userAxiosInstance.post('/editStudent',formData)
  return data
}
