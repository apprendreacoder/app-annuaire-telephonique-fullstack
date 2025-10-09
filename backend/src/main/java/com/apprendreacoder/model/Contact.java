package com.apprendreacoder.model;

import jakarta.persistence.*;

@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String prenom;
    private String telephone;
    private String email;
    private String poste;       // Intitulé du poste
    private String direction;   // Direction ou service
    private String bureau;      // Emplacement physique (ex: B18)


    // Relation : plusieurs contacts pour un utilisateur
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    //Constructeur vide
    public Contact() {
    }

    //Constructeur avec champs

    public Contact(String prenom, String telephone, String email, String poste, String direction, String bureau, Utilisateur utilisateur) {
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
        this.poste = poste;
        this.direction = direction;
        this.bureau = bureau;
        this.utilisateur = utilisateur;
    }

    //Getters and Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getBureau() {
        return bureau;
    }

    public void setBureau(String bureau) {
        this.bureau = bureau;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
