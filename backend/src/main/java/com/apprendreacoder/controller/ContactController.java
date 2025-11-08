package com.apprendreacoder.controller;

import com.apprendreacoder.dto.ContactDTO;
import com.apprendreacoder.model.Contact;
import com.apprendreacoder.model.Utilisateur;
import com.apprendreacoder.service.ContactService;
import com.apprendreacoder.service.UtilisateurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;
    private final UtilisateurService utilisateurService;

    public ContactController(ContactService contactService, UtilisateurService utilisateurService) {
        this.contactService = contactService;
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public List<Contact> all() {
        return contactService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> get(@PathVariable Long id) {
        return contactService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Contact> search(@RequestParam String q) {
        return contactService.searchByNom(q);
    }

    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody ContactDTO dto) {
        // 1) on retrouve l’utilisateur propriétaire
        Utilisateur owner = utilisateurService.findById(dto.utilisateurId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));

        // 2) on mappe le DTO -> Entity
        Contact c = new Contact();
        c.setNom(dto.nom);
        c.setPrenom(dto.prenom);
        c.setTelephone(dto.telephone);
        c.setEmail(dto.email);
        c.setPoste(dto.intitulePoste);
        c.setDirection(dto.direction);
        c.setBureau(dto.bureau);
        c.setUtilisateur(owner);

        Contact created = contactService.create(c);
        return ResponseEntity.created(URI.create("/api/contacts/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id, @RequestBody ContactDTO dto) {
        return contactService.findById(id)
                .map(existing -> {
                    existing.setNom(dto.nom);
                    existing.setPrenom(dto.prenom);
                    existing.setTelephone(dto.telephone);
                    existing.setEmail(dto.email);
                    existing.setPoste(dto.intitulePoste);
                    existing.setDirection(dto.direction);
                    existing.setBureau(dto.bureau);

                    // possibilité de changer de propriétaire :
                    if (dto.utilisateurId != null) {
                        Utilisateur owner = utilisateurService.findById(dto.utilisateurId)
                                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));
                        existing.setUtilisateur(owner);
                    }

                    return ResponseEntity.ok(contactService.update(id, existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        if (contactService.findById(id).isEmpty()) return ResponseEntity.notFound().build();
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }
}



