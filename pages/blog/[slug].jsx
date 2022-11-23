import Head from "next/head";
import Image from "next/image";
import { RichText } from "../../components/global";
import Layout from "../../components/layout";
import {
  getAllPosts,
  getFeaturedPosts,
  getNavigation,
  getPost,
} from "../../lib/api";
import moment from "moment";
import Link from "next/link";

const Post = ({ post, featuredPosts, navigation }) => {
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${post.name} - Blog - Surya Wiguna`}</title>
      </Head>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col items-start gap-6">
          <div>
            <h1 className="font-bold text-3xl">{post.name}</h1>
            <small className="text-gray-500">
              {moment(post.first_published_at).format("MMMM DD, YYYY")}
            </small>
          </div>
          <div className="w-full h-80 relative">
            <Image
              src={`https:${post.content.featured_image.filename}`}
              placeholder="blur"
              blurDataURL={`https:${post.content.featured_image.filename}/m/40x40`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <RichText data={post.content.content} />
          <Link href="/blog" passHref>
            <a
              href=""
              className="p-4 px-6 mt-8 text-sm rounded-full bg-gray-100 hover:bg-gray-200"
            >
              ⏎ Kembali ke blog
            </a>
          </Link>
        </div>
        <div className="sticky top-4 lg:max-w-[280px] flex flex-col gap-2 p-6 rounded-xl h-fit bg-gray-100">
          <h3 className="text-xl font-bold px-2">📋 More articles</h3>
          <div className="flex flex-col gap-1">
            {featuredPosts.map((post, key) => (
              <Link key={key} href={post.slug} passHref>
                <a
                  href=""
                  className="flex items-center gap-4 hover:bg-gray-200 p-2 px-3 rounded-xl"
                >
                  <div className="w-96 h-24 relative">
                    <Image
                      src={`https:${post.content.featured_image.filename}`}
                      placeholder="blur"
                      blurDataURL={`https:${post.content.featured_image.filename}/m/40x40`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm leading-tight font-semibold">
                      {post.name}
                    </h3>
                    <RichText
                      data={post.content.excerpt}
                      className="line-clamp-2 text-xs"
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
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
  const featuredPosts = (await getFeaturedPosts()) || [];

  return {
    props: { post: post, featuredPosts: featuredPosts, navigation: navigation },
  };
};

export default Post;
