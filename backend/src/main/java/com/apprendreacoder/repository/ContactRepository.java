package com.apprendreacoder.repository;

import com.apprendreacoder.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    // on pourra plus tard ajouter des requêtes personnalisées ici
}
