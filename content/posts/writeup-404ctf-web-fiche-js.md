---
title: 404CTF Write-Up Fiché JS
description: Write-up for the web challenge "Fiché JS" @ 404CTF 2022
image: /blog/404ctf.png
date: 2022-06-04
authors:
  - name: finxol
tags:
  - writeup
  - 404ctf
  - web
published: true
---

## 404CTF

The [404CTF](https://404ctf.fr) is a CTF organized by the Direction Générale de la Sécurité Extérieure (DGSE), Télécom SudParis and
its association Hackademint.
This 2022 edition marked the double anniversary of "the 80th anniversary of the BCRA, the secret service of the Free France and
the 40th anniversary of its heir, the DGSE".

### Description

*This is a translation of the original description in French.*

After several months of digging into Hallebarde's past, we found an old file hosting platform that they used up until 2010.
That's 12 years ago now!
Security practices have changed radically since then and what seemed unbreakable then may not be so at all anymore.

Your move: find a way to bypass the existing protection system and recover the files still hosted on this site!

Author : **Artamis**

## Solution

At first, we only find a page containing a number pad.

![Landing page](/posts/writeup-404ctf-web-fiche-js/page-web.png)

From there, we can open our browser's developer console in order to find what is hidden behind this numpad.

In the "Debugger" tab, we immediately notice a javascript file named `index.js`.
After a quick read, we realise that this is the part that controls the number pad.

There are several places that can be used to validate an entry code.
Around line 129, there is an alternative that reacts to a key press on the keyboard.

```js
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

The `keyCode` 13 corresponds to the enter key.
We can therefore set a breakpoint here by clicking on line number 129 to examine the behaviour of the `confirmPin()` function.
Once the breakpoint is set, we can simulate a validation by pressing the enter key.

The execution then halts correctly just before the `confirmPin()` function is called.
We can then do F11, or *Step Into*, which brings us to what looks like a small file.

```js
/* FONCTIONNEMENT */
var key = $(".keypad").keypad(function (pin) {
  if (pin == "240801300505131273100172") {
    document.location.href = "./nob03y_w1lL_Ev3r_fiNd_th15_PaGe.html";
  }
});
```

The code check is just a simple comparison, but it is not the code that we are interested in here.
Indeed, if the code is correct, we are redirected to a supposedly hidden page.

It is indeed on this mystery page that we find the flag, as well as the list of all the agents of Hallebarde.

![Flag](/posts/writeup-404ctf-web-fiche-js/flag.png)
