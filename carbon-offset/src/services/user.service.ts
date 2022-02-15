import { AnyRecord } from "dns";
import http from "../http-common";
import IUserData from "../types/user.type"
class UserDataService {
  getAllProjects(userId: number) {
    return http.get<any>("/projects?created_by=" + userId);
  }
  getProjectById(id: number) {
    return http.get<any>(`/project/${id}`);
  }
  addProject(data: any) {
    return http.post<any>(`/addProject`, data);
  }
  deleteProject(projetctId: number) {
    return http.delete<any>("/deleteProject/" + projetctId);
  }
  updateProject(data: any, id: number) {
    return http.put<any>(`/updateProject/${id}`, data);
  }
  create(data: IUserData) {
    return http.post<IUserData>("/registeruser", data);
  }
  find(data: IUserData) {
    return http.post<IUserData>("/authenticateUser", data);
  }
  update(data: IUserData, id: any) {
    return http.put<any>(`/projects/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/projects/${id}`);
  }

}
export default new UserDataService();