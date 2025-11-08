package com.apprendreacoder.service;

import com.apprendreacoder.model.Utilisateur;

import java.util.List;
import java.util.Optional;

public interface UtilisateurService {
    List<Utilisateur> findAll();
    Optional<Utilisateur> findById(Long id);
    Utilisateur create(Utilisateur u);
}
