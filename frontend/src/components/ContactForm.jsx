import React, { useState } from 'react'

export default function ContactForm({ onCreate, onCancel }) {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [intitulePoste, setIntitulePoste] = useState('')
  const [direction, setDirection] = useState('')
  const [bureau, setBureau] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nom || !prenom || !telephone) return
    await onCreate({ nom, prenom, telephone, email, intitulePoste, direction, bureau, utilisateurId: 1 })
    setNom(''); setPrenom(''); setTelephone('')
    setEmail(''); setIntitulePoste(''); setDirection(''); setBureau('')
  }

  return (
    <div className="card form-card" style={{ marginBottom: 24 }}>
      <div className="form-card-header">
        <h2>Nouveau contact</h2>
        <button className="btn btn-ghost btn-sm" type="button" onClick={onCancel}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Fermer
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Nom <span style={{ color: '#EF4444' }}>*</span></label>
            <input className="required-field" placeholder="Dupont" value={nom} onChange={e => setNom(e.target.value)} required />
          </div>
          <div className="field">
            <label>Prénom <span style={{ color: '#EF4444' }}>*</span></label>
            <input className="required-field" placeholder="Jean" value={prenom} onChange={e => setPrenom(e.target.value)} required />
          </div>
          <div className="field">
            <label>Téléphone <span style={{ color: '#EF4444' }}>*</span></label>
            <input className="required-field" placeholder="06 12 34 56 78" value={telephone} onChange={e => setTelephone(e.target.value)} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="jean.dupont@exemple.fr" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Intitulé de poste</label>
            <input placeholder="Développeur" value={intitulePoste} onChange={e => setIntitulePoste(e.target.value)} />
          </div>
          <div className="field">
            <label>Direction</label>
            <input placeholder="Informatique" value={direction} onChange={e => setDirection(e.target.value)} />
          </div>
          <div className="field">
            <label>Bureau</label>
            <input placeholder="B204" value={bureau} onChange={e => setBureau(e.target.value)} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>
          <button type="submit" className="btn btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Créer le contact
          </button>
        </div>
      </form>
    </div>
  )
}
