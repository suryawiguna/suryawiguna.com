import Head from "next/head";
import Layout from "../components/layout";
import * as components from "../components/home";
import { getAllPosts, getHome, getNavigation } from "../lib/api";
import { DynamicComponent, RichText } from "../components/global";
import Link from "next/link";
import Image from "next/image";

export default function Index({ posts, navigation }) {
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>Blog - Surya Wiguna</title>
      </Head>
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-bold text-3xl">Blog</h1>
        {/* <DynamicComponent bloks={data.body} components={components} /> */}
        <div className="flex flex-col max-w-2xl gap-4">
          {posts.map((post) => (
            <Link key={post._uid} href={post.full_slug} passHref>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-5"
              >
                <div className="rounded-lg flex flex-col sm:flex-row items-stretch">
                  <div className="relative min-h-[120px] min-w-[140px] sm:min-h-[140px] sm:min-w-[180px]">
                    <Image
                      src={`https:${post.content.featured_image.filename}`}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      placeholder="blur"
                      blurDataURL={`https:${post.content.featured_image.filename}`}
                      className="shrink rounded-lg"
                    />
                  </div>
                  <div className="pt-3 sm:pt-0 sm:pl-6 flex-1">
                    <h5 className="text-gray-900 text-xl font-semibold mb-1">
                      {post.name}
                    </h5>
                    <div>
                      <RichText
                        className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                        data={post.content.excerpt}
                      />
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = (await getAllPosts()) || [];
  const navigation = (await getNavigation()) || [];

  return {
    props: {
      posts: posts,
      navigation: navigation,
    },
    revalidate: 360,
  };
}
