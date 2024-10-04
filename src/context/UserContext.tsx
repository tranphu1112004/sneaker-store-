import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { IUser } from "../interfaces/IUser";
import {
  GetAllUsers,
  GetUserById as FetchUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../service/User";

interface IUserContext {
  users: IUser[];
  getUser: (id: string | number) => Promise<IUser | undefined>; 
  addUser: (user: Omit<IUser, "id">) => Promise<void>;
  updateUser: (id: string | number, user: Partial<IUser>) => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext phải được sử dụng trong UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        setUsers(response);
      } catch (err) {
        setError("Lỗi khi tải danh sách người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getUser = async (id: string | number): Promise<IUser | undefined> => {
    try {
        const response = await FetchUserById(id);
        if (response) {
            return response; // Nếu tìm thấy người dùng
        } else {
            console.log('Không tìm thấy người dùng')
        }
    } catch (error) {
        console.error(`Lỗi khi lấy người dùng với ID: ${id}`);
    }
};


  const addUser = async (newUser: Omit<IUser, "id">) => {
    try {
      const response = await CreateUser(newUser);
      setUsers((prevUsers) => [...prevUsers, response]);
    } catch (err) {
      setError("Lỗi khi thêm người dùng");
      console.error(err);
    }
  };

  const updateUser = async (id: string | number, updatedUser: Partial<IUser>) => {
    try {
      const response = await UpdateUser(id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response : user))
      );
    } catch (err) {
      setError("Lỗi khi cập nhật người dùng");
      console.error(err);
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      await DeleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError("Lỗi khi xóa người dùng");
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
