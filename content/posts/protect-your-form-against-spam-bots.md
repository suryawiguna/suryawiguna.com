---
title: "Protect your form against spam bots"
excerpt: "Protect your form against the spam bot using captcha"
date: 2022-06-26T16:54:06.000Z
updated: 2024-07-26T11:23:26.241Z
tags: ["Web Development"]
cover: "https://a.storyblok.com/f/169901/90f65f20f1/vecteezy_recaptcha-i-m-not-a-robot-confirmed-recaptcha-i-m-not-a_6308951.jpg"
featured: true
---

I was in the middle of embedding a third-party form on the website. The form snippet is just like the usual HTML form and the website is built using Next.js. At first, I thought it’s working well, fill the fields and submit it. But my team was told that we received various weird submissions with wrong data has filled in that causing system error, and we suggested that they were submitted by bots. How did we manage to solve it?

## Block interaction on submitting process

Honestly I was not familiar about how the bots are work, but the first thing came in my mind was to secure the submit process. So we decided to hide all the fields and replace it with loading screen to prevent they change the value on the go while the process of submitting still running (if it is possible?).

So what’s on the front-end side will display is the normal form with the fields are available to fill, and when the form is being submitted, it will replace all the fields with loading animation to indicate that the process is still running. I was just not hiding the fields with css, I literally removed it with useState function from React but I stored all the fields value first that will use for the submission. So I thought with this approach at least the data cannot be changed and we will received a correct values.

## Move submit through API call

But the first trial was not as expected. So next approach I did was to move form submission from usual form submit that specify on the form tag itself to the API call. So the usual form will looks something like this right?

```html
<form action="https://some.url.com" method="POST">
<label for="email">Email address</label>
<input type="email" name="email" required>
<input type="submit" value="Submit">
</form>
```

And as I move the submit function to using API call, now the form looks like this:

```html
<form action="" method="POST" onSubmit={(e) => {handleSubmit(e);}}>
<label for="email">Email address</label>
<input type="email" name="email" required>
<input type="submit" value="Submit">
</form>
```

Notice that on the `action` attribute we leave it empty, this is important as bots will have no access to the destination URL for submit the form. Instead, we do the POST request through API call with the `onSubmit` event and remember to use `event.preventDefault()` first to prevent the default behavior. The code will looks something like this:

```javascript
const handleSubmit = (e: FormEvent) => {
// prevent form default behavior
e.preventDefault();

// do POST request to submit the form
fetch("https://some.url.com", {
  method: "POST",
  body: formData,
})
.then((response) => {
  alert("Success");
})
.catch((error) => console.log(error));
};
```

By doing this I can also do some advance complicated validation first before the form is submitted. This approach was able to reduce the amount of weird and wrong submissions, but not all.

## Add Google Recaptcha

Finally, one of the strong protection that can we use to protect a form is by adding the Google Recaptcha to our form, so did I. Google recaptcha basically add some challenge that are very difficult to solve by bot. You can read more about it on [their official site](https://www.google.com/recaptcha/about/). For starting using it, simply go to [here](https://www.google.com/recaptcha/admin/create) and create the captcha. When you save it, you will have a site\_key and secret\_key.

Then basically you add the placeholder where do you want the recaptcha will display on your form just make sure it’s inside the `<form>` to easily make it required for every form submission. Then since I use API call for submitting the form, Google also provide API for verifying the token to determined if user passed the challenge or not.

And so with all the preventive action that I took, we are having no weird submissions anymore. Some of useful articles about adding Google Recaptcha if you’re using Next.js too are [here](https://prateeksurana.me/blog/integrating-recaptcha-with-next/) and [here](https://flaviocopes.com/nextjs-recaptcha/). Thank you for reading!
