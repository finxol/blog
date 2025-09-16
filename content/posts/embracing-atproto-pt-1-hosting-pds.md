---
title: "Embracing ATProto, part 1: Setting up a PDS"
description: In this series of posts, I'll explore my journey into setting up my workflows and services for atproto. The first step is setting up my PDS. Let's start with a bit of explanation for all this lingo.
date: 2025-09-03
updated: 2025-09-17
authors:
  - name: finxol
tags:
  - atproto
  - self-hosting
published: true
---

The [Atmosphere Protocol](https://atproto.com/), or atproto for short, is the protocol behind the Bluesky social network.
It's "an open, decentralized network for building social applications."

_If you are familiar with ATProto already, [skip ahead](#setting-up-a-pds)._

In atproto's decentralisation model, there are multiple parts that work together and can be hosted separately.
This differs from other solutions like [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub), which services like Mastodon implement.
Dan Abramov, who previously worked at Bluesky, made a [good write-up explaining the difference](https://news.ycombinator.com/item?id=45077986).

Let's go over some rough definitions for the important bits. You'll find better explanations in the [atproto docs](https://atproto.com/guides/glossary).

#### PDS

In atproto, a Personal Data Server (PDS) is a server that hosts a user.
That's the place where the user's information lives, and only handles this.
It's essentially a user database, but it's decentralised, so it feeds its data to Relays.

#### Relay

A relay is the part of the stack that ingests all the information sent from the PDSes, and exposes it for use in AppViews.

It's an optimisation in the network to avoid many-to-many connections between PDSes and AppViews.

#### AppView

The AppView is basically the app you use to interact with the atproto service.
[Bluesky](https://bsky.social/about) is an AppView, so are [tangled.sh](https://tangled.sh/) and [Smoke Signals](https://smokesignal.events/).

They receive all the information from the Relays, and filter out only what they need in order to display it into a usable application.

<img src="/posts/embracing-atproto-pt1/atproto.svg" width="100%" class="schema">

This means that you can also host and control only part of that stack if you want.
The smallest—and most common—part to self-host is the PDS, enabling you to own your data, while still using Bluesky and the same atproto apps.

That's exactly what I did.

## Setting up a PDS

To set up a PDS, you'll need:

- A server connected to the internet running Debian or Ubuntu (a VPS, a Raspberry Pi, a laptop that's always on, whatever)
- A domain name
- Docker

I chose to get a new [UpCloud](https://upcloud.com/) VPS, and use a `pds.finxol.io` subdomain of my usual domain.
I could've used one of the other VPSes I have, but I've been meaning to migrate off of Digital Ocean for some time, mainly because it's a bit too expensive for me, but also because I prefer to use European services whenever possible.

The setup process is super easy and very well explained [in their docs](https://github.com/bluesky-social/pds/blob/main/README.md#self-hosting-pds).
The script sets everything up for you, it even installs docker if it's not there already.

### Adapting to my setup

I did have to make a couple tweaks to it to make it play well with the rest of my setup though.

First, the script checks the OS version you're running.
My VPS is running the latest Debian 13 Trixie, released less than a month ago.
Since it's not one of the required Debian 11 or 12, the script won't let me continue the install.
I just added a clause in the script to accept Debian Trixie.

I also made some changes to the compose file.
I didn't want [watchtower](https://github.com/containrrr/watchtower) to update all my containers constantly, and I was running caddy externally for all my other stuff,
so I just removed those lines in the compose file and moved the Caddy directives to my root Caddyfile.

Here is the final compose file I ended up with:

```yaml
services:
  pds:
    container_name: pds
    image: ghcr.io/bluesky-social/pds:0.4
    restart: unless-stopped
    ports:
      - "6010:3000"
    volumes:
      - type: bind
        source: /pds
        target: /pds
    env_file:
      - /pds/pds.env
```

Once the script finished and everything was running, I simply pinged the pds with `curl https://pds.finxol.io/xrpc/_health`,
tested the websocket connection as stated in the docs, only with [`websocat`](https://github.com/vi/websocat),
and saw everything working as expected!

*Edit:*
Also, make sure the ***time*** is right on your server.
An incorrect system time will lead to incorrect timestamps in OAuth tokens, getting them rejected by some clients.
My server time was off by a few dozen seconds, enough to prevent me from logging into Tangled...

## Account Migration

And now we get to the trickier part.
If you mess up your account migration, you might lose your existing data (which I'd prefer not to).

I chose to go the easy way and follow [Tophhie's blog post](https://blog.tophhie.cloud/host-your-own-bluesky-pds-a-complete-azure-powered-guide/#%F0%9F%8F%83%E2%80%8D%E2%99%80%EF%B8%8F%E2%80%8D%E2%9E%A1%EF%B8%8F-4-migration-from-blueskys-pds).
This makes use of Bluesky's very convenient [goat](https://github.com/bluesky-social/goat) atproto CLI tool,
automating most of the migration process, with only 5 commands to run.

Following these steps, I gathered the required info, ran the migration command, and boom, I now own my atproto identity!

## Backups

Since a PDS is basically your entire identity on atproto, it's rather important not to lose it.
One way to ensure this is with backups!

I chose a very simple path again: use [restic](https://restic.net/) to throw the data into an S3 bucket periodically with crontab.

Restic is a simple CLI backup tool with some cool features:
it works with "repositories", so you get encrypted versioned backups on a multitude of supported storage types.

I once again went with UpCloud's S3 offering.
It's dead simple, with a 250GB allowance for 5€/month.
I know I won't be filling that up with backups any time soon, but I've got some other buckets in there taking up space.

First off, I set up the backup repository with `restic init` and gave it a password.
Then wrote the backup script and told `crontab` to run it every day.

Here's my super complex backup script:

```bash
#!/bin/bash

export AWS_ACCESS_KEY_ID=***
export AWS_SECRET_ACCESS_KEY=***
export RESTIC_PASSWORD=***

restic -r s3:https://top-secret.upcloudobjects.com/akhaten-bckp/pds backup /pds --skip-if-unchanged
```

I know storing the keys as raw values in there isn't very safe, but I've restricted the S3 access key as much as I can.
I'll set up a secrets manager at some point in the future.

Now my atproto identity can be restored in case of problems with the VPS!

I might also back it up to something else, maybe Hetzner Object Storage, Proton Drive ([through rclone](https://rclone.org/protondrive/)), Scaleway Storage, or some other server over SFTP.

## Bonus

As an added bonus, since your PDS stores and serves your identity on the atproto network, you can also have it [lie about your age verification status](https://bsky.app/profile/mary.my.id/post/3ltwlpjciecsq),
and bypass the age check requirements recently put in place [in the UK](https://en.wikipedia.org/wiki/Online_Safety_Act_2023#Age_verification) and other places.
This only requires a few extra lines in the Caddyfile:

```Caddyfile
*.pds.finxol.io, pds.finxol.io {
    tls {
        on_demand
    }

    @age_assurance path /xrpc/app.bsky.unspecced.getAgeAssuranceState
    handle @age_assurance {
        header Content-Type application/json
        respond `{"lastInitiatedAt":"2025-08-02T15:22:45.829Z","status":"assured"}` 200
    }

    handle {
        reverse_proxy localhost:6010
    }
}
```
