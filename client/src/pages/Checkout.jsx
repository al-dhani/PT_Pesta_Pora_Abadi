import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function CheckoutOption4() {
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const product = location.state;

    if (!product) {
        return <h1>Produk tidak ditemukan</h1>;
    }
    const subtotal = product.harga * quantity;
    const total = subtotal; // bisa ditambah shipping nanti

    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        zip: "",
        paymentMethod: "qris",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePayment(product);
    };

    const handlePayment = async (product) => {
        console.log("📦 Product data:", product);
        try {
            const res = await axios.post("http://localhost:5000/api/checkout", {
                orderId: "ORDER-" + Date.now(),
                grossAmount: total,
                productId: product.id,
                quantity: quantity,  // <--- ini yang baru
                customer: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phone: form.phone,
                },
            });

            const token = res.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    alert("Pembayaran berhasil!");
                },
                onPending: function (result) {
                    alert("Pembayaran pending!");
                },
                onError: function (result) {
                    alert("Terjadi kesalahan pembayaran!");
                },
                onClose: function () {
                    alert("Anda menutup popup tanpa membayar");
                },
            });
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Gagal membuat transaksi!");
        }
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
                
                .minimal-input {
                    border-bottom: 2px solid #e5e7eb;
                    transition: all 0.3s ease;
                }
                
                .minimal-input:focus {
                    outline: none;
                    border-bottom-color: #8b5cf6;
                }
                
                .minimal-input::placeholder {
                    color: #9ca3af;
                }
            `}</style>

            <div className="grid lg:grid-cols-2 min-h-screen">
                {/* LEFT SIDE - OPTION 4: GEOMETRIC SHAPES (DARK) */}
                <div className="relative bg-gray-900 p-12 flex items-center justify-center overflow-hidden">
                    {/* Geometric Background Shapes */}
                    <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600 opacity-20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white opacity-10 rounded-full"></div>

                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="absolute top-8 left-8 w-12 h-12 bg-white/20 text-white hover:bg-white/30 rounded-full flex items-center justify-center transition-all shadow-md z-20"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>

                    <div className="max-w-lg w-full relative z-10">
                        <div className="bg-white rounded-3xl p-12 mb-8 shadow-2xl">
                            <div className="aspect-square flex items-center justify-center">
                                <img
                                    src={`http://localhost:5000/images/produk/${product.image}`}
                                    alt={product.nama}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-bold text-purple-400 mb-2 tracking-wider">CHECKOUT</p>
                            <h1 className="text-4xl font-black text-white mb-4">{product.nama}</h1>
                            <div className="inline-block">
                                <p className="text-4xl font-black text-white">
                                    Rp {product.harga.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Checkout Form */}
                <div className="bg-white overflow-y-auto">
                    <div className="max-w-xl mx-auto px-8 py-12">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your.email@example.com"
                                        onChange={handleChange}
                                        className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                            <input
                                                name="firstName"
                                                placeholder="John"
                                                onChange={handleChange}
                                                className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                            <input
                                                name="lastName"
                                                placeholder="Doe"
                                                onChange={handleChange}
                                                className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                        <input
                                            name="phone"
                                            placeholder="+62 812 3456 7890"
                                            onChange={handleChange}
                                            className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                                        <textarea
                                            name="address"
                                            placeholder="Enter your complete address"
                                            onChange={handleChange}
                                            rows="3"
                                            className="minimal-input w-full pb-3 bg-transparent text-gray-900 resize-none"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                            <input
                                                name="city"
                                                placeholder="Jakarta"
                                                onChange={handleChange}
                                                className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Province</label>
                                            <input
                                                name="province"
                                                placeholder="DKI Jakarta"
                                                onChange={handleChange}
                                                className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            name="zip"
                                            placeholder="12345"
                                            onChange={handleChange}
                                            className="minimal-input w-full pb-3 bg-transparent text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="pt-8 border-t-2 border-gray-200">
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center pt-3 border-t-2 border-purple-200">
                                            <span className="text-xl font-black text-gray-900">Total</span>
                                            <span className="text-2xl font-black text-gray-900">
                                                Rp {total.toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Shipping</span>
                                            <span className="text-green-600 font-bold">FREE</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Subtotal</span>
                                            <span className="text-2xl font-black text-gray-900">
                                                Rp {total.toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                        <span>{quantity}</span>
                                        <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg transition-all transform hover:scale-[1.02]"
                                    >
                                        Complete Payment
                                    </button>

                                    <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                                        </svg>
                                        <span>Secure checkout powered by Midtrans</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}