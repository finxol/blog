---
title: "Embracing ATProto, part 1: PDS Setup"
description: In this series of posts, I'll explore my journey into setting up my workflows and services for atproto. The first step is setting up my PDS. Let's start with a bit of explanation for all this lingo.
date: 2025-09-02
authors:
  - name: finxol
tags:
  - atproto
  - self-hosting
published: false
---

The [Atmosphere Protocol](https://atproto.com/), or atproto for short, is the protocol behind the Bluesky social network.
It's "an open, decentralized network for building social applications."

_If you are familiar with ATProto already, [skip ahead](#setting-up-a-pds)._

Atproto is decentralised in a different way to other solutions like [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub), which services like Mastodon implement.
When you host a Mastodon instance, you immediately control and manage the different parts: you control your data, your web interface and API.
You could use a Mastodon instance as a standalone Twitter replacement.
However, the ActivityPub principle is to make different instances communicate with each other, so everyone communicates with everyone directly

## Setting up a PDS

Content
