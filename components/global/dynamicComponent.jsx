import SbEditable from "storyblok-react";

export default function DynamicComponent({ bloks, components }) {
  return (
    <>
      {bloks.map((blok) => {
        if (typeof components[blok.component] !== "undefined") {
          const Component = components[blok.component];
          return (
            <SbEditable key={blok._uid} content={blok}>
              <Component blok={blok} />
            </SbEditable>
          );
        }
        return (
          <p key={blok._uid}>
            The component <strong>{blok.component}</strong> has not been created
            yet.
          </p>
        );
      })}
    </>
  );
}
