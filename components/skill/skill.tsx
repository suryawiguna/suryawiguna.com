import Image from "next/image";

export default function Skills({ blok }) {
  return (
    <section className="gap-8 grid">
      <h2 className="text-3xl">{blok.title}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 overflow-auto">
        {blok.skills.map((item, key) => {
          return (
            <div key={key} className="flex flex-col gap-3 pb-2 rounded-lg">
              <div className="relative w-10 h-8 mx-auto">
                <Image
                  src={item.logo.filename}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  placeholder="blur"
                  blurDataURL={`${item.logo.filename}/m/40x40`}
                />
              </div>
              <h3 className="text-center text-zinc-800 self-center text-sm">
                {item.name}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
