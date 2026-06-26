export default function UserCard({ user, toggleStatus }) {
  const isActive = user.status === "Activo";

  const badgeClass = isActive
    ? "badge active"
    : "badge inactive";

  return (
    <div className="card">
      <div className="card-header">
        <h2>{user.name}</h2>

        <span className={badgeClass}>
          {user.status}
        </span>
      </div>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>

      <button
        className="btn"
        onClick={() => toggleStatus(user.id)}
      >
        Cambiar estado
      </button>
    </div>
  );
}