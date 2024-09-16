# Mini Tailwind

A small javascript file that replicates dynamic class generation inspired from tailwind.

The file is only 1KB in size so you can just copy it and import into your HTML file like so:

```html
<script src="dynamicStyles.js"></script>
```

Example usage:

```html
<div style="w-[100px] h-[100px] bg-[#eee] p-[4rem]"></div>
```

output:

```css
/* The output is minified. not exactly in this format */
<style>
  .w-\[100px\] {
    width: 100px;
  }

  .h-\[100px\] {
    height: 100px;
  }

  .bg-\[\#eee\] {
    background-color: #eee;
  }

  .p-\[4rem\] {
    padding: 4rem;
  }
</style>
```
