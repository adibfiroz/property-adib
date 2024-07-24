import getCurrentUser from "../../actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import PropertyTable from "@/components/property-table";
import CustomerTable from "@/components/customer-table";
import getProperties from "../../actions/getProperties";
import getCustomers from "../../actions/getCustomers";


export default async function Home() {
  const currentUser = await getCurrentUser();
  const property = await getProperties()
  const customer = await getCustomers()

  return (
    <ClientOnly>
      <div className=' max-w-screen-xl mx-auto'>
        <div className='p-4'>

          <PropertyTable currentUser={currentUser} property={property} />

          {currentUser?.role === "Admin" &&
            <div>
              <div className='flex justify-between items-center mt-10'>
                <h2 className=' text-2xl font-semibold'>Customers</h2>
                <Link href="/customer/create" className=' text-blue-600 font-semibold'>Create Customer</Link>
              </div>

              <CustomerTable currentUser={currentUser} customer={customer} />
            </div>
          }
        </div>
      </div>
    </ClientOnly>
  );
}
