import React, { useState } from 'react'

export default function ContactForm({ onCreate }) {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [intitulePoste, setIntitulePoste] = useState('')
  const [direction, setDirection] = useState('')
  const [bureau, setBureau] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nom || !prenom || !telephone) {
      alert('Nom, prénom et téléphone sont obligatoires')
      return
    }
    await onCreate({ nom, prenom, telephone, email, intitulePoste, direction, bureau, utilisateurId: 1 })
    setNom(''); setPrenom(''); setTelephone(''); setEmail(''); setIntitulePoste(''); setDirection(''); setBureau('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #eee', padding: 12, margin: '12px 0' }}>
      <h3>Ajouter un contact</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <input placeholder="Nom *" value={nom} onChange={e => setNom(e.target.value)} />
        <input placeholder="Prénom *" value={prenom} onChange={e => setPrenom(e.target.value)} />
        <input placeholder="Téléphone *" value={telephone} onChange={e => setTelephone(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Intitulé de poste" value={intitulePoste} onChange={e => setIntitulePoste(e.target.value)} />
        <input placeholder="Direction" value={direction} onChange={e => setDirection(e.target.value)} />
        <input placeholder="Bureau" value={bureau} onChange={e => setBureau(e.target.value)} />
      </div>
      <button type="submit" style={{ marginTop: 10 }}>Créer</button>
    </form>
  )
}
