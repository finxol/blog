---
title: 404CTF Write-Up Fiché JS
description: Write-up du challenge web Fiché JS du 404CTF 2022
image: /blog/404ctf.png
publishedAt: 2022-06-04
authors:
  - name: Finxol
    avatarUrl: https://avatars.githubusercontent.com/u/71637999?v=4
    link: https://github.com/finxol
tags:
  - writeup
  - 404ctf
  - web

---

## 404CTF

Le [404CTF](https://404ctf.fr) est un CTF organisé par la Direction Générale de la Sécurité Extérieure (DGSE), Télécom SudParis et
son association Hackademint.
Cette édition 2022 marquait le double anniversaire "des 80 ans du BCRA, le service secret de la France libre et
les 40 ans de son héritier, la DGSE".

### Description

Après plusieurs mois de recherches à fouiller dans le passé de Hallebarde, nous avons mis la main sur une vieille
plateforme d'hébergement de fichiers qu'ils utilisaient jusqu'en 2010. Cela remonte à 12 ans maintenant !
Les pratiques en termes de sécurité ont radicalement changé depuis et ce qui semblait alors incassable
ne l'est peut-être plus du tout maintenant.<br>
À vous de jouer : trouvez un moyen d'outrepasser le système de protection existant et
récupérez les fichiers encore hébergés sur ce site !

Auteur : **Artamis**

## Solution

Au départ, on se retrouve devant une page comportant un pavé numérique où l'on doit entrer le code d'accès.

![Landing page](/blog/writeup-404ctf-web-fiche-js/page-web.png)

À partir de là, nous pouvons ouvrir la console développeur de notre navigateur afin de voir ce qui se cache derrière ce pavé numérique.

Dans l'onglet "Débugger", on remarque tout de suite un fichier javascript nommé `index.js`.
Après une lecture rapide, on se rend compte qu'il s'agit de la partie qui contrôle le pavé numérique.

On trouve alors plusieurs endroits qui serviraient à valider un code entré.
Autour de la ligne 129, on trouve une alternative qui réagit à un appui de touche du clavier.

```javascript
switch (e.keyCode) {
    case 8:
        backspaceOnPin();
        break;
    case 13:
        confirmPin(STATE.enteredPin);
        break;
    default:
        break;
}
```

Le `keyCode` 13 correspond à la touche entrer.
On peut donc poser un breakpoint ici en cliquant sur le numéro de ligne 129 pour inspecter le comportement de la fonction `confirmPin()`.
Une fois le point posé, on peut simuler une validation en appuyant sur la touche entrer.

L'exécution s'interrompt alors correctement juste avant l'appel de la fonction `confirmPin()`.
On peut donc faire F11, ou *Step Into*, ce qui nous amène à ce qui ressemble à un petit fichier.

```javascript
/* FONCTIONNEMENT */
var key = $(".keypad").keypad(function (pin) {
  if (pin == "240801300505131273100172") {
    document.location.href = "./nob03y_w1lL_Ev3r_fiNd_th15_PaGe.html";
  }
});
```

La vérification du code est donc une simple comparaison, mais ce n'est pas le code qui nous intéresse ici.
En effet, si le code est correct, nous sommes redirigés vers une page supposée cachée.

C'est effectivement sur cette page mystère que nous trouvons le flag, ainsi que la liste de tous les agents de Hallebarde.

![Flag](/blog/writeup-404ctf-web-fiche-js/flag.png)
