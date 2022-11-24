import { DiscussionEmbed } from "disqus-react";
const DisqusComments = ({ post }) => {
  const disqusShortname = "suryawiguna";
  const disqusConfig = {
    url: `https://suryawiguna.com/blog/${post.slug}`,
    identifier: post.content._uid, // Single post id
    title: post.name, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default DisqusComments;
