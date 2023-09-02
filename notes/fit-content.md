---
title: CSS fit-content
date: 2023-08-03
tags:
  - css

canonicalLink: https://ishadeed.com/snippet/fit-content/
---

Ahmad Shadeed on how the browser deals with the CSS sizing keyword [`fit-content`]({{ canonicalLink }}):

> It checks if the available is more than max-content, then the width is equal to max-content. If the available space is less than max-content, then the width will be equal to the available space. Finally, if the available space is less than min-content, then the width will be equal to min-content.
