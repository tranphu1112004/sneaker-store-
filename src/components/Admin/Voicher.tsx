import React, { useState, useEffect } from 'react';
import { useVoucherContext } from '../../context/VoucherContext';
import { useUserContext } from '../../context/UserContext';
import { IVoucher } from '../../interfaces/IOder';
import { GiftVoucherToUser } from '../../service/Voucher';

const Voucher = () => {
    const { vouchers, onAddVoucher, onUpdateVoucher, onDeleteVoucher } = useVoucherContext();
    const { getUser } = useUserContext();
    const [userId, setUserId] = useState<string>(''); 
    const [userDetails, setUserDetails] = useState<{ username: string; email: string } | null>(null);
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
    const [voucherData, setVoucherData] = useState<Omit<IVoucher, 'id'>>({
        code: '',
        discountPercentage: 0,
        minimumSpend: 0,
        expiryDate: '',
        isActive: true,
    });
    const [userError, setUserError] = useState<string | null>(null);
    const [voucherError, setVoucherError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (userId) {
                const user = await getUser(userId);
                if (user) {
                    setUserDetails({ username: user.username, email: user.email });
                    setUserError(null); // Clear error if user is found
                } else {
                    setUserDetails(null);
                    setUserError('ID người dùng không tồn tại.');
                }
            } else {
                setUserDetails(null);
                setUserError(null);
            }
        };
        fetchUserDetails();
    }, [userId, getUser]);

    const handleAddVoucher = async () => {
        setVoucherError(null); // Reset voucher error
        if (!voucherData.code || !voucherData.expiryDate) {
            setVoucherError("Vui lòng điền đầy đủ thông tin voucher.");
            return;
        }
        if (selectedVoucher) {
            await onUpdateVoucher(
                selectedVoucher.id,
                voucherData.code,
                voucherData.discountPercentage,
                voucherData.minimumSpend,
                voucherData.expiryDate,
                voucherData.isActive
            );
            setSelectedVoucher(null);
        } else {
            await onAddVoucher(
                voucherData.code,
                voucherData.discountPercentage,
                voucherData.minimumSpend,
                voucherData.expiryDate,
                voucherData.isActive
            );
        }
        setVoucherData({ code: '', discountPercentage: 0, minimumSpend: 0, expiryDate: '', isActive: true });
    };

    const handleGiftVoucher = async (voucherId: string) => {
        if (!userId) {
            setUserError('Vui lòng nhập ID người dùng.');
            return;
        }
        try {
            await GiftVoucherToUser(userId, voucherId);
            // Optionally handle success feedback here
        } catch (error) {
            console.error('Lỗi khi tặng voucher:', error);
            // Optionally handle error feedback here
        }
    };

    const handleEditVoucher = (voucher: IVoucher) => {
        setSelectedVoucher(voucher);
        setVoucherData({
            code: voucher.code,
            discountPercentage: voucher.discountPercentage,
            minimumSpend: voucher.minimumSpend,
            expiryDate: voucher.expiryDate,
            isActive: voucher.isActive,
        });
    };

    const handleDeleteVoucher = async (id: string) => {
        await onDeleteVoucher(id);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Quản lý Voucher</h2>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Nhập ID người dùng"
                    className={`border rounded-lg p-2 w-full ${userError ? 'border-red-500' : ''}`}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                {userError && <p className="text-red-500 text-sm">{userError}</p>}
                {userDetails && (
                    <div className="mt-2 text-sm text-gray-600">
                        <p>Tên: {userDetails.username}</p>
                        <p>Email: {userDetails.email}</p>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Mã Voucher"
                    className={`border rounded-lg p-2 mr-2 ${voucherError ? 'border-red-500' : ''}`}
                    value={voucherData.code}
                    onChange={(e) => setVoucherData({ ...voucherData, code: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Phần trăm giảm"
                    className={`border rounded-lg p-2 mr-2 ${voucherError ? 'border-red-500' : ''}`}
                    value={voucherData.discountPercentage}
                    onChange={(e) => setVoucherData({ ...voucherData, discountPercentage: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Chi tiêu tối thiểu"
                    className={`border rounded-lg p-2 mr-2 ${voucherError ? 'border-red-500' : ''}`}
                    value={voucherData.minimumSpend}
                    onChange={(e) => setVoucherData({ ...voucherData, minimumSpend: Number(e.target.value) })}
                />
                <input
                    type="date"
                    className={`border rounded-lg p-2 mr-2 ${voucherError ? 'border-red-500' : ''}`}
                    value={voucherData.expiryDate}
                    onChange={(e) => setVoucherData({ ...voucherData, expiryDate: e.target.value })}
                />
                <button
                    onClick={handleAddVoucher}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                    {selectedVoucher ? 'Cập nhật Voucher' : 'Thêm Voucher'}
                </button>
                {voucherError && <p className="text-red-500 text-sm">{voucherError}</p>}
            </div>
            <table className="min-w-full bg-white border rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Mã Voucher</th>
                        <th className="py-2 px-4 border-b">Giảm giá (%)</th>
                        <th className="py-2 px-4 border-b">Chi tiêu tối thiểu</th>
                        <th className="py-2 px-4 border-b">Ngày hết hạn</th>
                        <th className="py-2 px-4 border-b">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map(voucher => (
                        <tr key={voucher.id} className="hover:bg-gray-100 text-center">
                            <td className="py-2 px-4 border-b">{voucher.code}</td>
                            <td className="py-2 px-4 border-b">{voucher.discountPercentage}</td>
                            <td className="py-2 px-4 border-b">${voucher.minimumSpend}</td>
                            <td className="py-2 px-4 border-b">{voucher.expiryDate}</td>
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button
                                    onClick={() => handleEditVoucher(voucher)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDeleteVoucher(voucher.id)}
                                    className="text-red-500 hover:underline ml-2"
                                >
                                    Xóa
                                </button>
                                <button
                                    onClick={() => handleGiftVoucher(voucher.id)}
                                    className="text-green-500 hover:underline ml-2"
                                >
                                    Tặng
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Voucher;
