"use client";
import { storyblokEditable } from "@storyblok/react";

export default function DynamicComponent({ bloks, components }) {
  return (
    <>
      {bloks.map((blok) => {
        if (typeof components[blok.component] !== "undefined") {
          const Component = components[blok.component];
          return (
            <div {...storyblokEditable} key={blok._uid} content={blok}>
              <Component blok={blok} />
            </div>
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
