package com.apprendreacoder.controller;

import com.apprendreacoder.model.Utilisateur;
import com.apprendreacoder.service.UtilisateurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService service;

    public UtilisateurController(UtilisateurService service) {
        this.service = service;
    }

    @GetMapping
    public List<Utilisateur> all() {
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Utilisateur> create(@RequestBody Utilisateur u){
        Utilisateur created = service.create(u);
        return ResponseEntity.created(URI.create("/api/utilisateurs/" + created.getId())).body(created);
    }
}
