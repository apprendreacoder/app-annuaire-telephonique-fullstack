import React, { useEffect, useState } from 'react'
import { getContacts, createContact, deleteContact, updateContact, searchContacts } from './api/contactsApi'
import ContactForm from './components/ContactForm'
import ContactRow from './components/ContactRow'
import { exportCsv } from './utils/exportCsv'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sorted, setSorted] = useState(false)

  async function load() {
    try {
      setLoading(true)
      setError('')
      const data = query ? await searchContacts(query) : await getContacts(sorted ? 'asc' : undefined)
      setContacts(data)
    } catch {
      setError('Impossible de charger les contacts. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [query, sorted])

  async function handleCreate(dto) {
    if (!dto.utilisateurId) dto.utilisateurId = 1
    const created = await createContact(dto)
    setContacts((prev) => [created, ...prev])
    setShowForm(false)
  }

  async function handleDelete(id) {
    await deleteContact(id)
    setContacts((prev) => prev.filter(c => c.id !== id))
  }

  async function handleUpdate(id, dto) {
    const updated = await updateContact(id, dto)
    setContacts((prev) => prev.map(c => c.id === id ? updated : c))
  }

  return (
    <div className="app-shell">

      {/* Header */}
      <header className="app-header">
        <div className="app-header-icon">📋</div>
        <div>
          <h1>Annuaire Téléphonique</h1>
          <p>Gérez vos contacts en un seul endroit</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            placeholder="Rechercher par nom…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-sm ${sorted ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setSorted(s => !s)}
          title="Trier A → Z"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="15" y2="6"/><line x1="3" y1="12" x2="10" y2="12"/><line x1="3" y1="18" x2="7" y2="18"/>
            <polyline points="17 4 21 8 17 12"/><line x1="21" y1="8" x2="13" y2="8"/>
          </svg>
          A → Z
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => exportCsv(contacts, 'annuaire.csv')}
          disabled={contacts.length === 0}
          title="Télécharger la liste au format CSV"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exporter CSV
        </button>
        <span className="count-badge">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Formulaire d'ajout */}
      {!showForm ? (
        <button className="add-toggle-btn" onClick={() => setShowForm(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Ajouter un nouveau contact
        </button>
      ) : (
        <ContactForm onCreate={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {/* Messages */}
      {error && <div className="error-banner">{error}</div>}

      {/* Liste */}
      {loading ? (
        <div className="contacts-list">
          {[1, 2, 3].map(i => (
            <div key={i} className="card contact-card" style={{ height: 80 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', height: '100%' }}>
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: '50%' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="skeleton" style={{ width: '40%', height: 14 }} />
                  <div className="skeleton" style={{ width: '25%', height: 11 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="card state-box">
          <div className="state-icon">{query ? '🔍' : '📭'}</div>
          <p>{query ? `Aucun résultat pour « ${query} »` : 'Aucun contact enregistré.'}</p>
        </div>
      ) : (
        <div className="contacts-list">
          {contacts.map(c => (
            <ContactRow key={c.id} contact={c} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      )}

    </div>
  )
}
