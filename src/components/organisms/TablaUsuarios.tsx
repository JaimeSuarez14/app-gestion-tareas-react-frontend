import React from 'react';
import type { User } from '../../lib/types/User';

interface TablaUsuariosProps {
  users: User[] | null;
  loading: string | null;
  error: string | null;
}

const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ users, loading, error }) => {
  return (
    <div className="transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
      {loading && (
        <p className="text-green-500 text-lg py-8 text-center">{loading}</p>
      )}

      <p className="text-red-600 text-center mb-4">{error && error}</p>
      <div className="flex justify-center items-center w-full">
        <div className="relative overflow-x-auto bg-blue-950 shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-gray-900 font-bold border-b border-default-medium">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <span className="">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    className="bg-neutral-primary-soft hover:bg-amber-950 border-b border-default hover:bg-neutral-secondary-medium transition-colors duration-200"
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {user._id}
                    </th>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-fg-brand hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="py-2">
                  <td className="text-center py-5" colSpan={5}>
                    No hay usuarios actualmente...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaUsuarios;