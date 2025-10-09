# 📱 Annuaire Téléphonique – Projet Full Stack Java / React

## 🧩 Description du projet

Ce projet a pour objectif de créer une **application web Full Stack** de type **Annuaire Téléphonique**, permettant à un utilisateur de gérer ses contacts (ajout, suppression, modification, recherche).

L’application repose sur une **architecture moderne** :

* **Backend :** Java avec **Spring Boot**
* **Frontend :** **React.js** (créé avec Vite)
* **Base de données :** **MySQL** (prévue pour la mise en production)
* **Base de développement :** **H2** (base mémoire pour les tests locaux)
* **Architecture :** **MVC (Model – View – Controller)**

---

## ⚙️ Étapes effectuées jusqu’à présent

### 1️⃣ Mise en place du projet backend

* Création d’un projet **Maven** dans IntelliJ IDEA Community Edition
* Transformation du projet Maven en **application Spring Boot**
* Ajout et configuration du fichier `pom.xml` :

  * dépendances : Spring Boot Starter Web, Spring Data JPA, H2 (en dev)
* Ajout du fichier de configuration `application.properties` :

  * configuration du port (8080)
  * activation de la console H2
  * configuration Hibernate (ddl-auto = update)
* Lancement du serveur intégré **Tomcat** via Spring Boot

✅ **Résultat :** le backend Spring Boot démarre correctement et expose une première route de test (`/api/hello`).

---

### 2️⃣ Organisation des dossiers et packages

Mise en place d’une structure claire respectant le modèle **MVC** :

```
backend/
 └── src/
     └── main/
         └── java/org/example/annuaire/
             ├── model/
             ├── controller/
             ├── service/
             └── repository/
```

* **model** → contient les classes métiers (entités comme `Utilisateur`, `Contact`)
* **controller** → gère les routes API REST (ex: `/api/contacts`)
* **service** → contiendra la logique métier (traitement, validations…)
* **repository** → interfaces JPA pour interagir avec la base de données

✅ **Résultat :** Spring Boot détecte automatiquement les packages et démarre sans erreur.

---

### 3️⃣ Création du projet frontend (React.js)

* Création du dossier `frontend/` au même niveau que `backend/`
* Initialisation du projet React avec **Vite**
* Ajout des fichiers principaux :

  * `package.json` → gère les dépendances et scripts npm
  * `vite.config.js` → configuration du build Vite et de React
  * `index.html` → page principale avec la racine React (`<div id="root"></div>`)
  * `src/index.jsx` → point d’entrée de l’application
  * `src/App.jsx` → composant principal affichant un message de test
* Installation des dépendances :

  ```bash
  npm install
  ```
* Démarrage du serveur de développement :

  ```bash
  npm run dev
  ```

  Le projet se lance sur `http://localhost:5173`

✅ **Résultat :** le frontend React affiche le message
“✅ Frontend React opérationnel – Prêt à se connecter au backend Spring Boot”.

---

### 4️⃣ Connexion future (à venir)

Les prochaines étapes du projet :

* Créer les **entités JPA** (`Utilisateur`, `Contact`)
* Mettre en place les **repositories** (DAO)
* Créer les **services** pour la logique métier
* Définir les **API REST** dans les controllers
* Connecter le **frontend React** au backend (via `fetch` / `axios`)
* Remplacer H2 par **MySQL** (via `application-prod.properties`)
* Ajouter les **tests unitaires** (JUnit / Postman)
* QA automatisée avec **Selenium**

---

## 🧠 Architecture du projet

```
app-annuaire-telephone-fullstack/
 ├── backend/
 │   ├── src/
 │   │   ├── main/java/... (Spring Boot)
 │   │   └── main/resources/application.properties
 │   └── pom.xml
 │
 ├── frontend/
 │   ├── public/index.html
 │   ├── src/
 │   │   ├── App.jsx
 │   │   └── index.jsx
 │   ├── package.json
 │   └── vite.config.js
 │
 └── README.md
```

---

## 💡 Outils utilisés

* **IDE :** IntelliJ IDEA Community Edition
* **Build :** Maven (Java) & npm (React)
* **Serveurs :**

  * Tomcat (Spring Boot)
  * Vite (React)
* **Base de données :**

  * H2 (dev)
  * MySQL (production)
* **Contrôle de version :** Git / GitHub

---

## 🧩 Objectif final du projet

Créer une **application d’annuaire téléphonique complète** :

* Chaque utilisateur peut créer un compte
* Ajouter, modifier ou supprimer ses contacts
* Rechercher un contact par nom, prénom ou numéro
* Interface web simple et réactive (React)
* Backend sécurisé et performant (Spring Boot)
* Base de données MySQL pour la persistance

---

## 👨‍💻 Auteur
**Lionel M.**
Chaîne YouTube : *Apprendre à Coder*
📍 Projet pédagogique pour apprendre le développement Full Stack Java / React
