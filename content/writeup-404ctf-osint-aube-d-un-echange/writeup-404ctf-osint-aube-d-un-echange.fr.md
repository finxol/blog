---
title: 404CTF Write-Up À l'aube d'un échange
description: Write-up for the 404CTF À l'aube d'un échange OSINT challenge
image: /blog/404ctf.png
publishedAt: 2022-06-08
authors:
  - name: Finxol
    avatarUrl: https://avatars.githubusercontent.com/u/71637999?v=4
    link: https://github.com/finxol
tags:
  - writeup
  - 404ctf
  - osint

---

## 404CTF

Le [404CTF](https://404ctf.fr) est un CTF organisé par la Direction Générale de la Sécurité Extérieure (DGSE), Télécom SudParis et
son association Hackademint.
Cette édition 2022 marquait le double anniversaire "des 80 ans du BCRA, le service secret de la France libre et 
les 40 ans de son héritier, la DGSE".

### Description

Nouvelle recrue ! Nous avons besoin de toi par ici.
Un de nos agents vient d'intercepter une courte conversation téléphonique entre deux agents de Hallebarde.
Un important échange de documents confidentiels doit avoir lieu et pour indiquer l'endroit du rendez-vous,
l'un des agents ennemis a envoyé la photo ci-dessous à son collègue tout en précisant ceci :

<blockquote
    style="border-left: 4px solid #e0e0e0; padding: 0 0 0 1rem;border-radius: 0.1rem; margin: 1rem 2rem;line-height: 1.5rem"
>
  Quel beau lever de soleil n'est-ce pas ? J'attendrai dans la rue qui sépare le bâtiment au premier plan de ceux au second plan.
  Rendez-vous ce soir, 22h00.
</blockquote>

Nous avons moins d'une journée pour découvrir le nom de ladite rue et empêcher l'échange !

Format du flag : 404CTF{md5 du nom complet de la rue}<br>
Le nom de la rue doit être en minuscule, inclure le type de rue ( ex : avenue, rue, boulevard... ),
sans accents, sans abréviation, et tous les espaces doivent être remplacés par des tirets.
Par exemple : si la rue est l'Avenue de Saint-Mandé à Paris, le flag correct est `404CTF{129af9edde5659143536427f9a5f659a}`.

Auteur : **Artamis**

<a href="/blog/writeup-404ctf-osint-aube-d-un-echange/Lieu.jpg" target="_blank" rel="noopener noreferrer">
    <img src="/blog/writeup-404ctf-osint-aube-d-un-echange/Lieu.jpg" width="50%" alt="Image envoyée par Hallebarde">
</a>


## Solution

Avant de commencer cette investigation OSINT, analysons l'image fournie.

Nous pouvons tout de suite vérifier l'absence de données exif utiles.
D'après la consigne, il s'agit d'un soleil levant, on peut donc en déduire que la photo a été prise en direction de l'Est.
On peut également discerner clairement à l'arrière-plan trois bâtiments importants.

Pour aller plus loin, nous allons partir du principe qu'il s'agit d'une ville française et
chercher une liste des plus hauts bâtiments de France.

On tombe alors sur la page Wikipédia des [plus hauts gratte-ciel de France](https://fr.wikipedia.org/wiki/Liste_des_plus_hauts_gratte-ciel_de_France).
En regardant les images des associées aux tours, on remarque que la troisième ressemble étrangement à celle de notre photo.

![Liste des plus hauts gratte-ciel de France](/blog/writeup-404ctf-osint-aube-d-un-echange/wiki_liste_gratte_ciel.png)

En lisant simplement la description Wikipédia de la Tour Incity, on trouve un lien vers la page du quartier de la Part-Dieu.
Heureusement pour nous, le point de vue de l'image de description ressemble beaucoup à celui de notre photo.
La description indique également que cette photo a été prise "depuis Fourvière".

![Page Wikipédia de la Part-Dieu](/blog/writeup-404ctf-osint-aube-d-un-echange/wiki_part_dieu.png)

On peut maintenant commencer à chercher à l'aide de [Google Earth](https://earth.google.com/web/@45.7589869,4.82472116,199.71703945a,1402.6169008d,35y,9.91010942h,69.22260348t,0r) des lieux aux alentours de Fourvière ou plus à l'Ouest,
probablement en hauteur par rapport au reste de la ville.
On s'aperçoit alors que le quartier de Fourvière se situe sur une butte.

![Quartier de Fourvière Google Earth](/blog/writeup-404ctf-osint-aube-d-un-echange/google_earth_fourviere.png)

En explorant les alentours, on trouve sans trop tarder un bâtiment sur le flanc Est de la butte qui ressemble à celui au second plan de notre photo.

![Bâtiment Montée Saint Barthélémy](/blog/writeup-404ctf-osint-aube-d-un-echange/google_earth_montee_st_barth.png)

La rue se trouvant au pied de ce bâtiment s'appelle la *Montée Saint Barthélémy*.
On peut donc mettre en forme et hasher ce nom de rue avec `echo -n "montee-saint-barthelemy" | md5sum`,
ce qui nous donne le flag `404CTF{eb66c65861da9fe667f26667b3427d2c}`.
