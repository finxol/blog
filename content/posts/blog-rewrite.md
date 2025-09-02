---
title: I rewrote my blog and it was more trouble than I expected
description: The last time I changed anything on my previous blog was almost exactly 2 years ago. Wayyy too long. So I rewrote it completely.
date: 2024-11-14
updated: 2025-05-28
authors:
  - name: finxol
tags:
  - code
  - rants
published: true
---

I never was never quite satisfied by how my blog looked and felt.
When I first set it up I didn't want to bother much with it so I took the first template I found in a language and framework I knew: Nuxt.js.
_Spoiler: I went for Nuxt again, but for different reasons this time._

## Version one was not good

If you're curious, I'm keeping the original version up and running for a bit on [v1.finxol.io](https://v1.finxol.io/)

The starter package I used to get my blog up and running was [some random npm package](https://www.npmjs.com/package/@jsilva-pt/nuxt-content-theme-blog)
I found god knows where that's barely maintained.
Last published version was _4 years ago_, which means it was already 2 years old when I used it.

Another problem with it is that it's an npm module, so I can't fork or customise it easily.

I mentioned it was built with Nuxt, which is perfectly fine in itself, but the problem is with the version.
You see, Nuxt 3 was officially released almost exactly 2 years ago, so basically when I had last committed on this blog.
I started it only a few months before, so Nuxt 3 was already at the Release Candidate stage, yet I stuck with Nuxt 2 despite the much closer EOL to come.

Nuxt 3 is a complete rewrite, so the API changed A LOT, enough for lazy me to stick with the soon-to-be-killed framework.
It admittedly caused quite a mess in a number of production codebases.

Anyway, all this to say I made a bad choice when I initially built it, so I decided to start over.

## Building a new blog

I had a few requirements before starting my quest to find a suitable heir to Nuxt.
It has to:

1. Accept markdown.
  I don't want to have to rewrite all my (6) previous blog posts.
2. Customisable — _to some extent_.
  I'm after a simple theme, but I want to have things like external links in the nav bar, a list of posts on the home page, and an about page.
  I don't consider these to be unreasonable asks — _please let me know if any of these sound outrageous._
3. Not TOO hard to setup.
  I'll get to it in a minute, but some "easy" options are a nightmare to customise properly.
4. Generate to static files.
  I don't want to bother with manual hosting, copying the files by hand everytime I make a little change,
  but I also don't want to have a full Node server running on an expensive VPS just for a simple blog.

With these more-or-less well defined requirements in mind, I started looking at things I'd heard good things about before.

### Researching my options

#### Eleventy

I'd heard amazing things about 11ty, especially
[from](https://bell.bz/eleventy-excellent-truly-is-excellent/)&nbsp;
[Andy](https://bell.bz/importing-eleventy-content-into-wordpress/)&nbsp;
[Bell](https://github.com/Andy-set-studio/personal-site-eleventy).
I kept reading it was a solid option for static site generation.
So I gave it a shot.

Well let me tell you it is definitely not for the weak.
The syntax is quite weird in the `.njk` files.

To be fair though, it does seem fairly straightfoward to use only with markdown files and a template.
But unfortunately that doesn't fill in my second requirement...

#### Hugo

My starting point with Hugo was the same. I'd seen a few of my [peers](https://blog.itarow.xyz/)
and university friends use it, and it seemed a solid option too.
For some reason I deliberately chose to stay clear of it in the past, but I don't remember why.

Having tried it again, it was a fairly good call.
I think it's mostly the unfamiliar syntax that put me off, and I'm not a fan of TOML.
It's not a bad format, it's quite readable, but somehow I can't wrap my head around it and use it properly.

I was quite surprised by the nuber of themes available though: 181 themes listed under "blog" on the official themes website.
I managed to find one that was close enough to what I wanted, but I really struggled to customise it and make it work with my info.

#### Deno blog

Lately, I've been using and loving Deno quite a bit, so when I saw [\*the\* Deno guy's](https://tinyclouds.org/) blog was built with a [simple Deno lib](https://deno.land/x/blog@0.7.0),
I had to try it out.

Much to my disappointment, it didn't work with the current version of Deno.
I guess version 2.0 broke a few things.

Looking at it again now, it doesn't seem very customisable, if at all, so I suppose it wouldn't've been a good fit anyway.

#### VitePress

Next one I tried was VitePress. I'd barely heard of that one before, only in passing, but it's built on Vue, which I really like and know decently well.

It's supposed to be built rather for documentation websites, but I came accross a few tutorials on how to make a blog out of it,
so I tried that one out.

Turns out I couldn't break free from the default "docs" style template — even though I quite liked it visually,
so that's a no go.

#### Nuxt (again)

I can picture Nuxt looking at me laughing while I come running back to it after trying out other option.

Nuxt is a solid choice for Static Site Generation (SSG), it comes with all sorts of bells and whistles,
is super extensible, while still being really fast.

First I set out to find a minimalist blog template or starter to kick things off.
However, I couldn't find anything that I really liked during my (not hugely) extensive research.

The only logical solution is to make my own thing :)

To be clear, I didn't completely rewrite everything because that's way too time consuming for a little blog like this.
I just made the UI and pages, and used [Nuxt Content](https://content.nuxt.com/) along with [Tailwind](https://tailwindcss.nuxtjs.org/).
I'll be honest, minimum effort was big criteria in the final choice too.

### Result

If you're reading this on the actual website, then you're seeing the result.
Not too bad for an afternoon's work!
*Edit:* To be fair, it's been updated and improved a good bit since.
You can still see the original (new) version [here](https://finxol-blog-z6f9qqkjrjz5.deno.dev/).

The website is really fast and snappy, as expected for a simple blog like this.
Hosting is dead simple and pretty fast with Github Pages too.

And that's some pretty damn good results from PageSpeed Insight.

![PageSpeed Insight result](/posts/blog-rewrite/pagespeed-insight-result.jpg)

## Publish it as a blog starter

I want to help out the comunity along the way, so I'll adjust a few things to make it into a template repo to use as a starter,
in case anyone out there is looking to build a simple markdown blog with Nuxt.

*Update:* I've finally taken the time, so it's now [available as a template](/posts/blog-template)!
