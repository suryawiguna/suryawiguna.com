import { RichText } from "../global";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";

const PostLink = styled.a`
  &:hover {
    transform: translateY(-4px);
    transition: 0.1s all ease-in-out;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }

  span {
    border-radius: 1rem 1rem 0 0;
    img {
      transition: 0.1s all ease-in-out;
      transform: scale(1);
    }
  }
`;

export default function PostCard({ post }) {
  return (
    <Link key={post._uid} href={post.full_slug} passHref>
      <PostLink href="" className="bg-gray-100 rounded-2xl">
        <div className="rounded-lg flex flex-col items-stretch">
          <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
            <Image
              src={post.content.featured_image.filename}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={`${post.content.featured_image.filename}/m/40x40`}
              className="shrink"
            />
          </div>
          <div className="pt-3 flex-1 p-5">
            <h5 className="text-gray-900 text-xl font-semibold mb-1">
              {post.name}
            </h5>
            <div>
              <RichText
                className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                data={post.content.excerpt}
              />
            </div>
            <small className="text-gray-400 text-xs self-end">
              {moment(post.first_published_at).format("MMMM DD, YYYY")}
            </small>
          </div>
        </div>
      </PostLink>
    </Link>
  );
}
