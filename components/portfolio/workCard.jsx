import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const WorkLink = styled.a`
  span {
    border-radius: 1rem;
  }

  &:hover {
    span {
      transform: translateY(-4px);
      transition: 0.1s all ease-in-out;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
