---
title: Home
description: >
  I'm [Arpit Agrawal](https://arpit.codes), and this is a site for my personal notes. This is where I jot down everything I'm learning, with the hope of referencing it in the future.
featured:
  filter: [["data.featured", "isEqual", true]]
panel: false
layout: layouts/home.njk
eleventyExcludeFromCollections: true
---

## Latest

{{ collections.notes | reverse | limit(3) | renderAsNotesList | safe }}

## Personal Favorites

{{ collections.notes | reverse | query(featured) | limit(3) | renderAsNotesList | safe }}

## Colophon

This website is built with [Eleventy](https://11ty.dev) using the [Eleventy Notes](https://eleventy-notes.sandroroth.com/) starter, with modifications tailored to my preferences.
