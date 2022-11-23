import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPosts, getNavigation, getPost } from "../../lib/api";

const Post = ({ post, navigation }) => {
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${post.name} - Blog - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">{post.name}</h1>
        {/* <DynamicComponent bloks={data.body} components={components} /> */}
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const navigation = (await getNavigation()) || [];

  return {
    props: { post: post, navigation: navigation },
  };
};

export default Post;
