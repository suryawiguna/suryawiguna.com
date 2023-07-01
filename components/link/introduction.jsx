import Image from "next/image";
import { RichText } from "../global";

export default function Introduction({ blok }) {
  return (
    <section className="flex flex-col md:flex-row items-center">
      <Image
        src={blok.image.filename}
        alt=""
        width={84}
        height={84}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full"
      />
      <RichText
        data={blok.description}
        className="text-lg text-center md:text-left mt-2 ml-3"
      />
    </section>
  );
}
