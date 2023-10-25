import Layout from "../../components/layout";
import {
  getAllPosts,
  getFeaturedPosts,
  getNavigation,
  getPost,
} from "../../lib/api";
import FullPost from "../../components/blog/fullPost";
import Sidebar from "../../components/blog/sidebar";

const Post = ({ data, post, featuredPosts, navigation }) => {
  return (
    <Layout data={data} navigation={navigation}>
      <div className="flex flex-col xl:flex-row gap-10">
        <FullPost post={post} />
        <Sidebar featuredPosts={featuredPosts} />
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const navigation = (await getNavigation()) || [];
  const featuredPosts = (await getFeaturedPosts()) || [];
  const data = {
    title: `${post.name} - Blog`,
    seo: {
      title: `${post.name} - Blog`,
      description: post.content.excerpt.content[0].content[0].text,
      og_image: post.content.featured_image.filename,
    },
  };

  return {
    props: {
      data: data,
      post: post,
      featuredPosts: featuredPosts,
      navigation: navigation,
    },
    revalidate: 10,
  };
};

export default Post;
