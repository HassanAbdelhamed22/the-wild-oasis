import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

function AccountPage() {
  return (
    <div>
      <h1>Guest area</h1>
      <p>This is the guest area page of our application.</p>
    </div>
  );
}

export default AccountPage;
