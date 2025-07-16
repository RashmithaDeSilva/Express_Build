import UserDAO from '../DAOs/UserDAO';
import User from '../interfaces/User';

export default class UserService {
  private userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  async getUsers(): Promise<User[]> {
    try {
      return this.userDAO.getUsers();

    } catch (error) {
      throw error;
    }
  }

  async getUserNames(): Promise<string[]> {
    try {
      const users = await this.userDAO.getUsers();
      return users.map(user => user.name);

    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      return await this.userDAO.createUser(user);

    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      return await this.userDAO.updateUser(id, user);

    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      return await this.userDAO.deleteUser(id);
      
    } catch (error) {
      throw error;
    }
  }
}
