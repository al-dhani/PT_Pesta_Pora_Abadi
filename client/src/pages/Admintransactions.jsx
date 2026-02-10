import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { FaMoneyBillWave, FaSearch, FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const API_URL = "http://localhost:5000/api";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, [filters]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions/stats`);
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      params.append("page", filters.page);
      params.append("limit", filters.limit);

      const res = await axios.get(`${API_URL}/transactions?${params}`);
      setTransactions(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-600",
      success: "bg-green-100 text-green-600",
      failed: "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  if (loading && transactions.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-[#EC008C] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#EC008C] via-purple-500 to-[#00BCD4] rounded-3xl p-8 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FaMoneyBillWave size={26} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Manajemen Transaksi</h1>
                <p className="text-white/80 text-sm">
                  Kelola semua transaksi pelanggan
                </p>
              </div>
            </div>
            <div className="text-sm">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <StatCard label="Total" value={stats.total || 0} />
            <StatCard label="Success" value={stats.success || 0} />
            <StatCard label="Pending" value={stats.pending || 0} />
            <StatCard
              label="Revenue"
              value={formatCurrency(stats.total_revenue || 0)}
            />
          </div>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center border rounded-xl px-3 w-full">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                className="w-full py-2 outline-none"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value, page: 1 })
                }
              />
            </div>

            <select
              className="border rounded-xl px-4 py-2"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value, page: 1 })
              }
            >
              <option value="">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Order</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Produk</th>
                  <th className="p-4 text-left">Harga</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.payment_id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-semibold">{t.order_code}</td>
                    <td className="p-4">{t.customer_name}</td>
                    <td className="p-4">{t.nama_produk || "N/A"}</td>
                    <td className="p-4 font-bold text-green-600">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4">{formatDate(t.created_at)}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedTransaction(t)}
                        className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center gap-1 justify-center mx-auto"
                      >
                        <FaEye size={14} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">Detail Transaksi</h2>
              <button onClick={() => setSelectedTransaction(null)}>
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-6 space-y-3 text-sm">
              <p><strong>Order:</strong> {selectedTransaction.order_code}</p>
              <p><strong>Customer:</strong> {selectedTransaction.customer_name}</p>
              <p><strong>Email:</strong> {selectedTransaction.customer_email}</p>
              <p><strong>Produk:</strong> {selectedTransaction.nama_produk}</p>
              <p><strong>Harga:</strong> {formatCurrency(selectedTransaction.amount)}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Method:</strong> {selectedTransaction.method}</p>
              <p><strong>Gateway:</strong> {selectedTransaction.gateway}</p>
              <p><strong>Tanggal:</strong> {formatDate(selectedTransaction.created_at)}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
    <p className="text-sm text-white/70">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminTransactions;