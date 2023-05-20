import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const WorkLink = styled.a`
  span {
    border-radius: 1rem;
  }
`;

export default function WorkCard({ work }) {
  return (
    <Link key={work._uid} href={work.link.url} passHref>
      <WorkLink
        href=""
        target="_blank"
        rel="noreferrer"
        className="relative h-32"
      >
        <Image
          src={work.image.filename}
          width={284}
          height={180}
          layout="fill"
          objectFit="cover"
          alt=""
          placeholder="blur"
          blurDataURL={`${work.image.filename}/m/40x40`}
          className="opacity-75 hover:opacity-100"
        />
      </WorkLink>
    </Link>
  );
}
