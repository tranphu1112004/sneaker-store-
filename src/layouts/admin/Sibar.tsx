import React from 'react';
import { Link } from 'react-router-dom';

  const Sidebar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <aside {...props}>
    <div className="  min-h-screen  py-3 ">
      <div className="flex w-full max-w-xs p-4 -z-10  bg-white">
        <ul className="flex flex-col w-full">
          <li className="my-px">
            <Link to={`/admin`} className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </span>
              <span className="ml-3">Trang chủ</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">3</span>
            </Link>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Quản lý</span>
          </li>
          <li className="my-px">
            <Link to="/admin/products" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </span>
              <span className="ml-3">Sản phẩm</span>
            </Link>
          </li>
          <li className="my-px">
            <Link to="/admin/all" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </span>
              <span className="ml-3">Danh mục</span>
            </Link>
          </li>
          <li className="my-px">
            <Link to="/admin/products/stopped" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </span>
              <span className="ml-3">Dùng bán</span>
            </Link>
          </li>
          <li className="my-px">
            <Link to="/admin/users" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </span>
              <span className="ml-3">Khách hàng</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">1k</span>
            </Link>
          </li>
          <li className="my-px">
            <Link to="/admin/checkout" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </span>
              <span className="ml-3">Đơn hàng</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">1k</span>
            </Link>
          </li>
          <li className="my-px">
            <Link to="/admin/voicher" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </span>
              <span className="ml-3">Voicher</span>
              <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">1k</span>
            </Link>
          </li>
          <li className="my-px">
            <a href="#" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-green-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <span className="ml-3">Thống kê</span>
            </a>
          </li>
          <li className="my-px">
            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Account</span>
          </li>
          <li className="my-px">
            <a href="#" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <span className="ml-3">Tài khoản</span>
            </a>
          </li>
          <li className="my-px">
            <a href="#" className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
              <span className="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4.2-5.71M9 7a6.002 6.002 0 00-4.2 5.71v3.158a2.032 2.032 0 01-.595 1.437L3 17h5m2-14h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"></path>
                </svg>
              </span>
              <span className="ml-3 ">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </aside>
  );
};

export default Sidebar;
