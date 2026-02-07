# TODO

## Fonctionnalités

- [x] Ajouter une système fin de gestion de owning des ressources pour éviter un appel à des ressources non authorisées (exemple Récupération d'une plongée par un utilisateur qui ne la possède pas)
- [ ] voir pour un accès spécifique a l'administrateur pour éditer lui même les plongées des autres utilisateurs.

## Authentification et Sécurité

- [x] configurer des entêtes de sécurité
- [ ] Ajouter un système de réinitialisation de mot de passe
      - [ ] (optionnel) enregistrer les tentatives de connexion avec les adresses IP et localisation

## Infrastructure et Qualité

- [ ] ajouter maildev en local pour tester les emails
- [ ] Réaliser des tests unitaires (optionnel des tests d'intégration)
- [ ] trouver un vps ou un hébergeur pour héberger le site
- [ ] créer une CI/CD pour automatiser le déploiement et les tests unitaires
- [ ] (optionnel) Ajouter sonar dans la chaine

## Organisation

- [ ] Valider l'usage d'un mono répo
- [] Tagging pour les versions de releases (SemVer)
