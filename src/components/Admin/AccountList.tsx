// import React, { useEffect, useState } from 'react';
// import { getAllUsers, deleteUser } from '../../service/User'; // Đảm bảo rằng đường dẫn đúng

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [error, setError] = useState<string | null>(null);

//     // Hàm lấy danh sách khách hàng
//     const fetchCustomers = async () => {
//         try {
//             const users = await getAllUsers(localStorage.getItem('token') || '');
//             setCustomers(users);
//         } catch (err) {
//             setError('Lỗi khi lấy danh sách khách hàng');
//         }
//     };

//     // Hàm xóa khách hàng
//     const handleDelete = async (userId: string) => {
//         if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
//             try {
//                 await deleteUser(userId, localStorage.getItem('token') || '');
//                 fetchCustomers(); // Cập nhật lại danh sách sau khi xóa
//             } catch (err) {
//                 setError('Lỗi khi xóa khách hàng');
//             }
//         }
//     };

//     useEffect(() => {
//         fetchCustomers(); // Lấy danh sách khách hàng khi component được mount
//     }, []);

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <h2 className="text-3xl font-semibold mb-6 text-gray-800">Quản Lý Khách Hàng</h2>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200 bg-white">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Tên
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Email
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Số điện thoại
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Địa chỉ
//                             </th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Địa chỉ
//                             </th>
//                             <th scope="col" className="relative px-6 py-3">
//                                 <span className="sr-only">Hành động</span>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {customers.map((customer) => (
//                             <tr key={customer.id} className="hover:bg-gray-50">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                     {customer.username}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {customer.email}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {customer.phone}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {customer.address}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {customer.role}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                     <button
//                                         className="text-red-600 hover:text-red-900"
//                                         onClick={() => handleDelete(customer.id)}
//                                     >
//                                         Xóa
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default CustomerList;
