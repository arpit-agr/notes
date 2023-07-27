---
title: Zoom Image on Hover
demo: https://codepen.io/arpit-codes/pen/JjevmKM
tags:
  - css
---

A simple zoom effect can be achieved on hover using the `scale` property.

```css
img:hover {
	scale: 1.1;
}
```

But this causes the image to overflow its original width and height.

> The scale property in CSS resizes an element’s width and height in proportion. So, if we have an element that’s 100 pixels square, scaling it up by a value of 2 doubles the dimensions to 200 pixels square.
>
> <cite>[scale | CSS Tricks](https://css-tricks.com/almanac/properties/s/scale/)</cite>

## Creating a Non-Overflowing Zoom Effect for Images

What if our design requires us to create an effect where the image zooms without overflowing its original width and height? This could be achieved in 2 ways:

### Use an extra element

Wrap the image in a container and apply `overflow:hidden` to the container to hide the overflow when the image resizes.

```html
<!-- The image wrapper could just as well be a picture element -->
<div class="img-wrapper">
	<img src="" alt="" />
</div>
```

```css
.img-wrapper {
	overflow: hidden;
}

img:hover {
	scale: 1.1;
}
```

### Use clip-path

> The `clip-path` CSS property creates a clipping region that sets what part of an element should be shown. Parts that are inside the region are shown, while those outside are hidden.
>
> <cite>[clip-path | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)</cite>

The following code applies `clip-path` along with the `scale` property to essentially clip away the part of the image that overflows its original width and height.

```css
img {
	--scale-factor: 1;
	--border-radius: 4px;
	--clipping-region: inset(0 round var(--border-radius));

	border-radius: var(--border-radius);
	clip-path: var(--clipping-region);
	scale: var(--scale-factor);

	transition: 0.4s;
}

img:hover {
	--scale-factor: 1.1;
	--clipping-region: inset(
		calc((1 - 1 / var(--scale-factor)) * 50%) round var(--border-radius)
	);
}
```

{% codepen demo %}

## Acknowledgements

- The `clip-path` method is a modified version of [T. Afif's Codepen demo](https://codepen.io/t_afif/full/rNQJrVR)
- The code used to achieve [rounded corners with `clip-path`](https://stackoverflow.com/questions/31765345/how-to-round-out-corners-when-using-css-clip-path) was borrowed from Stack Overflow
