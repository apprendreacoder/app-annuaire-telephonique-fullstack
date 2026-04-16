import React, { useState } from 'react'

function getInitials(nom, prenom) {
  return ((prenom?.[0] ?? '') + (nom?.[0] ?? '')).toUpperCase()
}

export default function ContactRow({ contact, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ ...contact })

  function change(k, v) { setForm({ ...form, [k]: v }) }

  async function save() {
    await onUpdate(contact.id, {
      nom: form.nom,
      prenom: form.prenom,
      telephone: form.telephone,
      email: form.email,
      intitulePoste: form.intitulePoste,
      direction: form.direction,
      bureau: form.bureau,
      utilisateurId: form.utilisateur?.id,
    })
    setEdit(false)
  }

  function cancel() {
    setForm({ ...contact })
    setEdit(false)
  }

  const tags = [contact.intitulePoste, contact.direction, contact.bureau].filter(Boolean)

  return (
    <div className="card contact-card">
      {!edit ? (
        <div className="contact-view">
          <div className="avatar">{getInitials(contact.nom, contact.prenom)}</div>

          <div className="contact-info">
            <div className="contact-name">{contact.prenom} {contact.nom}</div>
            <div className="contact-phone">
              <svg style={{ display:'inline', verticalAlign:'middle', marginRight:4 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              {contact.telephone}
              {contact.email && (
                <span style={{ marginLeft: 12 }}>
                  <svg style={{ display:'inline', verticalAlign:'middle', marginRight:4 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {contact.email}
                </span>
              )}
            </div>
            {tags.length > 0 && (
              <div className="contact-tags">
                {tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
              </div>
            )}
          </div>

          <div className="contact-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setEdit(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Modifier
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(contact.id)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="edit-grid">
            <div className="field">
              <label>Nom</label>
              <input value={form.nom} onChange={e => change('nom', e.target.value)} />
            </div>
            <div className="field">
              <label>Prénom</label>
              <input value={form.prenom} onChange={e => change('prenom', e.target.value)} />
            </div>
            <div className="field">
              <label>Téléphone</label>
              <input value={form.telephone} onChange={e => change('telephone', e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={form.email || ''} onChange={e => change('email', e.target.value)} />
            </div>
            <div className="field">
              <label>Intitulé de poste</label>
              <input value={form.intitulePoste || ''} onChange={e => change('intitulePoste', e.target.value)} />
            </div>
            <div className="field">
              <label>Direction</label>
              <input value={form.direction || ''} onChange={e => change('direction', e.target.value)} />
            </div>
            <div className="field">
              <label>Bureau</label>
              <input value={form.bureau || ''} onChange={e => change('bureau', e.target.value)} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-ghost btn-sm" onClick={cancel}>Annuler</button>
            <button className="btn btn-success btn-sm" onClick={save}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Enregistrer
            </button>
          </div>
        </>
      )}
    </div>
  )
}
