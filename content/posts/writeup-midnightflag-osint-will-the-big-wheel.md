---
title: MidnightFlag CTF Write-Up Will the big wheel
description: Write-up for the OSINT challenge "Will the big wheel" @ 404CTF 2022
image: /blog/infektionctf.png
date: 2022-04-24
authors:
  - name: finxol
tags:
  - writeup
  - MidnightFlagCTF
published: true
---

## 404CTF

The [MidnightFlag CTF](https://midnightflag.fr/) is a CTF organised by students from [ESNA](https://www.esna.bzh/)

### Description

Our intelligence services have just received a message from one of our agents in the USSR and according to the first elements,
we must quickly find him to exfiltrate him.
Your mission is to decode his message and return the extraction location to us.

![Message Recover](/posts/writeup-midnightflag-osint-will-the-big-wheel/MessageRecover.png)

Author: **A0d3n**

## Solution

First of all, let's check the metadata from the image we were given.
With a simple `exiftool MessageRecover.png`, we get the following information *(some information was removed for clarity)* :

```
ExifTool Version Number         : 12.38
File Name                       : MessageRecover.png
Directory                       : .
File Size                       : 23 KiB
MIME Type                       : image/png
Image Width                     : 532
Image Height                    : 284
Bit Depth                       : 8
Color Type                      : RGB with Alpha
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
Copyright                       : MidnightFlag
Exif Version                    : 0232
Components Configuration        : Y, Cb, Cr, -
User Comment                    : WzUxLjQwMzA5LCAzMC4wNDQwMXw1MS40MDc4OSwgMzAuMDU1NjR8NTEuNDAwODksIDMwLjA2NDA4XSwgSSB3SUxsIHdBSXQgWW9VIGFUIHRIZSBjRW50RVIu
Flashpix Version                : 0100
Owner Name                      : A0d3n
Image Size                      : 532x284
```

One line that catches our eye is the "User Comment".
This looks like it could be some base64-encoded text.
Let's try to decode it with
```sh
echo -n "WzUxLjQwMzA5LCAzMC4wNDQwMXw1MS40MDc4OSwgMzAuMDU1NjR8NTEuNDAwODksIDMwLjA2NDA4XSwgSSB3SUxsIHdBSXQgWW9VIGFUIHRIZSBjRW50RVIu" | base64 --decode
```

And we get

```
[51.40309, 30.04401|51.40789, 30.05564|51.40089, 30.06408], I wILl wAIt YoU aT tHe cEntER.
```

These look like coordinates.
The first one seems to be in the north of Ukraine, and the other ones are close by.

![First GPS Coordinate](/posts/writeup-midnightflag-osint-will-the-big-wheel/first_gps_point.png)

The decoded message also says "I will wait you at the center".
We can assume from this sentence that the agent will be waiting at center of these three coordinates.

With a quick search about averaging GPS coordinates, we land a javascript programme [on Github Gist](https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb).
We can then tweak an example case to match our coordinates, and we get a result!

![Calculating the average coordinate](/posts/writeup-midnightflag-osint-will-the-big-wheel/average_coord.png)

By plotting these coordinates on a map, we land [near the amusement park](https://www.google.com/maps/place/Pripyat+amusement+park/@51.4053954,30.0488085,2337m/data=!3m1!1e3!4m13!1m7!3m6!1s0x0:0x8b035e1594d47a36!2zNTHCsDI0JzE0LjMiTiAzMMKwMDMnMTYuNSJF!3b1!8m2!3d51.403957!4d30.0545768!3m4!1s0x472a7c5de9f5c0fb:0x87aa178315dd0d18!8m2!3d51.4078925!4d30.055647)
where the wheel in the picture can be found.

We then look at the nearest point of interest, and we find **Чорнобиль**, which means Tchernobyl.

![Average coordinate on a map](/posts/writeup-midnightflag-osint-will-the-big-wheel/flag.png)

We then format the word with `echo -n "Чорнобиль" | md5sum` and get the flag `MCTF{3687016d7a89edc046069933f208e8c8}`.
