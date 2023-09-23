import Image from "next/image";
import { RichText } from "../global";
import styled from "styled-components";

const Richtext = styled(RichText)`
  a {
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function introduction({ blok }) {
  return (
    <section>
      <Image
        src={blok.image.filename}
        alt=""
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={`${blok.image.filename}/m/40x40`}
        className="rounded-full mb-2"
      />
      <Richtext data={blok.description} />
    </section>
  );
}
