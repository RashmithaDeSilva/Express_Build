import UserDAO from '../DAOs/UserDAO.mjs';

export default class UserService {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  async getUsers() {
    try {
      return await this.userDAO.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUserNames() {
    try {
      const users = await this.userDAO.getUsers();
      return users.map(user => user.name);
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      return await this.userDAO.createUser(user);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updatedFields) {
    try {
      return await this.userDAO.updateUser(id, updatedFields);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await this.userDAO.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
