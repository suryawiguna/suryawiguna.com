import Image from "next/image";
import { RichText } from "../global";

export default function introduction({blok}) {
    return (
        <section>
            <Image
            src={blok.image.filename}
            alt=""
            width={120}
            height={120}
            placeholder="blur"
            blurDataURL={blok.image.filename}
            className="rounded-full"
            />
            
            <RichText data={blok.description}/>
        </section>
    )
}