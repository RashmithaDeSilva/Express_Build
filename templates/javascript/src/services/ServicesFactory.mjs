import UserDAO from "../DAOs/UserDAO.mjs";
import UserService from "./UserService.mjs";

export async function getUserService() {
  const userDAO = new UserDAO();
  return new UserService(userDAO);
}
