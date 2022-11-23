import Navigation from "./navigation";

export default function Layout({ navigation, children }) {
  return (
    <div className="lg:container mx-auto lg:px-14">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Navigation navigation={navigation} />
        <main className="w-full sm:w-8/12 lg:w-9/12 xl:w-10/12 order-first sm:order-last mb-20 p-6 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
