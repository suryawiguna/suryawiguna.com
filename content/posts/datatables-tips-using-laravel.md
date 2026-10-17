---
title: "DataTables tips using Laravel"
excerpt: "Datatable is a useful plugin for displaying data to table in more advance way."
date: 2020-09-06T10:26:00.000Z
updated: 2026-08-09T10:56:22.218Z
cover: "https://a.storyblok.com/f/169901/8856440f00/mika-baumeister-wpnoqo2plfa-unsplash.jpeg"
noindex: true
---

Datatable is a useful plugin for displaying data to table in more advance way. It provide search, filter, pagination, and sorting from the beginning you use it. But you usually don’t need all of the feature, or want to display button in the table, etc. Now I wanna share some tips in using datatable with Laravel.

### Add button inside dataTable

When displaying data in a row, usually in the last column we want to add button for user to take action with the data e.g. button edit, and delete. But datatable not natively render html tag, so we need to use `addColumn()` and `rawColumns()` like this in controller:

```php
$data = DataTables::of($data)->addColumn('action', function($row) {
return "<a href='/user/edit/1' class='btn btn-sm btn-success'>Edit</a><a href='/user/destroy/1' class='btn btn-sm btn-danger btn-delete'></i>Hapus</a>";
})->rawColumns(['action']);
```

### Load table on click

This case is usually when you have multiple datatable in one page and you organize it in tab view, you want to load data only when related tab is click. You can reload the table by using `reload()` function to do that.

```php
$('#clickable_id').click(function() {
$('#table').DataTable().ajax.reload();
});
```

### Disable Sorting and searching individual column

Datatable provide many feature to make a more useful table like searching, pagination, sorting, etc. But when you don’t want particular column searchable or sortable, you can disable it.

```php
columns: [
{ data: 'name', searchable: false, orderable: false },
]
```

That are some tips to use datatable with Laravel. Thank you for reading, if you have any more tips or question please drop it on comment.
