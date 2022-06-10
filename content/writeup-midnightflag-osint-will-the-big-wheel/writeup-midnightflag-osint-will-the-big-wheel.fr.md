---
title: MidnightFlag CTF Write-Up Will the big wheel
description: Write-up du challenge web Will the big wheel au MidnightFlag CTF 2022
image: /blog/infektionctf.png
publishedAt: 2022-04-24
authors:
  - name: Finxol
    avatarUrl: https://avatars.githubusercontent.com/u/71637999?v=4
    link: https://github.com/finxol
tags:
  - writeup
  - MidnightFlagCTF
  - OSINT

---

## MidnightFlag CTF

Le [MidnightFlag CTF](https://midnightflag.fr/) est un CTF organisé par des étudiants de l'[ESNA](https://www.esna.bzh/)

### Description

Nos services de renseignements viennent de recevoir un message d'un de nos agents en URSS et selon les premiers éléments,
nous devons rapidement le retrouver pour l'exfiltrer.
Votre mission est de décoder son message et de nous renvoyer le lieu d'extraction.

Format : MCTF{hashMD5}
Auteur: **A0d3n**

![Will the Big Wheel](/blog/writeup-midnightflag-osint-will-the-big-wheel/MessageRecover.png)

## Solution

Tout d'abord, vérifions les métadonnées de l'image qui nous a été donnée.
Avec un simple `exiftool MessageRecover.png`, nous obtenons les informations suivantes *(certaines informations ont été retirées pour plus de clarté)* :

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

Une ligne qui attire notre attention est le " User Comment ".
Cela semble être du texte codé en base64.
Essayons de le décoder avec `echo -n "WzUxLjQwMzA5LCAzMC4wNDQwMXw1MS40MDc4OSwgMzAuMDU1NjR8NTEuNDAwODksIDMwLjA2NDA4XSwgSSB3SUxsIHdBSXQgWW9VIGFUIHRIZSBjRW50RVIu" | base64 --decode`

```
[51.40309, 30.04401|51.40789, 30.05564|51.40089, 30.06408], I wILl wAIt YoU aT tHe cEntER.
```

Cela ressemble à des coordonnées.
La première semble être dans le nord de l'Ukraine, et les autres sont proches.

![First GPS Coordinate](/blog/writeup-midnightflag-osint-will-the-big-wheel/first_gps_point.png)

Le message décodé dit également "Je vous attendrai au centre".
Nous pouvons déduire de cette phrase que l'agent attendra au centre de ces trois coordonnées.

En effectuant une recherche rapide sur le calcul de la moyenne de coordonnés GPS, nous trouvons un script javascript [sur Github Gist] (https://gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb).
Nous pouvons alors adapter un exemple avec nos coordonnées, et nous obtenons un résultat !

![Calculating the average coordinate](/blog/writeup-midnightflag-osint-will-the-big-wheel/average_coord.png)

En plaçant ces coordonnées sur une carte, nous arrivons [près du parc d'attractions] (https://www.google.com/maps/place/Pripyat+amusement+park/@51.4053954,30.0488085,2337m/data=!3m1!1e3!4m13!1m7!3m6!1s0x0:0x8b035e1594d47a36!2zNTHCsDI0JzE0LjMiTiAzMMKwMDMnMTYuNSJF!3 b1!8m2!3d51.403957!4d30.0545768!3m4!1s0x472a7c5de9f5c0fb:0x87aa178315dd0d18!8m2!3d51.4078925!4d30.055647)
où se trouve la roue présente sur la photo.

Nous regardons ensuite le point d'intérêt le plus proche, et nous trouvons **Чорнобиль**, ce qui signifie Tchernobyl.

![Average coordinate on a map](/blog/writeup-midnightflag-osint-will-the-big-wheel/flag.png)

On formate ensuite le mot avec `echo -n "Чорнобиль" | md5sum` et obtenons le drapeau `MCTF{3687016d7a89edc046069933f208e8c8}`.
