# 🤿 Underwwwater

**Underwwwater** est une application complète de carnet de plongée et de statistiques, conçue pour permettre aux plongeurs d'enregistrer leurs expériences et de suivre leur progression.

Ce dépôt est un **monorepo** contenant l'ensemble du code source du projet (backend, frontend, et documentation).

## 📂 Structure du Monorepo

Le projet est organisé commme suit :

- **[`backend`](./backend)** : API RESTful construite avec **NestJS**, **TypeORM** et **PostgreSQL**. Gère la logique métier, l'authentification et les données.
- **[`frontend_v2`](./frontend_v2)** : Nouvelle interface utilisateur moderne développée avec **Nuxt 3**. C'est la version active du frontend.
- **[`frontend`](./frontend)** : Ancienne version de l'interface (Legacy), conservée pour référence.
- **[`docs`](./docs)** : Documentation du projet, incluant la roadmap, les ADR (Architecture Decision Records) et autres notes techniques.

## 🚀 Infrastructure & Prérequis

Le projet utilise **Docker** et **Docker Compose** pour orchestrer les services backend (Base de données, serveur de mails).

### Prérequis globaux

- **Node.js** (v18+)
- **Docker** & **Docker Compose**
- **npm** ou **yarn**

## 🏁 Démarrage Rapide

Pour lancer l'environnement de développement complet :

### 1. Backend (API & Base de données)

```bash
cd backend

# Installer les dépendances
npm install

# Configurer l'environnement (si premier lancement)
cp .env.example .env

# Démarrer les services (PostgreSQL, Maildev)
docker-compose up -d

# Lancer le serveur de développement
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`.

### 2. Frontend (Nuxt 3)

```bash
cd frontend_v2

# Installer les dépendances
yarn install

# Lancer le serveur de développement
yarn dev
```

Le frontend sera accessible sur `http://localhost:3000` (Note : Nuxt peut utiliser un autre port si le 3000 est occupé par le backend, vérifiez la console).

## 📚 Documentation & Outils

- **API Swagger** : [http://localhost:3000/api](http://localhost:3000/api) (Documentation interactive de l'API)
- **Maildev** : [http://localhost:1080](http://localhost:1080) (Outil de test pour les emails en développement)
- **Documentation Projet** : Consultez le dossier [`docs`](./docs) pour plus de détails sur l'architecture et les décisions techniques.

---

_Bonnes plongées !_ 🌊
