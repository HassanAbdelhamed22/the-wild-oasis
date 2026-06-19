export default async function CabinsPage() {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  return (
    <div>
      <h1>Cabins Page</h1>
      <p>This is the cabins page of our application.</p>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
