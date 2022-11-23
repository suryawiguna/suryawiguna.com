import { getAllPosts } from "../../lib/api";

const Post = ({ content }) => {
  return <div>{content}</div>;
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: { ...post },
  };
};

export default Post;
