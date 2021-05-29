import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const rightNow = new Date();
    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: rightNow,
      updated_at: rightNow,
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);
    return foundUser;
  }

  findByEmail(email: string): User | undefined {
    const foundUser = this.users.find((user) => user.email === email);
    return foundUser;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex((user) => user === receivedUser);
    const user = this.users[userIndex];
    user.admin = true;
    user.updated_at = new Date();
    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
