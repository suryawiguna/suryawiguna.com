---
title: "Let's compare JSX with HTML"
excerpt: "JSX and HTML are slightly different, read more to choose which one to use on your project"
date: 2021-09-30T11:49:32.000Z
updated: 2024-07-26T11:21:31.585Z
tags: ["Web Development"]
cover: "https://a.storyblok.com/f/169901/a6aaeeb181/pankaj-patel-u2ru4qbxa5q-unsplash.jpeg"
---

A web page is made of HTML as its structure, stands for Hypertext Markup Language. The code is either HTML originally or compile to it so the browser can read it and show the content of the web page on your screen.

On the other hands, JSX stands for JavaScript Syntax Extension or some called JavaScript XML. It was introduced with Reactjs around 2013. It allows developers to write HTML within JavaScript. So technically when you’re writing JSX, you’re writing JavaScript and HTML together. Also that’s why some HTML attribute renamed on JSX, like the “`**class**`” attribute on HTML to be “`**className**`” on JSX since “`**class**`” is a common keyword for JavaScript.

Other thing is, HTML is natively supported by all browser. While JSX on the other hands, is not. So you need a compiler like Babel or Webpack to make the browser can understand it. Now let’s compare JSX with HTML

## So, what the main difference?

#### JSX must return a single parent element

One major difference is you must return a single parent element in JSX, or it won’t compile. While on HTML you are free to do what ever you want as you don’t have to return a single parent element in a single file. Let’s see here, JSX give an error because there are two parent elements.

![](https://i0.wp.com/blog.suryawiguna.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-29-at-19.22.39-1024x692.png?resize=620%2C419&ssl=1)Error on JSX if there are more than one parent

To fix this, we can add ***fragment*** which is `**<>...</>**`. See below after fragment added.

![](https://i0.wp.com/blog.suryawiguna.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-29-at-19.25.36-1024x692.png?resize=620%2C419&ssl=1)There’s no error after adding fragment

#### You can write JavaScript code directly inside JSX

In JSX, you can directly write JavaScript code alongside the html tag. Where in HTML you need a `<script>` tag or an external JS file to implement JavaScript. In JSX you can write JavaScript code between curly braces `{...}`. Like below:

```javascript
const App = () => {
  return (
    <>
      {new Date()}
      <p>Hi there!</p>
      <p>How are you?</p>
    </>
  );
};
```

export default App;

#### JSX knows *className* and *HTMLFor*, not *class* and *for*

In HTML you write class names and for attribute like so, `**class**` and `**for**`. But in JSX you don’t write those since both are reserved keyword in JavaScript, instead write `**className**` and `**HTMLFor**`.

```javascript
const App = () => {
  return (
    <div className="container">
      {new Date()}
      <p>Hi there!</p>
      <p>How are you?</p>
      <br />
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" />
      </form>
    </div>
  );
};
```

export default App;

#### JSX likes camelCase

In JSX, all HTML attributes and event references are written in camelCase. So, `**onclick**` become `**onClick**`, `**onmouseover**` become `**onMouseOver**` and so on.

```javascript
const App = () => {
  const sayHi = () => {
    alert("Hi there!");
  };
  return (
    <div className="container">
      {new Date()}
      <p>Hi there!</p>
      <p>How are you?</p>
      <br />
      <button onClick={sayHi}>Say it!</button>
    </div>
  );
};

export default App;
```

#### Inline styles are written as objects in JSX

While in HTML you write inline styling inside the tag as a string, in JSX the style is an object. So you define the style name with the properties in camelCase, the values in quotes, then you can pass it inline to the JSX.

```javascript
const App = () => {
  const inlineStyle = {
    color: "#000000",
    fontSize: "12px"
  };

  return (
    <div className="container">
      {new Date()}
      <p style={inlineStyle}>Hi there!</p>
      <p>How are you?</p>
      <br />
      <button onClick={sayHi}>Say it!</button>
    </div>
  );
};

export default App;
```

or you could write the styles directly inside the JSX tag like this:

```javascript
const App = () => {
  return (
    <div className="container">
      {new Date()}
      <p style={{color: "#000000",fontSize: "12px"}}>Hi there!</p>
      <p>How are you?</p>
      <br />
      <button onClick={sayHi}>Say it!</button>
    </div>
  );
};

export default App;
```

But of course it make your code cleaner by define the object outside JSX first and then pass it into the opening tag.

That’s it! Those are the differences that I realize when I’m working with JSX. Such a handy way to build a website! Thank you for reading, please leave a comment if you find this interesting and helpful.
