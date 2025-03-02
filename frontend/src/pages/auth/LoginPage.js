import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error trước khi thử đăng nhập

        try {
            const data = await authService.login(credentials);
            localStorage.setItem("token", data.token); // Lưu token vào localStorage
            setIsAuthenticated(true);
            navigate("/clubs"); 
        } catch (err) {
            console.error("Lỗi đăng nhập:", err.message);
            setError("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Chào mừng trở lại</h2>

                {/* Hiển thị lỗi khi có */}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email </label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
