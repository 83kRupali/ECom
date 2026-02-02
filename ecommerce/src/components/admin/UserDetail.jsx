
/**
 * UserDetail Component
 * -------------------
 * Displays a list of all registered users.
 * Used in the Admin Dashboard to view user information.
 * Data is fetched from Firebase via global context.
 */

import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
  // Access users data from global context
  const { getAllUser } = useContext(myContext);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= PAGE HEADING ================= */}
      <h1 className="text-lg font-semibold text-pink-600 mb-4">
        All Users
      </h1>

      {/* ================= USER TABLE ================= */}
      <div className="bg-white rounded-lg border border-pink-200 overflow-x-auto">
        <table className="w-full border-collapse">
          
          {/* Table Header */}
          <thead className="bg-pink-50">
            <tr>
              <th className="border px-4 py-2 text-left text-pink-600">
                S.No.
              </th>
              <th className="border px-4 py-2 text-left text-pink-600">
                Name
              </th>
              <th className="border px-4 py-2 text-left text-pink-600">
                Email
              </th>
              <th className="border px-4 py-2 text-left text-pink-600">
                User ID
              </th>
              <th className="border px-4 py-2 text-left text-pink-600">
                Role
              </th>
              <th className="border px-4 py-2 text-left text-pink-600">
                Date
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {getAllUser.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}

            {getAllUser.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50"
              >
                {/* Serial Number */}
                <td className="border px-4 py-2">
                  {index + 1}
                </td>

                {/* User Name */}
                <td className="border px-4 py-2">
                  {item.name}
                </td>

                {/* User Email */}
                <td className="border px-4 py-2">
                  {item.email}
                </td>

                {/* User UID */}
                <td className="border px-4 py-2">
                  {item.uid}
                </td>

                {/* User Role */}
                <td className="border px-4 py-2 capitalize">
                  {item.role}
                </td>

                {/* Account Creation Date */}
                <td className="border px-4 py-2">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;


