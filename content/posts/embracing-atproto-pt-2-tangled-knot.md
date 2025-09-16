---
title: "Embracing ATProto, part 2: Tangled Knots and social coding"
description: |
    You thought Github was a social coding platform? Think again, and get ready to tangle!
    Built on atproto, tangled allows you to use your Bluesky/atproto identity on a (not quite yet) fully feldged git platform!
date: 2025-09-17
authors:
  - name: finxol
tags:
  - atproto
  - self-hosting
published: true
---

I recently set up my own atproto PDS, for use with Bluesky and all other atproto apps.
If you already feel lost, check out last week's post where I quickly explain what atproto is,
roughly how it works, and the steps I followed to get my PDS running.

::Bookmark{url="/posts/embracing-atproto-pt-1-hosting-pds"}
Embracing ATProto, part 1: Setting up a PDS
::

The PDS setup and migration was an overall very smooth process.
Bluesky and the AT Protocol are built by a very competent team of well funded engineers who've been working on it for a few years already.

## What's tangled?

[Tangled](https://tangled.sh), on the other hand, was started only about 8 months ago, at the start of 2025 by [two](https://tangled.sh/@oppi.li) [brothers](https://tangled.sh/@icyphox.sh).
It's a "social-enabled git collaboration platform" built for decentralisation, ownership, and social coding.

The platform has gained a lot of traction since, and the community is very much involved in the development, but for now tangled is still in alpha.
That doesn't mean it's not usable yet, simply that some things may break.

### What's a Knot?

Just like plain atproto, tangled has some lingo of its own.

In tangled, a knot is essentially an atproto-enabled git server.
It's sort of like a PDS in the sense that it's where your data—here your code—lives.

That's the main tangled-specific decentralised part, and what makes tangled special.
You can keep ownership of your code, without cutting it off from a popular git platform—which
is a side effect of running a private Gitea or Gitlab server.

## Setting up a Knot

Setting up my own knot took a little bit more work than for the PDS.

The [official docs](https://tangled.sh/@tangled.sh/core/blob/master/docs/knot-hosting.md) give instructions for installation on a NixOS system,
but I'm not running NixOS on my server.
Luckily, they also provide a community-maintained [Docker install process](https://tangled.sh/@tangled.sh/knot-docker).

At the top of the README that serves as a documentation page, they talk about a pre-built image to use.
Perfect!
That's exactly what I'm looking for.
Just need to spin up the container and we're done!

Not quite, unfortunately...

I tried that route, added my knot on the tangled UI, but couldn't get it verified.
I spent way too long trying to debug the parts I control, mainly the Caddy reverse proxy rules.
It turns out the pre-built image was just out of date, and rebuilding it myself fixed it immediately...

Ultimately, setting up a knot isn't all that hard.
I just ran into a slightly stupid version mismatch problem a closer inspection could've revealed earlier.

## Spindles & CI

Another piece of lingo from the tangled world is "Spindle".

A Spindle is a very simple CI runner for tangled.
It spins up one Docker container per run, and gives access to any Nixpkg.
The syntax is very similar to Github Actions workflow files, with some slight differences.

Since it's brand new, there isn't access to the thousands of pre-made reusable Github Actions,
but access to the vast nixpkg catalog lets us do basically anything—with a couple extra steps from time to time.

### Self-hosting

As with everything else here, Spindles are self-hostable.
There is a little gotcha for the moment though.

Since the Spindle runs a Docker container for each workflow run, it needs access to the Docker socket.
They haven't got Docker-in-Docker working quite yet, so it means the Spindle needs to run natively outside a Docker container.

Although I don't like the idea, it's not really a problem for me.
I prefer to have everything containerised on my servers to keep things tidy, but it's fine as a temporary solution until they get DinD working.

What's stopping me right now is rather that workflow runs would spin up a Docker container alongside all my other projects I'd rather not break.
I'm aware it shouln't really be a problem, but it just bothers me.
It is very much a me problem, so I'll figure out a way around it eventually.

## Migrating this blog

Migrating the repo over is the simplest things ever.

Just create a new repo on tangled—making sure to select your knot, set the remote on your local repo, and push to it!
If you specified the knot correctly when creating your repo, the repo should now live directly on your Knot.

<img src="/posts/embracing-atproto-pt2/new-repo.png" alt="Select your new knot when creating a repo" width="80%" style="margin: auto;" />

You can now use git just as you normally do!

### CI for auto-deploy

Migrating CI takes a tiny bit more work to migrate.
I had a Github Action workflow to automatically deploy this blog to Deno Deploy on push.

<details class="minor-callout">

<summary>Here's the full file if you're curious.</summary>

```yaml
name: deno-deploy
on:
    push:
        branches:
            - main
jobs:
    deploy:
        runs-on: ubuntu-latest
        permissions:
            id-token: write # Needed for auth with Deno Deploy
            contents: read # Needed to clone the repository
        steps:
            - uses: actions/checkout@v3

            - uses: pnpm/action-setup@v4
              name: Install pnpm
              with:
                  run_install: false

            - uses: actions/setup-node@v3
              with:
                  node-version: 22
                  cache: pnpm

            - run: pnpm install

            - run: pnpm generate

            - name: Deploy to Deno Deploy
              uses: denoland/deployctl@v1
              with:
                  project: finxol-blog
                  entrypoint: https://deno.land/std@0.140.0/http/file_server.ts
                  root: .output/public
```

</details>

Let's start off very easy by adapting the triggers.
Just [follow the docs](https://tangled.sh/@tangled.sh/core/blob/master/docs/spindle/pipeline.md), and set the same trigger conditions.

```yaml
when:
    - event: ["push"]
      branch: ["main"]
```

I'll have a look at branch deploys later.
It needs a bit more manual work since the official GH Action doesn't handle it for us.

Since spindles work slightly differently to Github Actions runners, we need to give it a list of dependencies to install.
It's similar to the setup steps in the GH workflow to install node and pnpm.

```yaml
dependencies:
    nixpkgs:
        - deno
        - nodejs
        - pnpm
        - python3
        - gnused
```

This bit took a bit of trial and error, as you might notice from the `python3` and `gnused` dependencies.

I'd initially set the dependencies to what I set up in the GH workflow, `nodejs` and `pnpm`, plus `deno` to be able to use the `deployctl` cli tool.
But running that gave a few errors.
This blog uses Nuxt Content to generate HTML from my Markdown files, and Nuxt Content itself uses `better-sqlite3`, which itself needs python and sed in its post-install script.
Adding the corresponding nixpkgs in the dependencies array fixes this easily.

Now we can get to the actual steps of the workflow.

Since we don't have access to the existing Github Actions, there's a couple sections that needed adapting or manual work.
The install and generate steps are exactly the same, but the deploy step changes.

To replace the official Deno Deploy GH Action, we can directly use their `deployctl` cli tool, and give it the appropriate parametres.

I also used this as an excuse to switch to the `jsr:@std/http/file-server` entrypoint instead of the deno.land url style.

```yaml
steps:
    - name: Install dependencies
      command: |
          pnpm install

    - name: Generate static site
      command: |
          pnpm generate

    - name: Install deployctl
      command: |
          deno install -gArf jsr:@deno/deployctl

    - name: Deploy to Deno Deploy
      command: |
          cd .output/public
          ~/.deno/bin/deployctl deploy --project finxol-blog --entrypoint jsr:@std/http/file-server --include=. --prod
```

Lastly, don't forget to give the workflow permission to deploy by giving it a `DENO_DEPLOY_TOKEN` in the secrets!
Since Deno Deploy integrates only with Github, the permission won't be given automatically here.



<details class="minor-callout">

<summary class="text-stone-500">Here is the full spindle workflow file.</summary>

```yaml
when:
    - event: ["push", "pull_request"]
      branch: ["main"]

dependencies:
    nixpkgs:
        - deno
        - nodejs
        - pnpm
        - python3
        - gnused

engine: "nixery"

steps:
    - name: Install dependencies
      command: |
          pnpm install

    - name: Generate static site
      command: |
          pnpm generate

    - name: Install deployctl
      command: |
          deno install -gArf jsr:@deno/deployctl

    - name: Deploy to Deno Deploy
      command: |
          cd .output/public
          ~/.deno/bin/deployctl deploy --project finxol-blog --entrypoint jsr:@std/http/file-server --include=. --prod
```

</details>

It took me a little bit more time to get things working right.
I found a little bug in the tangled UI regarding spindle runs.

When pushing to the *official* knot, the workflow got picked up fine by the official spindle, and showed up in the UI.
When I pushed to *my* knot however, the official spindle ran the workflow, but it didn't show in the UI.
It took me a while to realise what was going on.

I thought the spindle wasn't picking up the workflow, but the bug was simply with showing the info in the UI.
[Anirudh](https://tangled.sh/@icyphox.sh) was very quick to find the cause and implement a fix.

And just like that, this blog gets deployed automatically on push, using the tangled spindle!
