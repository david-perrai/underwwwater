# Backend NestJS - Projet Plongée

## Description

Application backend NestJS avec TypeORM et PostgreSQL, incluant un système de migrations de base de données.

## Prérequis

- Node.js (v20 ou supérieur)
- Docker et Docker Compose
- npm

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Copier le fichier d'environnement :
```bash
cp .env.example .env
```

3. Démarrer la base de données PostgreSQL avec Docker :
```bash
docker-compose up -d
```

## Configuration

Les variables d'environnement sont définies dans le fichier `.env` :

- `DB_HOST` : Hôte de la base de données (localhost par défaut)
- `DB_PORT` : Port de la base de données (5432 par défaut)
- `DB_USERNAME` : Nom d'utilisateur PostgreSQL
- `DB_PASSWORD` : Mot de passe PostgreSQL
- `DB_NAME` : Nom de la base de données
- `PORT` : Port de l'application (3000 par défaut)

## Gestion des Migrations

### Créer une nouvelle migration vide

```bash
npm run migration:create src/migrations/NomDeLaMigration
```

### Générer une migration à partir des changements d'entités

```bash
npm run migration:generate src/migrations/NomDeLaMigration
```

### Exécuter les migrations

```bash
npm run migration:run
```

### Annuler la dernière migration

```bash
npm run migration:revert
```

## Démarrage de l'application

### Mode développement

```bash
npm run start:dev
```

### Mode production

```bash
npm run build
npm run start:prod
```

## Docker

### Démarrer uniquement la base de données

```bash
docker-compose up -d
```

### Arrêter la base de données

```bash
docker-compose down
```

### Arrêter et supprimer les volumes

```bash
docker-compose down -v
```

## Structure du projet

```
backend/
├── src/
│   ├── migrations/          # Migrations de base de données
│   ├── app.controller.ts    # Contrôleur principal
│   ├── app.module.ts        # Module principal avec configuration TypeORM
│   ├── app.service.ts       # Service principal
│   ├── data-source.ts       # Configuration TypeORM pour les migrations
│   ├── main.ts              # Point d'entrée de l'application
│   └── user.entity.ts       # Exemple d'entité User
├── test/                    # Tests
├── .env                     # Variables d'environnement
├── .env.example             # Exemple de variables d'environnement
├── docker-compose.yml       # Configuration Docker pour PostgreSQL
├── Dockerfile               # Dockerfile pour l'application
└── package.json             # Dépendances et scripts
```

## Exemple d'utilisation

### 1. Créer une nouvelle entité

Créez un fichier `src/votre-entite.entity.ts` :

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nom_table')
export class VotreEntite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;
}
```

### 2. Générer la migration

```bash
npm run migration:generate src/migrations/CreateVotreEntite
```

### 3. Exécuter la migration

```bash
npm run migration:run
```

## Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture de code
npm run test:cov
```

## Commandes utiles

```bash
# Formater le code
npm run format

# Linter
npm run lint

# Build
npm run build
```

## Notes importantes

- `synchronize` est désactivé dans la configuration TypeORM pour forcer l'utilisation des migrations
- Les migrations doivent être exécutées manuellement avec `npm run migration:run`
- Toujours créer une migration avant de modifier le schéma de base de données en production
