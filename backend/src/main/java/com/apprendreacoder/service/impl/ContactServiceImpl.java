package com.apprendreacoder.service.impl;

import com.apprendreacoder.model.Contact;
import com.apprendreacoder.repository.ContactRepository;
import com.apprendreacoder.service.ContactService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository repo;

    public ContactServiceImpl(ContactRepository repo) { this.repo = repo; }

    @Override public List<Contact> findAll() { return repo.findAll(); }

    @Override public Optional<Contact> findById(Long id) { return repo.findById(id); }

    @Override public Contact create(Contact contact) {
        // Ici on pourrait ajouter des validations métier si nécessaire
        return repo.save(contact);
    }

    @Override public Contact update(Long id, Contact contact) {
        // On s’assure que l’ID correspond à la ressource qu’on met à jour
        contact.setId(id);
        return repo.save(contact);
    }

    @Override public void delete(Long id) { repo.deleteById(id); }

    @Override public List<Contact> searchByNom(String nom) {
        return repo.findByNomContainingIgnoreCase(nom);
    }
}
