---
title: "My way to handle money format input in Laravel"
excerpt: "Here’s my may to handle money format in a Laravel based website."
date: 2020-11-16T10:38:00.000Z
updated: 2026-08-09T10:56:33.605Z
cover: "https://a.storyblok.com/f/169901/dcb3d4e15a/mufid-majnun-uax6m-vtkos-unsplash.jpeg"
noindex: true
---

Common usage of website is to handle data about finance, which is the most data is money and it has a format. In Indonesia for example the format is like Rp1.500.000,00. The problem is with default HTML input, it can’t show format like that by default. So how to handle it? At least here’s my may to do that in Laravel based website.

### Database side

It has to handle in three side, the first in inside the database where you want to store the data. On sql there is *decimal* type that you can use to store number with commas. So in the migration you can simply use

```
$table->decimal('amount', 8, 2);
```

8 is the total digits and 2 is decimal digits. Refer to the [official documentation](https://laravel.com/docs/8.x/migrations#available-column-types).

### HTML side

So after we set database column to proper type, next we need to set the html input to prevent unwanted data that user accidentally input. In html there is

```html
<input type="number">
```

to handle number input. You can use attribute `step` to define decimal digit right on the input. There’re other additional attributes that you can use to, find more [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)

### Laravel blade side

Lastly, when you want to show the data to the user. Data format from database usually will look like this `1500000.00` and you want to show it like this `1.500.000,00`. To do this you can use php `number_format()` function inside the blade.

```
number_format($data, 2, ',', '.');
```

The first parameter is your number, next is how many decimal digit you want to show, the third is decimal separator, and the last is thousand separator. Read more in [PHP manual](https://www.php.net/manual/en/function.number-format.php)

Those are my way to handle money data, thanks for reading this and if you want to say something leave it in discussion.
