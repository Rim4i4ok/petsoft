import H1 from "@/components/h1";
import PaymentBtn from "@/components/payment-btn";

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>

      {!searchParams.success && <PaymentBtn />}

      {searchParams.success && (
        <p className="text-2xl  text-green-700">
          Payment successful! You now have lifetime access to PetSoft.
        </p>
      )}

      {searchParams.cancelled && (
        <p className="text-2xl text-red-700">
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}

export default Page;
