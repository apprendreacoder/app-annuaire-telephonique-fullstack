package com.apprendreacoder.service.impl;

import com.apprendreacoder.model.Utilisateur;
import com.apprendreacoder.repository.UtilisateurRepository;
import com.apprendreacoder.service.UtilisateurService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository repo;

    public UtilisateurServiceImpl(UtilisateurRepository repo) {
        this.repo = repo;
    }

    @Override public List<Utilisateur> findAll() {
        return repo.findAll();
    }

    @Override public Optional<Utilisateur> findById(Long id) {
        return repo.findById(id);
    }

    @Override public Utilisateur create(Utilisateur u) {
        // Ex: éviter doublon email
        if (repo.existsByEmail(u.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }
        return repo.save(u);
    }
}
