const formatDate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('es-AR')
}

export default function UserCard({ user }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{user.nombre}</h2>
      </div>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Alta:</strong> {formatDate(user.creadoEn)}</p>
    </div>
  )
}
