package com.apprendreacoder.repository;

import com.apprendreacoder.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // on pourra plus tard ajouter des requêtes personnalisées ici
}
