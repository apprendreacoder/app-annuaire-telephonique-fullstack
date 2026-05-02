# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Backend** : Spring Boot 3.3.2 · Java 23 · Maven · Spring Data JPA
- **Frontend** : React 18 · Vite 5 · Axios
- **Base de données** : H2 en mémoire (dev) — MySQL prévu pour la production

## Commandes

### Backend
Lancer depuis IntelliJ (Run `AnnuaireApplication`) ou via Maven depuis la racine du projet :
```bash
mvn spring-boot:run
```
Accessible sur `http://localhost:8080`.  
Console H2 : `http://localhost:8080/h2-console` (JDBC URL : `jdbc:h2:mem:annuairedb`, user : `sa`, pas de mot de passe).

Lancer les tests unitaires :
```bash
mvn test
```

Lancer un test unique :
```bash
mvn test -Dtest=ContactServiceImplTest
```

### Frontend
```bash
cd frontend
npm install      # première fois
npm run dev      # http://localhost:5173
npm run build    # build de production dans frontend/dist
```

## Architecture

```
backend/src/main/java/com/apprendreacoder/
  model/          ← entités JPA (Contact, Utilisateur)
  dto/            ← ContactDTO (payload entrant des requêtes POST/PUT)
  repository/     ← interfaces JpaRepository
  service/        ← interfaces de service
  service/impl/   ← implémentations (@Service)
  controller/     ← contrôleurs REST (@RestController)

frontend/src/
  http.js               ← instance axios (baseURL = '/api')
  api/contactsApi.js    ← fonctions d'appel API (getContacts, createContact…)
  components/
    ContactForm.jsx     ← formulaire d'ajout
    ContactRow.jsx      ← ligne de contact (affichage + édition inline)
  App.jsx               ← état global, orchestration
```

### Points clés

**Proxy Vite** : `vite.config.js` proxifie `/api` → `http://localhost:8080`. Le frontend n'a donc pas besoin de l'URL complète du backend ; toutes les requêtes utilisent `/api`.

**DTO → Entité** : les requêtes `POST /api/contacts` et `PUT /api/contacts/{id}` reçoivent un `ContactDTO`. Le contrôleur fait le mapping manuel vers l'entité `Contact` et rattache l'`Utilisateur` propriétaire via `utilisateurService.findById(dto.utilisateurId)`.

**Relation** : `Utilisateur` (1) ↔ (N) `Contact`. `@JsonIgnoreProperties("contacts")` sur la relation dans `Contact` évite la récursion infinie lors de la sérialisation JSON.

**Tri côté service** : le tri A→Z est fait en mémoire dans `ContactServiceImpl.findAllSortedByNom()` (pas via une query JPA), tri insensible à la casse sur nom puis prénom.

**`Contact.setId()` est vide** (corps intentionnellement vide pour bloquer la modification de l'ID depuis l'extérieur). L'`update()` du service fonctionne car l'entité récupérée par `findById` porte déjà l'ID correct en mémoire JPA.

### Limitations actuelles

- `utilisateurId = 1` est codé en dur dans le frontend (`ContactForm.jsx` et `App.jsx`) — l'authentification n'est pas encore implémentée.
- Pas de CORS configuré côté Spring Boot (le proxy Vite contourne ce besoin en dev, mais ce sera nécessaire en production).
- `motDePasse` est stocké en clair dans `Utilisateur` — à hasher avant de brancher une vraie authentification.
