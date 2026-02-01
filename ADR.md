# Architecture Decision Records

## 01 Février 2026

### Authentification

L'authentificaion repose sur deux jeton jwt :
l'access token et le refresh token.

L'access token est utilisé pour authentifier les requêtes.
Le refresh token est utilisé pour renouveler l'access token.

Le refresh token est stocké dans un cookie httpOnly. sécurisé pour un domaine spécifique.

voici le flux d'échanges :

navigateur -> login -> access token + refresh token stocké dans le navigateur.

navigateur -> un endpoint avec acces token -> backend -> vérification de l'access token :
si expiré : renouvellement de l'access token et du cookie contenant le refresh token.
si valide : pas de renouvellement accès directe à la ressource.

## 31 Janvier 2026

### Flux d'échanges

Pour faciliter le développement le flux d'échange entre l'application rendu côté navigateur et le backend nestjs sera réalisé en directe via API avec échange de jeton JWT.

La couche backend nuxjs sera réservé à la communication avec les services tiers (OpenWeatherMap, Google Maps, etc.) et à la mise en cache des données ainsi que le rendu SSR et SEO.

Une décision est a prendre sur la manière de gérer l'authentification via token JWT.

## 28 Janvier 2026

### Choix de l'architecture

Le projet est découpé en deux couches principales :

- **Frontend** : Application web développée avec NuxtJS et Vuetify.
- **Backend** : API REST développée avec NestJS, TypeORM et PostgreSQL.

Le développement repose sur l'utilisation de Docker et Docker Compose pour la mise en place de l'environnement de développement.
