import { Metadata } from "next";
import { auth } from "../_lib/auth";

export const metadata: Metadata = {
  title: "Guest area",
};

async function AccountPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-accent-500">
        Welcome, {firstName}
      </h1>
    </div>
  );
}

export default AccountPage;
