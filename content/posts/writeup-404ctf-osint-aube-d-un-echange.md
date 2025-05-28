---
title: 404CTF Write-Up À l'aube d'un échange
description: Write-up for the OSINT challenge "À l'aube d'un échange" @ 404CTF 2022
image: /blog/404ctf.png
date: 2022-06-08
authors:
  - name: finxol
tags:
  - writeup
  - 404ctf
  - OSINT
published: true
---

## 404CTF

The [404CTF](https://404ctf.fr) is a CTF organized by the Direction Générale de la Sécurité Extérieure (DGSE), Télécom SudParis and
its association Hackademint.
This 2022 edition marked the double anniversary of "the 80th anniversary of the BCRA, the secret service of the Free France and
the 40th anniversary of its heir, the DGSE".

### Description

*This is a translation of the original description in French.*

New recruit! We need you around here.
One of our agents has just intercepted a short telephone conversation between two Hallebarde agents.
An important exchange of confidential documents is to take place and to indicate the location of the meeting,
one of the enemy agents has sent the following picture to his colleague with the following message:

<blockquote
    style="border-left: 4px solid #e0e0e0; padding: 0 0 0 1rem;border-radius: 0.1rem; margin: 1rem 2rem;line-height: 1.5rem"
>
  What a beautiful sunrise, isn't it? I'll be waiting in the street between the building in the foreground and those in the background.
  See you tonight, 10pm.
</blockquote>

We have less than a day to find out the name of the street and prevent the exchange!

Flag format: 404CTF{md5 of the full street name}.<br>
The street name must be in lower case, include the type of street (e.g. avenue, street, boulevard...),
without accents, without abbreviations, and all spaces must be replaced by dashes.
For example: if the street is Avenue de Saint-Mandé in Paris, the correct flag is `404CTF{129af9edde5659143536427f9a5f659a}`.

Author : **Artamis**

![Place to find](/posts/writeup-404ctf-osint-aube-d-un-echange/Lieu.jpg)


## Solution

Before starting this OSINT investigation, lets analyse the image provided.

We can immediately check that there is no useful exif data.
According to the instructions, it is a rising sun, so we can assume that the picture was taken facing east.
Three prominent buildings can also be clearly seen in the background.

Before going further, we will assume that this is a French city and look for a list of the tallest buildings in France.

We then come across the Wikipedia page on [France's tallest skyscrapers](https://fr.wikipedia.org/wiki/Liste_des_plus_hauts_gratte-ciel_de_France).
Looking at the images associated with the towers, we notice that the third one looks remarkably similar to the one in our photo.

![Liste des plus hauts gratte-ciel de France](/posts/writeup-404ctf-osint-aube-d-un-echange/wiki_liste_gratte_ciel.png)

By simply reading the Wikipedia description of the Tour Incity, we find a link to the Part-Dieu district page.
Fortunately for us, the viewpoint of the description image is very similar to the one of our photo.
The description also states that this photo was taken "from Fourvière".

![Page Wikipédia de la Part-Dieu](/posts/writeup-404ctf-osint-aube-d-un-echange/wiki_part_dieu.png)

We can now start to search with [Google Earth](https://earth.google.com/web/@45.7589869,4.82472116,199.71703945a,1402.6169008d,35y,9.91010942h,69.22260348t,0r) for places around Fourvière or further west,
probably higher than the rest of the city.
We can then see that the Fourvière district is located on a hill.

![Quartier de Fourvière Google Earth](/posts/writeup-404ctf-osint-aube-d-un-echange/google_earth_fourviere.png)

Exploring the surroundings, we soon find a building on the East side of the hill which looks like the one in the background of our photo.

![Bâtiment Montée Saint Barthélémy](/posts/writeup-404ctf-osint-aube-d-un-echange/google_earth_montee_st_barth.png)

The street below this building is called the *Montée Saint Barthélémy*.
We can then format and hash this street name with `echo -n "montee-saint-barthelemy" | md5sum`,
which gives us the flag `404CTF{eb66c65861da9fe667f26667b3427d2c}`.
