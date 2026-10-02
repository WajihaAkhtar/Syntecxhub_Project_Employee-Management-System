import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Please enter email and password.");
            return;
        }

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {
            localStorage.setItem(
                "employeeLoggedIn",
                "true"
            );

            onLogin();
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h1>Employee Management</h1>

                <p className="login-subtitle">
                    Login to continue
                </p>

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin}>

                    <div className="login-form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="demo-login">
                    Demo Login: admin@gmail.com / admin123
                </p>

            </div>

        </div>
    );
}

export default Login;