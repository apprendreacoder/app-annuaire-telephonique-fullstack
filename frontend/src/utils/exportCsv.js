const HEADER = ['Nom', 'Prénom', 'Téléphone', 'Email', 'Intitulé de poste', 'Direction', 'Bureau']

function escape(value) {
  const str = value == null ? '' : String(value)
  return '"' + str.replace(/"/g, '""') + '"'
}

export function buildCsv(contacts) {
  const rows = contacts.map(c => [
    escape(c.nom),
    escape(c.prenom),
    escape(c.telephone),
    escape(c.email),
    escape(c.poste),
    escape(c.direction),
    escape(c.bureau),
  ].join(','))
  return '﻿' + HEADER.join(',') + (rows.length ? '\n' + rows.join('\n') : '')
}

export function exportCsv(contacts, filename = 'annuaire.csv') {
  const blob = new Blob([buildCsv(contacts)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
