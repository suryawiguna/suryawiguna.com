import Image from "next/image";
import { RichText } from "../global";

export default function Introduction({ blok }) {
  return (
    <section className="flex items-center">
      <Image
        src={blok.image.filename}
        alt=""
        width={60}
        height={60}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full"
      />
      <RichText data={blok.description} className="text-lg ml-3" />
    </section>
  );
}
