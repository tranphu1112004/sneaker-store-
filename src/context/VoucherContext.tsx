import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { IVoucher } from '../interfaces/IOder';
import { GetAllVoucher, CreateVoucher, UpdateVoucher, DeleteVoucher } from '../service/Voucher';

type Props = {
    children: ReactNode;
};

// Định nghĩa kiểu dữ liệu cho context
interface IVoucherContext {
    vouchers: IVoucher[];
    onAddVoucher: (code: string, discountPercentage: number, minimumSpend: number, expiryDate: string, isActive: boolean) => Promise<void>;
    onUpdateVoucher: (id: string, code: string, discountPercentage: number, minimumSpend: number, expiryDate: string, isActive: boolean) => Promise<void>;
    onDeleteVoucher: (id: string) => Promise<void>;
}

// Tạo context với giá trị mặc định
const VoucherContext = createContext<IVoucherContext | undefined>(undefined);

// Hook để sử dụng context
export const useVoucherContext = () => {
    const context = useContext(VoucherContext);
    if (!context) {
        throw new Error("useVoucherContext phải được sử dụng trong VoucherProvider");
    }
    return context;
};

const VoucherProvider: React.FC<Props> = ({ children }) => {
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const voucherData = await GetAllVoucher();
                setVouchers(voucherData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách voucher:', error);
            }
        })();
    }, []);

    // Thêm voucher mới
    const onAddVoucher = async (code: string, discountPercentage: number, minimumSpend: number, expiryDate: string, isActive: boolean) => {
        try {
            const newVoucher = await CreateVoucher({ code, discountPercentage, minimumSpend, expiryDate, isActive });
            setVouchers([...vouchers, newVoucher]);
            alert('Thêm voucher thành công');
        } catch (error) {
            console.error('Lỗi khi thêm voucher:', error);
            alert('Thêm voucher thất bại');
        }
    };

    // Cập nhật voucher
    const onUpdateVoucher = async (id: string, code: string, discountPercentage: number, minimumSpend: number, expiryDate: string, isActive: boolean) => {
        try {
            const updatedVoucher = await UpdateVoucher(id, { code, discountPercentage, minimumSpend, expiryDate, isActive });
            setVouchers(vouchers.map(voucher => voucher.id === id ? updatedVoucher : voucher));
            alert('Cập nhật voucher thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật voucher:', error);
            alert('Cập nhật voucher thất bại');
        }
    };

    // Xóa voucher
    const onDeleteVoucher = async (id: string) => {
        try {
            await DeleteVoucher(id);
            setVouchers(vouchers.filter(voucher => voucher.id !== id));
            alert('Xóa voucher thành công');
        } catch (error) {
            console.error('Lỗi khi xóa voucher:', error);
            alert('Xóa voucher thất bại');
        }
    };

    return (
        <VoucherContext.Provider value={{ vouchers, onAddVoucher, onUpdateVoucher, onDeleteVoucher }}>
            {children}
        </VoucherContext.Provider>
    );
};

export default VoucherProvider; // Xuất VoucherProvider thay vì VoucherContext
