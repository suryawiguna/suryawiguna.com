---
title: "My learning experience with ExpressJS and Mongoose"
excerpt: "I Learned ExpressJs as I took a job as Backend Developer, here's how the experience"
date: 2021-03-24T07:43:00.000Z
updated: 2026-08-09T10:56:53.879Z
cover: "https://a.storyblok.com/f/169901/fcd76bb9c4/photo-1544383835-bda2bc66a55d.jpeg"
noindex: true
---

Last year, I got an offer to join my friend in a company as backend developer. This position actually interesting yet challenging for me because they combine Laravel and JavaScript as the backend logic (ExpressJS and Mongoose). As I never develop production service using JavaScript, I challenge myself to accept the offer and commit to learn the framework.

### Learning Process

Best learning method in programming is by doing. By building app or website or service that actually used by real user, so we can learn what the real challenge is. While I learn JS framework for building service that used by web app and mobile app, it demand fast learning and commitment to stay updated with the latest best practice code to prevent the server from loading too slow.

I learned ExpressJS and Mongoose from read the legacy code while trying to understand the logic, check the official documentation, and if I struggle to find what I need, go to Stack overflow of course. One thing I realized after using two different language in my career until now (PHP & JavaScript), is that the logics are fundamentally the same (loop, if else, try catch, etc) but indeed JS offer something like Promise() that make writing code is more fun.

### Mongoose vs SQL

I know mongoose because of this, and it’s mind blowing to handle data. The simplicity of its query make it more fun to query the data. For example if you want to find data in the collection, you simply call :

```javascript
User.findOne({ email: "my@email.com" })
```

From that code you can save it to a variable or attach a .then() like this:

```javascript
User.findOne({ email: "my@email.com" })
.then((user) => {
console.log(user)
})
```

That’s basically it to find user with email `my@email.com`. I think I love mongodb and mongoose.

Okay that’s my experience learning new language and framework as a backend developer in a new company. Thanks for reading and how do you think of learning by doing in work? Let me know
