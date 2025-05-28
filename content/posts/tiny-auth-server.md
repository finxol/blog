---
title: I made a small auth server template for Deno Deploy
description: I've fallen in love with Deno and its Deploy service, but also OpenAuth, so I made a simple template to deploy OpenAuth to Deno Deploy, using Deno KV for storage.
date: 2025-05-26
authors:
  - name: finxol
tags:
  - auth
  - open source
published: true
---

I'm currently messing around with Deno Deploy to build a tiny little service for myself, and I needed authentication—all apps need auth nowadays, url scanners are out of control.

I didn't really want to have the auth server coupled with the main service, so I just made it into a [separate repository](https://github.com/finxol/auth).
The advantage here is that it's very minimal, so it runs for free no problem.

It's just a very basic wrapper around OpenAuth, using Deno KV for storage. It took me an afternoon to put together properly,
but if you need a little auth server and not bother too much, this might be a good starting point.

With that, I can now use my own domain to authenticate users, and I only need my url and client id key.

So go crazy, [follow the instructions](https://github.com/finxol/auth#deploy) in the README, and deploy it to Deno Deploy!
