import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <div className="lg:container mx-auto lg:px-14">
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Navigation />
        <main className="w-full md:w-3/5 lg:w-4/6 order-first md:order-last mb-20 p-4 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
