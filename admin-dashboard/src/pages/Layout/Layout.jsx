import React from 'react'
import Navbar from '../../components/Navbar'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-4 font-bold text-lg mt-6">
          Admin Dashboard
        </div>
        <ul className="flex flex-col space-y-2 p-4">
          <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/categories">Categories</a>
          </li>
          <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/user/provider">Service Providers</a>
          </li>
          <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/user/customer">Customers</a>
          </li>
          {/* <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/Learner">Payment Analytics</a>
          </li> */}
          <li className="hover:bg-blue-600 p-2 rounded">
            <a href="/bookings">Booking</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
