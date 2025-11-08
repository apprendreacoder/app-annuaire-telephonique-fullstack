package com.apprendreacoder.repository;

import com.apprendreacoder.model.Contact;
import com.apprendreacoder.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUtilisateur(Utilisateur utilisateur);
    List<Contact> findByNomContainingIgnoreCase(String nom);
}
