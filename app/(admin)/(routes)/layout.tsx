import getCurrentUser from "@/app/actions/getCurrentUser";
import Header from "@/components/header";


const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="relative max-w-screen-xl mx-auto">
      <Header currentUser={currentUser} />
      <main className="">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;