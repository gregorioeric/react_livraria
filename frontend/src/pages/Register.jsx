import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../api/api";
import { formatPhone } from "../utils/formatPhone";
import "./Auth.css";

const DEFAULT_ROLE_ID = 1; // cliente
const DEFAULT_USER_STATUS = 1;

export default function Register() {
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_phone, setPhone] = useState("");
  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (user_password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      await registerRequest({
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id: DEFAULT_ROLE_ID,
        user_status: DEFAULT_USER_STATUS,
      });

      navigate("/login", {
        replace: true,
        state: { message: "Cadastro realizado! Faça login para continuar." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Criar conta</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="user_name">Nome</label>
            <input
              id="user_name"
              type="text"
              autoComplete="name"
              minLength={3}
              maxLength={150}
              required
              value={user_name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

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
            <label htmlFor="user_phone">Telefone</label>
            <input
              id="user_phone"
              type="tel"
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              pattern="^\(\d{2}\)\s\d{4,5}-\d{4}$"
              required
              value={user_phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="user_password">Senha</label>
            <input
              id="user_password"
              type="password"
              autoComplete="new-password"
              title="Mínimo 8 caracteres, com maiúscula, minúscula, número e caractere especial"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              required
              value={user_password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="auth-footer">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}
