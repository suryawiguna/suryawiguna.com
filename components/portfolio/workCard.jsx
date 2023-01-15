import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const WorkLink = styled.a`
  span {
    border-radius: 1rem;
    img {
      transition: 0.3s all ease-in-out;
      transform: scale(1);
    }
  }

  &:hover {
    span {
      img {
        transform: scale(1.1);
      }
    }
  }
`;

export default function WorkCard({ work }) {
  return (
    <Link key={work._uid} href={work.link.url} passHref>
      <WorkLink href="" target="_blank" rel="noreferrer">
        <Image
          src={work.image.filename}
          width={284}
          height={180}
          alt=""
          placeholder="blur"
          blurDataURL={`${work.image.filename}/m/40x40`}
        />
      </WorkLink>
    </Link>
  );
}
