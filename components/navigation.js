const data = require("/data/data.json");

export default function Navigation() {
  return (
    <nav className="w-full md:w-1/5 lg:w-1/6 p-0 md:p-4 md:h-screen fixed bottom-0 md:sticky md:top-0 bg-white border-t border-gray-200 md:border-r  md:border-t-0">
      <div className="flex overflow-x-auto md:flex-col">
        {data.menu.map((menu) => {
          return (
            <a
              key={menu}
              href={menu.link}
              className="font-normal hover:font-bold hover:underline p-5 px-8 md:pt-0 md:pb-10 underline-offset-4 decoration-2"
            >
              {menu.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
