export default class UserDAO {
  constructor() {
    // Initialize in-memory users
    this.users = [
      { id: '1', name: 'user 1', email: 'user1@gmail.com', password: 'password1' },
      { id: '2', name: 'user 2', email: 'user2@gmail.com', password: 'password2' },
      { id: '3', name: 'user 3', email: 'user3@gmail.com', password: 'password3' },
      { id: '4', name: 'user 4', email: 'user4@gmail.com', password: 'password4' },
      { id: '5', name: 'user 5', email: 'user5@gmail.com', password: 'password5' },
    ];
  }

  async getUsers() {
    try {
      return this.users;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      const newUser = {
        ...user,
        id: (Date.now() + Math.random()).toString(), // simple unique id
      };
      this.users.push(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updatedFields) {
    try {
      const userIndex = this.users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      this.users[userIndex] = { ...this.users[userIndex], ...updatedFields };
      return this.users[userIndex];
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const originalLength = this.users.length;
      this.users = this.users.filter(u => u.id !== id);
      return this.users.length < originalLength;
    } catch (error) {
      throw error;
    }
  }
}
