import Image from "next/image";

export default function Skills({ blok }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
      {blok.skills.map((item, key) => {
        return (
          <div
            key={key}
            className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg"
          >
            <div className="relative min-h-[60px]">
              <Image
                src={item.logo.filename}
                alt={item.name}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`${item.logo.filename}/m/40x40`}
              />
            </div>
            <h3 className="text-center self-center text-sm md:text-base">
              {item.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
