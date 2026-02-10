# TODO

## Fonctionnalités

- [x] Ajouter une système fin de gestion de owning des ressources pour éviter un appel à des ressources non authorisées (exemple Récupération d'une plongée par un utilisateur qui ne la possède pas)
- [ ] voir pour un accès spécifique a l'administrateur pour éditer lui même les plongées des autres utilisateurs.

## Authentification et Sécurité

- [x] configurer des entêtes de sécurité
- [x] Ajouter un système de réinitialisation de mot de passe
      - [ ] (optionnel) enregistrer les tentatives de connexion avec les adresses IP et localisation

## Infrastructure et Qualité

- [x] ajouter maildev en local pour tester les emails
- [ ] Réaliser des tests unitaires (optionnel des tests d'intégration)
- [ ] trouver un vps ou un hébergeur pour héberger le site
- [ ] créer une CI/CD pour automatiser le déploiement et les tests unitaires
- [ ] (optionnel) Ajouter sonar dans la chaine

## Organisation

- [ ] Valider l'usage d'un mono répo
- [ ] Tagging pour les versions de releases (SemVer)





###################### Composants Fronts

## components/Atoms

- [ ] Textfield, champs de forms etc...
- [ ] Button
- [ ] Icon
- [ ] Alert
- [ ] Modal

## components/Organisms

- [ ] Formulaire de connexion (dans une popup modal ? plus classe et plus simple qu'une page)
- [ ] Formulaire d'inscription  (dans une popup modal ? plus classe et plus simple qu'une page)
- [ ] Formulaire de réinitialisation de mot de passe
- [ ] Formulaire de mise à jour de mot de passe
- [ ] Formulaire de mise à jour de profil (pseudo, avatar, etc...)

- [ ] Formulaire de création de plongée
- [ ] Formulaire de mise à jour de plongée (même formulaire ? juste le contexte qui change ?)

- [ ] Header
- [ ] Footer, avec les icons des stacks utilisées pour le projet, 


## components/Templates

- [ ] Liste des plongées d'un utilisateur (sous forme de liste, tableau /lignes ?), au click sur une plongée, on voit tous les details de la plongée (même template appelée sur la page dive/uuid)

## composables

 /auth
- [ ] useLogin, qui gère la connexion et la déconnexion
- [ ] useRegister, qui gère l'inscription
- [ ] useResetPassword, qui gère la réinitialisation du mot de passe

autre composables:
- [ ] useCheckForm, qui gère la validation des formulaires à l'aide de regex pour faire un pré-check avant les erreurs backend. Affiche les erreurs en dessous des champs en rouge, bloque le submit si les champs ne sont pas valides. (=> évite de requêter inutilement le backend, même si le backend renverra aussi les erreurs)
- [ ] useGasNameProvider, on lui passe un objet de type { oxygen: number, nitrogen: number, helium: number} et ça nous printe le nom du gaz (à repasser ensuite dans le i18n pour l'avoir dans la langue que l'on souhaite), qui sera utilisé dans plusieurs composants de l'app
## pages

Anon:
- [ ] home (la landing page, ou on presente le projet, à revoir mais y'a dejà la base)
- [ ] sandbox (juste une page pour voir tous les composants front, accessible uniquement en admin à terme)
- [ ] global stats (une page de classement des plongeurs du site, pour le fun, celui qui a été le plus profond, le plus long, le plus rapide, etc...)
- [ ] profile (profil du plongeur visible pour les autres plongeurs, sans tous les graphs mais des infos de base quand meme ), profile/uuid . Gestion de profils privé / public en base si on veut pas y apparaitre? (SSR)
- [ ] dive (une plongée visible pour les autres plongeurs, sans tous les graphs mais des infos de base quand meme ), dive/uuid (SSR)


Auth:
- [ ] dashboard (la page dashboard des graphs geeks, c'est la version un peu plus fournie et perso de /profile pour les anons omg j'ai trop hâte). Cette page est la page principale de l'app une fois qu'on est loggué. En anon, on tombe sur la home (un peu comme fait Github en gros)
- [ ] settings (la page des paramètres, pour modifier le profil, niveau de plongée ? avatar?, nationalité?, le mot de passe, etc...)

## stores

- [ ] userStore, qui stocke les variables globales de l'utilisateur (token, user, etc)
- [ ] divesStore, qui stocke les variables globales des plongées
- [ ] alertsStore, qui stocke les alertes ?

## middleware

- [ ] middleware-auth, qui autorise les pages où il faut être loggué 'profile', 'dashboard', 'settings' ...
- [ ] middleware-anon, qui autorise les pages où il ne faut pas être loggué 'home', 'sandbox', 'gloabal stats' ...
- [ ] middleware-admin, qui autorise les pages juste aux admins, la sandbox par exemple mais je vois pas trop d'autre page pour le moment ...

## i18n

- [ ] traduction FR / EN des chaînes. Est ce qu'on met en commun avec le backend comme on fait pour les types/interfaces ? de manière à avoir les mêmes messages dans le frontend et le backendn et éviter le travail en double ? Plus rapide à maintenir?
