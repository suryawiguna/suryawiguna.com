---
title: "My favorite Laravel's Blade Tricks"
excerpt: "Here are some of my favorite Laravel’s blade trick to make the development process faster and easier."
date: 2020-08-02T20:41:00.000Z
updated: 2026-08-09T10:57:06.424Z
cover: "https://a.storyblok.com/f/169901/8b111754a3/photo-1607706189992-eae578626c86.jpeg"
noindex: true
---

Beside the ability to make inheritance template using **@extends**, **@section**, and **@yield**, Laravel also let us to write html with any condition that we desire according to our application. Here are some of my favorite Laravel’s blade trick to make the development process faster and easier.

## @if

This directive is useful when we’re trying to display data in view on various condition. We can use as many as **@elseif** that we need in Laravel’s view, but keep in mind of your website performance.

```html
@if (count($data) === 1)
<p>You only have one data</p>
@elseif (count($data) > 1)
<p>You have more than one data</p>
@else
<p>You don't have any data</p>
@endif
```

## @auth and @guest

We can use **@auth** and @guest usually to check either the user is authenticated or not to display the appropriate button, for example to display button Login for unauthenticated user and button Logout for the authenticated user.

```html
@auth
<button>Logout</button>
@endauth

@guest
<button>Login</button>
@endguest
```

## @for

If we want to do a simple loop in Laravel’s blade, we can use **@for** just like PHP’s loop structures.

```html
@for ($i = 0; $i <= 10; $i++)
The current order is {{$i}}
@endfor
```

## @foreach

When we display a list of data in the view, we can use @ foreach to loop through the variable to get each value.

```html
@foreach ($users as $user)
<tr>
<td>{{$user->name}}</td>
<td>{{$user->email}}</td>
</tr>
@endforeach
```

## @forelse

This directive is use to handle if the variable that we pass is empty to let the user know that there is no data to show.

```html
@forelse ($users as $user)
<tr>
<td>{{$user->name}}</td>
<td>{{$user->email}}</td>
</tr>
@empty
<tr colspan="2">
<td>There is no user</td>
</tr>
@endforelse
```

## @loop

When we do a loop, variable $loop will be available inside the loop. This variable provide many useful information, my favorite one is **$loop->iteration** to generate serial row number in table.

```html
@foreach ($users as $user)
<tr>
<td>{{$loop->iteration}}</td>
<td>{{$user->name}}</td>
</tr>
@endforeach
```

For the list of available properties, you can check [Laravel’s documentation](https://laravel.com/docs/7.x/blade#the-loop-variable)

## @csrf

Anytime we use a form in Laravel, we need to include CSRF token field in the form for security purpose. We may use **@csrf** directive to generate it.

```html
<form method="POST" action="/user">
@csrf
...
</form>
```

## @method

In Laravel we can use **PUT**, **PATCH**, or **DELETE** request. But html form not support that method, so we need to add hidden \_method field. We can use **@method** to create that.

```html
<form action="/user" method="POST">
@method('PUT')
...
</form>
```

## @error

We need to provide error handling in every request that user make, especially when submitting a form. We can use **@ error** to make a place in our view to display error message to the user.

```html
@error('title')
<div class="alert alert-danger">{{ $message }}</div>
@enderror
```

That are some of the trick that I like to use when developing using Laravel. What’s your favorite tricks? Let me know in the comment section, and I planned to make more article about Laravel like this. Thank you for reading!
