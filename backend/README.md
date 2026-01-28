# MyDives Backend

API Backend pour l'application MyDives, construite avec NestJS, TypeORM et PostgreSQL.

## 🚀 Technologies

- **Framework**: [NestJS](https://nestjs.com/)
- **Base de données**: PostgreSQL
- **ORM**: TypeORM
- **Conteneurisation**: Docker & Docker Compose
- **Documentation**: Swagger (OpenAPI)

## 🛠️ Installation & Configuration

### Prérequis

- Node.js (v18+)
- Docker & Docker Compose
- npm

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

Copiez le fichier d'environnement d'exemple :

```bash
cp .env.example .env
```

Assurez-vous que les variables correspondent à votre configuration (les valeurs par défaut fonctionnent avec le Docker Compose fourni).

### 3. Démarrer la base de données

Lancez le conteneur PostgreSQL :

```bash
docker-compose up -d
```

## 🏃 Lancer l'application

### Développement

```bash
npm run start:dev
```

Le serveur démarrera sur `http://localhost:3000` et les migrations seront exécutées automatiquement.

### Production

```bash
npm run build
npm run start:prod
```

## 📚 Documentation API

Contrairement aux applications NestJS standards, ce projet utilise un Filtre d'Exception Global pour une gestion standardisée des erreurs et Swagger pour la documentation.

Accédez à la documentation interactive de l'API sur :
**[http://localhost:3000/api](http://localhost:3000/api)**

### Fonctionnalités

- **Filtre d'Exception Global** : Gère automatiquement les erreurs de base de données (comme les violations de contrainte d'unicité) et renvoie des réponses 409 Conflict conviviales.
- **Validation DTO** : Validation automatique des requêtes entrantes via `class-validator`.

## 🗄️ Migrations de Base de Données

Nous utilisons les migrations TypeORM pour gérer les modifications de schéma de base de données.

- **Générer une migration** (après avoir modifié des entités) :

  ```bash
  npm run migration:generate src/migrations/NomDuChangement
  ```

- **Créer une migration vide** :

  ```bash
  npm run migration:create src/migrations/NomDeLaMigration
  ```

- **Exécuter les migrations** :

  ```bash
  npm run migration:run
  ```

- **Annuler la dernière migration** :
  ```bash
  npm run migration:revert
  ```

## 🧪 Tests

```bash
# tests unitaires
npm run test

# tests e2e
npm run test:e2e

# couverture de test
npm run test:cov
```
