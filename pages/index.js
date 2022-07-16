import Image from "next/image";

export default function Index() {
  return (
    <>
      <h1 className="font-bold text-3xl">Hi, I'm Surya!</h1>
      <Image src="/images/me.jpg" width={120} height={120} />
    </>
  );
}
