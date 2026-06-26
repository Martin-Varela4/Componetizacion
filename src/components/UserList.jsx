import UserCard from "./UserCard";
import "./users.css";

export default function UserList({ users }) {
  return (
    <section className="users-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}