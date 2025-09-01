---
title: Picking the right tool for the job
description: There's always a consistent host of people screaming "Just fucking use HTML", while that is valid, there's some nuance to be said.
date: 2025-06-02
authors:
  - name: finxol
tags:
  - opinion
  - tooling
published: false
---

All the ["Just Fucking use HTML"](https://justfuckingusehtml.com/) noise is quite aggressive and hard to ignore.
I think they've got a point, but that point also lacks nuance.
There's a reason more complex tools were built and are as popular as they are.

Let's dive into simplicity, complexity and tooling.

## The case for plain HTML

<!-- introduce things better please -->

Originally, web browsers were built to display simple text files with a special kind of markup called HTML,
that would place things in a certain way.
The browser would ask a server for a specific file, the server would send it back, and the browser would parse and diplay it.
It still works the same way nowadays, but we've added so many things on top that the possibilities are endless.

The next evolution that came along was CSS.
This allowed us to control the way the displayed HTML looked.

Javacript only came in a couple years later to do a few very simple client-side manipulations on the page.
The web


In a lot of cases such as a portfolio, blog, landing page, or any static website,
there's really no need to introduce unnecessary overhead.

<!--
simpler is often better, if it can get the job done.
no need to introduce complexity when it's not actually needed.

increased overhead can easily lead to worse perf.

simple things keep things simple.
no need for build steps or complex deployments.
-->

## The case for more complex tooling

<!--
plain html is ugly.
css is hard.

dx is also important.
-->

## Exceptions

Now, if you're a nerd like me—which you probably are if you're reading this—there's some tools you want to use just because they seem cool,
not necessarily because they're needed.

I think that's a valid exception to the "pick the right tool for the job" rule.
For our little projects no one else will realistically ever use or contribute to, who cares if you're massively over-engineering
or bringing in useless complexity?

But then ultimately, just use whatever makes your life easier to make a good user experience,
because that's what really matters in the end.
