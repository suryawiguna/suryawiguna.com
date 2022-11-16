import StoryblokClient from "storyblok-js-client";
let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
})

export default function RichText({data}) {
    return (
        <div dangerouslySetInnerHTML={{ __html: Storyblok.richTextResolver.render(data) }} />
    )
}