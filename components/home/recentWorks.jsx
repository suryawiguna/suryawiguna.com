import WorkCard from "../portfolio/workCard";
import Link from "next/link";
import styled from "styled-components";

const WorkLink = styled.a`
  border-radius: 1rem;

  &:hover {
    transform: translateY(-4px);
    transition: 0.1s all ease-in-out;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
`;

export default function RecentWorks({ blok }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold">{blok.title}</h2>
      <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blok.items.map((work, key) => {
          return <WorkCard key={key} work={work} />;
        })}
        <Link href="/portfolio" passHref>
          <WorkLink
            href=""
            rel="noreferrer"
            className="relative h-32 self-center bg-gray-100 flex justify-center items-center text-gray-500"
          >
            See more
            <i className="bx bx-right-arrow-alt text-2xl" />
          </WorkLink>
        </Link>
      </div>
    </div>
  );
}
