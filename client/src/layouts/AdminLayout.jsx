import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR - DIEM */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <AdminSidebar />
      </div>

      {/* CONTENT */}
      <main className="ml-72 flex-1 min-h-screen overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
