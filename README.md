# Souffre-Douleur

Un life-sim textuel façon BitLife, mais inversé : tu nommes un personnage et
tu observes sa vie partir en vrille. Le personnage est toujours fictif (voir
note plus bas).

Web (React + Vite) comme base unique, encapsulée avec [Capacitor](https://capacitorjs.com/)
pour produire les apps Android et iOS.

## Développer

```bash
npm install
npm run dev
```

## Tester sur ton iPhone au fur et à mesure

Ce projet tourne dans un environnement de dev cloud, donc un serveur `npm run dev`
local ici n'est pas joignable depuis ton iPhone. À la place : à chaque push sur une
branche `claude/**` ou sur `main`, un déploiement automatique publie la version web
sur GitHub Pages (voir `.github/workflows/deploy-web.yml`).

**Étape unique à faire une fois** : dans les paramètres du repo GitHub
(`Settings > Pages`), mets la source sur "GitHub Actions".

Ensuite l'URL sera stable, du type :

```
https://<owner>.github.io/bitlife-like/
```

Ouvre-la dans Safari sur ton iPhone — elle se met à jour à chaque nouveau push.

## Builder pour Android

Le projet natif Android est déjà généré dans `android/` (via `npx cap add android`).

```bash
npm run build
npx cap sync android
npx cap open android   # ouvre Android Studio
```

Nécessite Android Studio installé en local. Publication sur le Play Store :
compte développeur Google Play (25$ à vie).

## Builder pour iOS

Le projet natif iOS est déjà généré dans `ios/` (via `npx cap add ios`).

**Contrainte incontournable : il faut Xcode, donc macOS**, pour compiler et
signer le binaire iOS. Deux options :

- Un Mac en local (`npx cap open ios` puis build/archive dans Xcode).
- Un service de build cloud (ex. [Codemagic](https://codemagic.io/), plan
  gratuit disponible) qui compile et signe sans que tu aies de Mac.

Publication sur l'App Store : compte Apple Developer Program (99$/an, obligatoire
quel que soit l'outil utilisé).

## Structure

- `src/App.tsx` — boucle de jeu (écran de création du personnage + avancée dans le temps)
- `src/data/events.ts` — pool d'événements malchanceux (contenu de démo à étoffer)
- `capacitor.config.ts` — config Capacitor (id d'app, dossier web)
- `android/`, `ios/` — projets natifs générés par Capacitor
- `.github/workflows/deploy-web.yml` — déploiement auto de la version web sur GitHub Pages

## Note sur le contenu

Le personnage est toujours fictif : le joueur choisit un nom librement (comme
dans n'importe quel life-sim), mais l'app ne doit jamais être cadrée ni
fonctionner comme un outil de ciblage d'une personne réelle (pas de partage
"tague quelqu'un", ton toujours absurde/comique plutôt que réaliste). C'est
une condition nécessaire pour rester conforme aux règles anti-harcèlement des
stores Apple et Google.
