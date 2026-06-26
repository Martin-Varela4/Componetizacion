import UserList from "../components/UserList";

export default function Users() {
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@email.com", role: "Admin", status: "Activo" },
    { id: 2, name: "María Gómez", email: "maria@email.com", role: "Editor", status: "Activo" },
    { id: 3, name: "Carlos López", email: "carlos@email.com", role: "User", status: "Inactivo" },
    { id: 4, name: "Olivia Guzmán", email: "olivia@email.com", role: "User", status: "Inactivo" },
    { id: 5, name: "Pedro Gonzalez", email: "pedro@email.com", role: "User", status: "Activo" },
    { id: 6, name: "Cinthia Gutierrez", email: "cinthia@email.com", role: "User", status: "Inactivo" },

  ];

  return (
    <main className="page">
      <h1>Lista de Usuarios</h1>
      <UserList users={users} />
    </main>
  );
}