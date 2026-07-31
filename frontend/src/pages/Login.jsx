import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginRequest, googleLoginRequest } from "../api/api";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "./Auth.css";

export default function Login() {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { accessToken } = await loginRequest(user_email, user_password);
      login(accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleCredential(credential) {
    setError("");

    try {
      const { accessToken } = await googleLoginRequest(credential);
      login(accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Entrar</h1>

        {successMessage && <p className="auth-success">{successMessage}</p>}
        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="user_email">Email</label>
            <input
              id="user_email"
              type="email"
              autoComplete="email"
              required
              value={user_email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="user_password">Senha</label>
            <input
              id="user_password"
              type="password"
              autoComplete="current-password"
              required
              value={user_password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-divider">ou</div>

        <div className="auth-google">
          <GoogleLoginButton
            onCredential={handleGoogleCredential}
            onError={() => setError("Não foi possível entrar com o Google.")}
          />
        </div>

        <p className="auth-footer">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
}
