package com.apprendreacoder.dto;

public class ContactDTO {
    public String nom;
    public String prenom;
    public String telephone;
    public String email;
    public String intitulePoste;
    public String direction;
    public String bureau;
    public Long   utilisateurId; // pour relier le contact à son propriétaire
}
