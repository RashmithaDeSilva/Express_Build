import UserDAO from "../DAOs/UserDAO";
import UserService from "./UserService";


export async function getUserService(): Promise<UserService> {
    const userDAO = new UserDAO();
    return new UserService(userDAO);
}