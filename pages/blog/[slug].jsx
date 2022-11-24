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
// import { GoogleAdsenseContainer } from "../../components/ads";
import { InlineShareButtons, InlineReactionButtons } from "sharethis-reactjs";
import DisqusComments from "../../components/disqusComment";

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
          {/* <GoogleAdsenseContainer />  */}
          <InlineReactionButtons
            config={{
              alignment: "center", // alignment of buttons (left, center, right)
              enabled: true, // show/hide buttons (true, false)
              language: "en", // which language to use (see LANGUAGES)
              min_count: 0, // hide react counts less than min_count (INTEGER)
              padding: 12, // padding within buttons (INTEGER)
              reactions: [
                // which reactions to include (see REACTIONS)
                "slight_smile",
                "heart_eyes",
                "laughing",
                "astonished",
                // "sob",
                // "rage",
              ],
              size: 32, // the size of each button (INTEGER)
              spacing: 8, // the spacing between buttons (INTEGER)
            }}
          />
          <div className="w-full h-fit">
            <DisqusComments post={post} />
          </div>
          <Link href="/blog" passHref>
            <a
              href=""
              className="p-4 px-6 mt-8 text-sm rounded-full bg-gray-100 hover:bg-gray-200"
            >
              ⏎ Kembali ke blog
            </a>
          </Link>
        </div>
        <div className="sticky top-4 lg:max-w-[280px] flex flex-col gap-10 p-5 rounded-xl h-fit bg-gray-100">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold px-2">🙌🏼 Share This</h3>
            <div className="ml-2">
              <InlineShareButtons
                config={{
                  alignment: "left", // alignment of buttons (left, center, right)
                  color: "social", // set the color of buttons (social, white)
                  enabled: true, // show/hide buttons (true, false)
                  font_size: 18, // font size for the buttons
                  labels: "null", // button labels (cta, counts, null)
                  language: "en", // which language to use (see LANGUAGES)
                  networks: [
                    // which networks to include (see SHARING NETWORKS)
                    "facebook",
                    "linkedin",
                    "twitter",
                    "whatsapp",
                  ],
                  padding: 10, // padding within buttons (INTEGER)
                  radius: 10, // the corner radius on each button (INTEGER)
                  show_total: false,
                  size: 40, // the size of each button (INTEGER)
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold px-2">📋 More articles</h3>
            <div className="flex flex-col gap-1">
              {featuredPosts.map((post, key) => (
                <Link key={key} href={post.slug} passHref>
                  <a
                    href=""
                    className="flex items-start gap-2 hover:bg-gray-200 p-1 px-3 rounded-xl"
                  >
                    <div className="w-96 h-16 relative mt-1">
                      <Image
                        src={`https:${post.content.featured_image.filename}`}
                        placeholder="blur"
                        blurDataURL={`https:${post.content.featured_image.filename}/m/40x40`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-0">
                      <h3 className="text-sm leading-tight font-semibold">
                        {post.name}
                      </h3>
                      <RichText
                        data={post.content.excerpt}
                        className="line-clamp-2 leading-tight text-xs"
                      />
                    </div>
                  </a>
                </Link>
              ))}
            </div>
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
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const navigation = (await getNavigation()) || [];
  const featuredPosts = (await getFeaturedPosts()) || [];

  return {
    props: { post: post, featuredPosts: featuredPosts, navigation: navigation },
    revalidate: 360,
  };
};

export default Post;
