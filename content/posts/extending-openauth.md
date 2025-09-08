---
title: Extending OpenAuth
description: I needed a self-hostable auth solution for the project I'm working on. OpenAuth's beautiful simplicity looked really promising. There were just a couple things I wanted adjusted, so I spent a weekend fixing then.
date: 2025-03-31
authors:
  - name: finxol
tags:
  - auth
  - open source
published: true
---

I'm currently building [Karr](https://karr.mobi/?utm_source=finxol-blog&utm_content=openauth-post), an open-source federated carpool platform—it's still very early days, not much there yet.
Like basically all apps nowadays, I need an auth system.

The only strong requirement I have is for it to be self-hostable.
Since I'm building a federated platform for companies, I don't want instance admins to have to rely on some arbitrary external auth service.

This limited my options a fair bit.
I considered a few other options, but I soon landed on OpenAuth.

## OpenAuth

If you haven't already heard of it, [OpenAuth](https://openauth.js.org/) is a pretty new open-source authentication library by the authors of [SST](https://sst.dev/).

The intent is for it to be "Universal, Self-hosted, Standards-based, and Customizable".
Promising stuff.<br/>
They also mention right on the home page that it can be "embed it into an existing application".
Perfect.

There's more. OpenAuth is built with Hono, and so is my API.
That means I can integrate it directly into my existing API!

There is however a slight half-truth in there.
Running OpenAuth from anything other than the root path (`/`) isn't supported yet, but I really wanted to avoid making a whole other Docker container or crazy path rewrites with the reverse proxy, so I went and implemented it myself.

## Sub-paths

Apparently, I'm not the first one to run into this issue.
Some people have already been [thinking of solutions](https://github.com/toolbeam/openauth/issues/125) for a couple months.

However, their approach didn't seem very robust and maintainable to me.
It involved looking through the codebase and finding every redirect, and adding the base path to them.

To me that sounds: 1. super tedious, and 2. hardly maintainable.
It would involve all future contributors and maintainers remembering to add the base path to each local url.
It seems to me like a mistake could easily slip through.

So instead, I went for a middleware approach.

If a base path is specified, all local redirect reponses will be rewritten to include it.
For example, a redirect to `/github/authorize` will be rewritten as `/auth/github/authorize` if OpenAuth is mounted at `/auth`.

All that was left to do was include the base path in the issuer, and remove it when building well-known routes.
I managed to get it working 45-ish lines of actual code—the rest is docs and tests—so it's a pretty minimal solution!

### Spec compliance

The first spec they mentioned in the issue, [RFC 5785](https://www.rfc-editor.org/rfc/rfc5785.txt), states that all Well-Known URIs  must be at the root, so at `/.well-known/`.

[RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.txt) also states that the Well-Known URI is obtained by "inserting a well-known URI string into the authorization server's issuer identifier between the host component and the path component, if any", e.g. if the issuer is `https://example.org/auth`, the well-known paths would be under `https://example.org/.well-known/*`

This means there needs to be some sort of rewrite/redirect from the root well-known URIs to the path where OpenAuth is mounted.

This is an annoying caveat, but I don't see any way to manage it directly inside OpenAuth since the whole point of this base path stuff is to not have it manage the root path.
It needs to be handled externally by whatever manages the root path, whether it be by a reverse proxy, a router, or a switchboard operator.

Best I could do is put a massive warning in the docs next to the `basePath` option.

Now I just need to wait for feedback [on my PR](https://github.com/toolbeam/openauth/pull/236) and hopefully a merge.


## Storage Adapters

The second annoyance I had with OpenAuth was the built-in storage adapters.
All they offered was either DynamoDB, Cloudflare KV or in-memory with a `Map` object.

Obviously, the latter isn't usable in a real production environment,
but the other 2 aren't any good to me either for the same reason as my self-hosted auth requirement.
I can't have instance admins rely on AWS or Cloudflare just for an auth KV.

So again, I went and did an adapter myself.

Of course, I didn't make a whole KV solution for Node.
I simply made a wrapper around [unstorage](https://unstorage.unjs.io/).
As of writing this, they have 21 drivers of all sorts.
The one I find particularly interesting is the SQL driver, although still experimental.

Building the adapter was simply a case of copy-pasting OpenAuth's `MemoryAdapter` and replacing the `Map` function calls with those of unstorage.
Very straightforward and automatable stuff.

There was however one slight snag.

When calling `.setItem(key, value)`, the key is used as it is.
However, when calling `.getKeys(base)`, the base is treated as a prefix and gets normalized, aka. it gets appended a semicolon.

This is a problem for use in OpenAuth.
The Storage API here has its own `joinKey(key)` method which joins the keys with `String.fromCharCode(0x1f)` as a separator, not a semicolon.

This difference means the keys won't be found when calling `.getKeys(base)`, so for the purposes of OpenAuth, unstorage needs a small patch to remove the semicolon addition for its internal `normalizeBaseKey(base)` function.

Since unstorage opens up a lot of possibilities for storage, I also [opened a PR](https://github.com/toolbeam/openauth/pull/235) for this one.

While I wait for my PRs to be merged, I'm just using both with pnpm patches.
