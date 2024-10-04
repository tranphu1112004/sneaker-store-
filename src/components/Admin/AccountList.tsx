import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { IUser } from '../../interfaces/IUser';
import '../../css/account-list.css'

const AccountList = () => {
    const { users, addUser, updateUser, deleteUser, loading, error } = useUserContext();
    const [userData, setUserData] = useState<Omit<IUser, 'id'>>({
        username: '',
        password: '',
        email: '',
        address: '',
        role: '1', // Mặc định là người dùng
        phone: '',
        dateCreated: new Date(),
        IdVoucher: [],
    });
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (selectedUser) {
            setUserData({
                username: selectedUser.username,
                password: '',
                email: selectedUser.email,
                address: selectedUser.address,
                role: selectedUser.role,
                phone: selectedUser.phone,
                dateCreated: selectedUser.dateCreated,
                IdVoucher: selectedUser.IdVoucher,
            });
        }
    }, [selectedUser]);

    const validate = () => {
        const errors: { [key: string]: string } = {};
        if (!userData.username) errors.username = 'Tên người dùng là bắt buộc';
        if (!userData.email) errors.email = 'Email là bắt buộc';
        if (!userData.password) errors.password = 'Mật khẩu là bắt buộc';
        if (!userData.phone) errors.phone = 'Số điện thoại là bắt buộc';
        if (!userData.role) errors.role = 'Quyền người dùng là bắt buộc';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        if (selectedUser) {
            await updateUser(selectedUser.id, userData);
            setSelectedUser(null);
        } else {
            await addUser(userData);
        }
        setUserData({
            username: '',
            password: '',
            email: '',
            address: '',
            role: '1',
            phone: '',
            dateCreated: new Date(),
            IdVoucher: [],
        });
        setValidationErrors({});
    };

    const handleDeleteUser = async (id: string | number) => {
        await deleteUser(id);
    };

    // Lọc người dùng theo vai trò
    const customers = users.filter(user => user.role === '0');
    const employees = users.filter(user => user.role === '1' || user.role === '2'); // Nhân viên và Quản lý

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Quản lý Tài Khoản</h2>
            {/* Form Người Dùng */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    className="border rounded-lg p-2 mr-2 w-full"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
                {validationErrors.username && <p className="text-red-500">{validationErrors.username}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border rounded-lg p-2 mr-2 w-full"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="border rounded-lg p-2 mr-2 w-full"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="border rounded-lg p-2 mr-2 w-full"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
                {validationErrors.phone && <p className="text-red-500">{validationErrors.phone}</p>}
            </div>
            <div className="mb-4">
                <select
                    className="border rounded-lg p-2 mr-2 w-full"
                    value={userData.role}
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                >
                    <option value="0">Người dùng</option>
                    <option value="1">Nhân viên</option>
                    <option value="2">Quản lý</option>
                </select>
                {validationErrors.role && <p className="text-red-500">{validationErrors.role}</p>}
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
                {selectedUser ? 'Cập nhật' : 'Thêm'}
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {/* Bảng Khách Hàng */}
            <h3 className="text-xl font-semibold mb-2">Khách Hàng</h3>
            <table className="min-w-full bg-white border rounded-lg shadow-md mt-2">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Tên người dùng</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Số điện thoại</th>
                        <th className="py-2 px-4 border-b">Quyền</th>
                        <th className="py-2 px-4 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100 text-center">
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.phone}</td>
                            <td className="py-2 px-4 border-b">{user.role === '0' ? 'Người dùng' : user.role === '1' ? 'Nhân viên' : 'Quản lý'}</td>
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-500 hover:underline ml-2"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bảng Nhân Viên */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Nhân Viên</h3>
            <table className="min-w-full bg-white border rounded-lg shadow-md mt-2">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Số điện thoại</th>
                        <th className="py-2 px-4 border-b">Quyền</th>
                        <th className="py-2 px-4 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100 text-center">
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.phone}</td>
                            <td className="py-2 px-4 border-b">{user.role === '0' ? 'Người dùng' : user.role === '1' ? 'Nhân viên' : 'Quản lý'}</td>
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-500 hover:underline ml-2"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountList;
