import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Dashboard</h1>
        <p>Bem-vindo(a), {user?.email}!</p>
        <button className="auth-submit" type="button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </section>
  );
}
