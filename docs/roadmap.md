# 🌊 Underwwwater - Spécifications Produit & Techniques

**Version :** 1.0.0  
**Dernière mise à jour :** Janvier 2026  
**Status :** Développement v1 (MVP)

---

## Executive Summary

Underwwwater est une plateforme SaaS destinée aux passionnés de plongée sous-marine, permettant la digitalisation et l'analyse des carnets de plongée. Le projet vise à remplacer les carnets papier traditionnels par une solution numérique complète intégrant analytics, partage social, et science citoyenne marine.

**Objectif principal :** Créer l'outil de référence pour le suivi et l'analyse des activités de plongée sous-marine à l'échelle mondiale.

**Positionnement marché :** Alternative moderne aux solutions existantes (Dive+, Subsurface) avec différenciation via gamification, données écologiques collaboratives, et intégration multi-plateformes.

---

## 📋 Table des Matières

1. [Problématique & Solution](#problématique--solution)
2. [Vision Produit](#vision-produit)
3. [Roadmap & Phases de Développement](#roadmap--phases-de-développement)
4. [Spécifications Fonctionnelles](#spécifications-fonctionnelles)
5. [Architecture Technique](#architecture-technique)
6. [Stack Technologique](#stack-technologique)
7. [Modèle Économique](#modèle-économique)
8. [Risques & Mitigations](#risques--mitigations)
9. [Métriques de Succès](#métriques-de-succès)

---

## 🎯 Problématique & Solution

### Problématique

Les plongeurs sous-marins utilisent traditionnellement des carnets papier pour consigner leurs plongées (divelog). Cette méthode présente plusieurs limitations majeures :

- **Fragilité** : Risque de perte, dégradation par l'eau/humidité
- **Absence d'analytics** : Impossible d'analyser ses progressions, préférences, statistiques
- **Difficulté de partage** : Contraignant pour prouver son expérience aux clubs de plongée
- **Pas d'historique centralisé** : Multiples carnets dispersés au fil des années
- **Données scientifiques perdues** : Observations d'espèces marines non exploitées

### Solution

Underwwwater propose une plateforme web complète pour :

✅ **Digitaliser** l'historique complet des plongées avec formulaires détaillés  
✅ **Analyser** via dashboards personnalisés (profondeurs, gaz utilisés, spots préférés)  
✅ **Partager** ses plongées avec la communauté et les clubs professionnels  
✅ **Contribuer** à la science citoyenne via recensement des espèces observées  
✅ **Gamifier** l'expérience avec système de collection d'espèces (cartes TCG)  
✅ **Automatiser** l'import depuis ordinateurs de plongée (fichiers .fit, .xml, etc.)

---

## 🚀 Vision Produit

### Mission

Devenir la plateforme de référence mondiale pour le suivi des activités de plongée sous-marine, en combinant utilité fonctionnelle et engagement communautaire.

### Valeurs Fondamentales

1. **Open Data Écologique** : Les données d'observation d'espèces restent publiques et gratuites
2. **Accessibilité** : Service de base gratuit, fonctionnalités premium raisonnables
3. **Communauté** : Favoriser le partage entre plongeurs et clubs
4. **Scientificité** : Données fiables et validées pour contribution recherche marine

### Différenciation Concurrentielle

| Feature | Underwwwater | Subsurface | Dive+ | DiveMate |
|---------|--------------|------------|-------|----------|
| Dashboards Analytics | ✅ Avancés | ⚠️ Basiques | ✅ Oui | ✅ Oui |
| Partage Social | ✅ Natif | ❌ Non | ⚠️ Limité | ✅ Oui |
| Données Écologiques | ✅ Heatmaps + API | ❌ Non | ❌ Non | ❌ Non |
| Gamification | ✅ Cartes TCG | ❌ Non | ⚠️ Badges | ❌ Non |
| Import Auto Ordinateurs | ✅ Multi-formats | ✅ Oui | ⚠️ Limité | ✅ Oui |
| B2B Clubs | ✅ Oui (v6) | ❌ Non | ❌ Non | ⚠️ Basique |

---

## 🗺️ Roadmap & Phases de Développement

### Phase 1 : MVP - Core Dive Logging (v1)
**Durée estimée :** 3 mois  
**Objectif :** Produit minimum viable utilisable quotidiennement

#### Fonctionnalités
- ✅ Landing page marketing (présentation, CTA signup/login)
- ✅ Système d'authentification complet (inscription, connexion, déconnexion)
- ✅ CRUD plongées via formulaire détaillé :
  - Date, heure, durée
  - Profondeur max/moyenne
  - Type de gaz (Air, Nitrox, Trimix)
  - Type de plongée (Mer, Lac, Rivière, Épave, Nuit, Dérive)
  - Conditions (Visibilité, Courant, Température eau/air)
  - Notes personnelles
- ✅ Dashboard utilisateur avec graphiques :
  - Profondeur moyenne par mois
  - Répartition par type de gaz
  - Total plongées / heures immergé
  - Timeline des plongées
- ✅ Profil public/privé personnalisable
- ✅ Gestion compte (modification mot de passe, suppression compte)
- ✅ Visualisation détaillée d'une plongée (URL publique ou privée selon préférences)

#### Critères de validation
- [ ] 50+ early adopters actifs
- [ ] Temps moyen d'ajout plongée < 2 minutes
- [ ] Dashboard load time < 500ms
- [ ] Taux de complétion formulaire > 80%

---

### Phase 2 : Social Diving (v2)
**Durée estimée :** 1 mois  
**Objectif :** Créer l'engagement communautaire

#### Fonctionnalités
- 🔄 Partage de plongées entre utilisateurs (relation many-to-many)
- 🔄 Système auteur/participants :
  - Un auteur unique (créateur de la fiche)
  - Participants multiples (peuvent ajouter la plongée à leur collection)
  - Seul l'auteur peut modifier/supprimer
- 🔄 Feed d'activité (plongées récentes de la communauté)
- 🔄 Commentaires sur plongées publiques

#### Critères de validation
- [ ] 20% des plongées partagées entre au moins 2 utilisateurs
- [ ] Temps moyen de partage < 30 secondes

---

### Phase 3 : Dive Spots & Geolocation (v3)
**Durée estimée :** 3 semaines  
**Objectif :** Cartographier les plongées

#### Fonctionnalités
- ⏳ Ajout de spots de plongée avec coordonnées GPS
- ⏳ Autocomplete spots via API OpenStreetMap/Google Places
- ⏳ Carte interactive mondiale des plongées utilisateur
- ⏳ Statistiques géographiques :
  - Pays/régions les plus plongés
  - Carte de chaleur des activités
- ⏳ Spots personnalisés (ajout manuel si non référencé)

#### Architecture de données
- **Source initiale** : API OpenStreetMap + Google Places API
- **Stockage local** : PostgreSQL + PostGIS pour performances
- **Données stockées** : Nom, coordonnées GPS, pays, profondeur moyenne, type (mer/lac/rivière)

#### Critères de validation
- [ ] Autocomplete spots < 200ms
- [ ] 70% des plongées avec spot assigné
- [ ] Carte interactive fluide (60fps)

---

### Phase 4 : Ecology & Species Tracking (v4)
**Durée estimée :** 3 mois  
**Objectif :** Science citoyenne marine

#### Fonctionnalités
- ⏳ Recensement espèces observées par plongée
- ⏳ Base de données 50 000+ espèces marines
- ⏳ Fiches détaillées par espèce :
  - Nom scientifique & noms communs (multilingue)
  - Statut de conservation IUCN
  - Habitat et profondeur typique
  - Galerie photos
- ⏳ Heatmaps d'observations :
  - Par espèce, zone géographique, période
  - Évolution temporelle (années)
- ⏳ Analytics écologiques :
  - Espèces rares observées
  - Biodiversité par zone
  - Tendances saisonnières

#### Architecture de données

**Sources :**
- **GBIF** (Global Biodiversity Information Facility) : Base de données primaire
- **WoRMS** (World Register of Marine Species) : Validation taxonomique
- **FishBase** : Données complémentaires poissons
- **IUCN Red List** : Statuts de conservation

**Stratégie d'implémentation :**
1. Import initial via script automatisé (~50k espèces marines 0-150m profondeur)
2. Stockage local PostgreSQL pour performances (autocomplete < 50ms)
3. Synchronisation mensuelle pour nouvelles espèces/mises à jour taxonomiques
4. Enrichissement progressif (images Wikimedia Commons, traductions communautaires)

**Relations BDD :**
```
species (id, scientific_name, common_names_json, conservation_status, taxonomy_json, image_url)
  ↓
dive_species (dive_id, species_id, quantity, observation_notes)
  ↓
dives (id, spot_id, user_id, date, ...)
```

#### Critères de validation
- [ ] Base contient 40 000+ espèces après import
- [ ] Recherche espèce < 50ms (P95)
- [ ] Heatmap génération < 2s pour 10k observations
- [ ] 30% des plongées avec au moins 1 espèce recensée

---

### Phase 5 : Ecology Cards & Gamification (v5)
**Durée estimée :** 2 mois  
**Objectif :** Engagement via gamification

#### Fonctionnalités
- ⏳ Système de cartes à collectionner (style TCG/Pokémon)
- ⏳ Déblocage automatique à chaque nouvelle espèce observée
- ⏳ Animation d'ouverture de "booster" à la première observation
- ⏳ Galerie de collection personnelle
- ⏳ Badges de rareté (commun, rare, épique, légendaire)
- ⏳ Avatars basés sur cartes favorites
- ⏳ Génération visuelle par IA (Stable Diffusion / DALL-E)

#### Design de cartes
- Modèle unifié : Photo espèce + nom + rareté + stats
- Rareté calculée depuis données plateforme (% observations globales)
- Niveaux : Commun (>10% obs), Rare (1-10%), Épique (0.1-1%), Légendaire (<0.1%)

#### Critères de validation
- [ ] Temps génération carte < 5s
- [ ] Taux d'engagement +40% post-implémentation
- [ ] 60% des utilisateurs consultent leur collection

---

### Phase 6 : Club Management & B2B (v6)
**Durée estimée :** 2 mois  
**Objectif :** Monétisation B2B

#### Fonctionnalités
- ⏳ Comptes "Club" avec permissions spécifiques
- ⏳ Dashboard club :
  - Liste plongeurs inscrits
  - Réservations et planning
  - Statistiques de fréquentation
- ⏳ Estampillage des plongées par club (certification)
- ⏳ Partage automatique plongées club → membres participants
- ⏳ Export rapports (PDF/Excel) pour assurances/fédérations

#### Tarification B2B
- **Freemium** : Jusqu'à 50 plongeurs
- **Pro** : 29€/mois (50-200 plongeurs)
- **Enterprise** : 99€/mois (illimité + API + support prioritaire)

#### Critères de validation
- [ ] 10 clubs pilotes actifs
- [ ] Conversion freemium → paid > 15%
- [ ] Churn rate < 5%/mois

---

### Phase 7 : Dive Computer Data Import (v7)
**Durée estimée :** 4 mois  
**Objectif :** Automatisation maximale

#### Fonctionnalités
- ⏳ Upload fichiers ordinateurs de plongée
- ⏳ Parsing multi-formats :
  - Suunto (.DM5, .SML)
  - Garmin (.FIT)
  - Shearwater (.txt custom)
  - Subsurface (.xml - priorité 1)
  - UDDF (format universel)
- ⏳ Extraction automatique :
  - Profil de plongée (courbe profondeur/temps)
  - Paliers de décompression
  - Consommation gaz (bars/min)
  - Température eau
  - Vitesse de remontée
- ⏳ Génération courbes visuelles (Canvas/SVG)
- ⏳ Association automatique avec plongées existantes (matching date/heure)

#### Architecture technique
- **Approche progressive** :
  1. Subsurface XML (format documenté, multi-marques)
  2. Formats propriétaires un par un (librairie `libdivecomputer`)
  3. Workers asynchrones (Bull Queue) pour parsing
- **Stockage** : S3-compatible (MinIO local / AWS S3 prod)
- **Validation** : Contrôles de cohérence données (profondeur max réaliste, durée, etc.)

#### Critères de validation
- [ ] Support 3+ formats majeurs
- [ ] Taux de parsing réussi > 95%
- [ ] Temps processing fichier < 10s

---

### Phase 8 : Mobile Application (v8)
**Durée estimée :** 3 mois  
**Objectif :** Accessibilité maximale

#### Fonctionnalités
- ⏳ Application native iOS/Android
- ⏳ Mode offline complet (sync automatique)
- ⏳ Ajout rapide de plongée post-immersion
- ⏳ Notifications (rappels, nouvelles espèces débloquées)
- ⏳ Upload photos in-app
- ⏳ Géolocalisation automatique (spot détection)

#### Stack envisagée
Options à valider (ADR à créer) :
- React Native (synergie avec stack existante)
- Flutter (performances natives)
- Capacitor (portage Nuxt existant)

#### Critères de validation
- [ ] MAU mobile > 40% du total
- [ ] Taux de crash < 1%
- [ ] Store rating > 4.5/5

---

## 📊 Spécifications Fonctionnelles Détaillées

### Module User Management

#### User Stories

**US-001 : En tant que plongeur, je veux créer un compte pour sauvegarder mes plongées**
- Champs requis : Email, Mot de passe, Prénom, Nom
- Champs optionnels : Niveau de certification, Club de rattachement, Pays
- Validation email obligatoire
- Mot de passe : min 8 caractères, 1 majuscule, 1 chiffre

**US-002 : En tant qu'utilisateur, je veux choisir la visibilité de mon profil**
- Options : Public, Privé (par défaut), Amis uniquement (v2)
- Granularité : Profil entier OU plongées individuelles

**US-003 : En tant qu'utilisateur, je veux exporter mes données**
- Formats : JSON, CSV, PDF
- Conformité RGPD (droit à la portabilité)

#### Règles Métier

- **RG-USER-001** : Un email ne peut être utilisé qu'une seule fois
- **RG-USER-002** : Suppression compte = anonymisation des contributions écologiques (espèces conservées, auteur anonymisé)
- **RG-USER-003** : Inactivité >2 ans = email de réactivation, puis archivage compte

---

### Module Dive Logging

#### User Stories

**US-004 : En tant que plongeur, je veux enregistrer une plongée avec toutes ses caractéristiques**

**Champs obligatoires :**
- Date et heure
- Durée totale (minutes)
- Profondeur maximale (mètres)
- Type de gaz principal

**Champs optionnels :**
- Profondeur moyenne
- Spot de plongée (v3+)
- Température eau/air
- Visibilité (m)
- Conditions (Courant, Vagues)
- Type de plongée (Exploration, Formation, Technique, Nuit, Dérive)
- Équipement (Combinaison type, Lestage kg, Bouteilles)
- Notes libres (markdown)
- Photos (v2+)
- Espèces observées (v4+)

**US-005 : En tant que plongeur, je veux voir l'évolution de mes statistiques**

Graphiques dashboard :
- Courbe profondeur moyenne mensuelle
- Camembert répartition types de gaz
- Timeline chronologique
- Total heures immergé
- Record profondeur
- Plongée la plus longue

**US-006 : En tant que plongeur, je veux filtrer/rechercher mes plongées**

Filtres disponibles :
- Période (date range)
- Spot
- Type de gaz
- Profondeur min/max
- Présence d'espèces spécifiques (v4)
- Avec/sans photos

#### Règles Métier

- **RG-DIVE-001** : Profondeur max réaliste : 0-200m (validation)
- **RG-DIVE-002** : Durée max réaliste : 0-720 minutes (validation)
- **RG-DIVE-003** : Une plongée ne peut être dans le futur
- **RG-DIVE-004** : Profondeur moyenne ≤ Profondeur max
- **RG-DIVE-005** : Suppression plongée partagée (v2) = retrait participants, notification

---

### Module Ecology (v4)

#### User Stories

**US-007 : En tant que plongeur, je veux ajouter les espèces observées durant ma plongée**
- Recherche autocomplete (nom scientifique OU commun)
- Quantité observée (1, 2-5, 6-10, 10+, 50+)
- Notes optionnelles par espèce

**US-008 : En tant qu'utilisateur, je veux consulter une fiche espèce**

Informations affichées :
- Nom scientifique + noms communs (FR/EN/ES)
- Taxonomie complète
- Statut conservation IUCN
- Habitat et profondeur typique
- Galerie photos
- Carte observations (heatmap)
- Graphique saisonnalité
- Espèces similaires

**US-009 : En tant que scientifique/ONG, je veux exporter les données d'observations**
- API publique REST
- Format CSV/JSON
- Filtres : espèce, zone géographique, période
- Attribution requise (CC BY-SA)

#### Règles Métier

- **RG-ECO-001** : Données observations = domaine public (CC BY-SA)
- **RG-ECO-002** : Modération manuelle pour espèces "Critically Endangered"
- **RG-ECO-003** : Heatmaps = agrégation minimum 5 observations (anonymisation)
- **RG-ECO-004** : Sync GBIF/WoRMS = 1er jour du mois, 3h du matin

---

## 🏗️ Architecture Technique

### Architecture Globale

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Web App     │  │  Mobile App  │  │  Admin    │ │
│  │  (Nuxt 4)    │  │  (v8)        │  │  Panel    │ │
│  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘ │
└─────────┼──────────────────┼────────────────┼───────┘
          │                  │                │
          │         HTTPS/JSON (REST API)     │
          │                  │                │
┌─────────▼──────────────────▼────────────────▼───────┐
│              APPLICATION LAYER (NestJS)             │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐ │
│  │   Auth   │  │   Dives   │  │     Species      │ │
│  │  Module  │  │  Module   │  │     Module       │ │
│  └──────────┘  └───────────┘  └──────────────────┘ │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐ │
│  │   Users  │  │   Spots   │  │      Clubs       │ │
│  │  Module  │  │  Module   │  │     Module       │ │
│  └──────────┘  └───────────┘  └──────────────────┘ │
└─────────┬──────────────────────────────────────────┘
          │
          │         TypeORM / Prisma
          │
┌─────────▼──────────────────────────────────────────┐
│                  DATA LAYER                         │
│  ┌──────────────────────────┐  ┌─────────────────┐ │
│  │  PostgreSQL 16 + PostGIS │  │  Redis (Cache)  │ │
│  │  - Users, Dives, Species │  │  - Sessions     │ │
│  │  - Clubs, Spots          │  │  - Queue Jobs   │ │
│  └──────────────────────────┘  └─────────────────┘ │
│                                                     │
│  ┌──────────────────────────┐  ┌─────────────────┐ │
│  │   S3-Compatible Storage  │  │  Elasticsearch  │ │
│  │   (MinIO / AWS S3)       │  │  (v4 - Search)  │ │
│  │   - Dive computer files  │  │  - Species FT   │ │
│  │   - User photos          │  │                 │ │
│  └──────────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES                     │
│  - GBIF API (species data)                          │
│  - WoRMS API (taxonomy)                             │
│  - OpenStreetMap (spots)                            │
│  - Sentry (error tracking)                          │
│  - Plausible (analytics)                            │
└─────────────────────────────────────────────────────┘
```

### Architecture Backend (NestJS)

```
backend/
├── src/
│   ├── main.ts                    # Bootstrap application
│   ├── app.module.ts              # Root module
│   │
│   ├── auth/                      # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   │
│   ├── users/                     # Users module
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── dives/                     # Dives module
│   │   ├── dives.module.ts
│   │   ├── dives.controller.ts
│   │   ├── dives.service.ts
│   │   ├── entities/
│   │   │   ├── dive.entity.ts
│   │   │   └── dive-user.entity.ts    # (v2)
│   │   └── dto/
│   │       ├── create-dive.dto.ts
│   │       └── update-dive.dto.ts
│   │
│   ├── species/                   # Species module (v4)
│   │   ├── species.module.ts
│   │   ├── species.controller.ts
│   │   ├── species.service.ts
│   │   ├── species.importer.ts    # GBIF/WoRMS import
│   │   ├── entities/
│   │   │   ├── species.entity.ts
│   │   │   └── dive-species.entity.ts
│   │   └── dto/
│   │
│   ├── spots/                     # Spots module (v3)
│   │   ├── spots.module.ts
│   │   ├── spots.controller.ts
│   │   ├── spots.service.ts
│   │   └── entities/
│   │       └── spot.entity.ts
│   │
│   ├── clubs/                     # Clubs module (v6)
│   │   ├── clubs.module.ts
│   │   ├── clubs.controller.ts
│   │   ├── clubs.service.ts
│   │   └── entities/
│   │       └── club.entity.ts
│   │
│   ├── analytics/                 # Analytics & Stats
│   │   ├── analytics.module.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.controller.ts
│   │
│   ├── queue/                     # Background jobs (Bull)
│   │   ├── queue.module.ts
│   │   ├── processors/
│   │   │   ├── species-sync.processor.ts
│   │   │   ├── stats.processor.ts
│   │   │   └── dive-computer.processor.ts
│   │   └── jobs/
│   │
│   ├── storage/                   # F
