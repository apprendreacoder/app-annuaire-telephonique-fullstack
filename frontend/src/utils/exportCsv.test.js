import { describe, it, expect } from 'vitest'
import { buildCsv } from './exportCsv'

const HEADER = 'Nom,Prénom,Téléphone,Email,Intitulé de poste,Direction,Bureau'
const BOM = '﻿'

describe('buildCsv', () => {
  it('produit une ligne d\'en-tête correcte avec BOM UTF-8', () => {
    const csv = buildCsv([])
    expect(csv).toBe(BOM + HEADER)
  })

  it('génère une ligne par contact', () => {
    const contacts = [
      { nom: 'Dupont', prenom: 'Jean', telephone: '0600000000', email: 'j@d.fr', poste: 'Dev', direction: 'DSI', bureau: 'A01' },
      { nom: 'Martin', prenom: 'Alice', telephone: '0611111111', email: 'a@m.fr', poste: 'QA',  direction: 'DSI', bureau: 'B02' },
    ]
    const lines = buildCsv(contacts).split('\n')
    expect(lines).toHaveLength(3) // BOM+header + 2 lignes
    expect(lines[1]).toBe('"Dupont","Jean","0600000000","j@d.fr","Dev","DSI","A01"')
    expect(lines[2]).toBe('"Martin","Alice","0611111111","a@m.fr","QA","DSI","B02"')
  })

  it('entoure chaque champ de guillemets doubles', () => {
    const contacts = [{ nom: 'A', prenom: 'B', telephone: 'C', email: 'D', poste: 'E', direction: 'F', bureau: 'G' }]
    const row = buildCsv(contacts).split('\n')[1]
    expect(row).toBe('"A","B","C","D","E","F","G"')
  })

  it('double les guillemets internes', () => {
    const contacts = [{ nom: 'O\'Brien', prenom: 'Test"Double', telephone: '', email: '', poste: '', direction: '', bureau: '' }]
    const row = buildCsv(contacts).split('\n')[1]
    expect(row).toContain('"Test""Double"')
  })

  it('gère les champs null ou undefined sans erreur', () => {
    const contacts = [{ nom: 'Léponge', prenom: 'Bob', telephone: null, email: undefined, poste: null, direction: undefined, bureau: '' }]
    const row = buildCsv(contacts).split('\n')[1]
    expect(row).toBe('"Léponge","Bob","","","","",""')
  })

  it('préserve les accents et caractères spéciaux', () => {
    const contacts = [{ nom: 'Depré', prenom: 'Élodie', telephone: '00', email: 'e@é.fr', poste: 'Développeur', direction: 'Sécurité', bureau: 'Ç01' }]
    const row = buildCsv(contacts).split('\n')[1]
    expect(row).toContain('"Depré"')
    expect(row).toContain('"Élodie"')
    expect(row).toContain('"Développeur"')
  })

  it('produit un export correct avec les données réelles de l\'annuaire', () => {
    const contacts = [
      { nom: 'Léponge', prenom: 'Bob',  telephone: '0134678400', email: 'leponge.bob@superdev.com', poste: 'DDSI',             direction: 'DSI', bureau: 'A01'      },
      { nom: 'De Bondy', prenom: 'Kyky', telephone: '0610203040', email: 'kyky.debondy@superdev.com', poste: 'Développeur Java', direction: 'DSI', bureau: 'Bernabeu' },
    ]
    const lines = buildCsv(contacts).split('\n')
    expect(lines[1]).toBe('"Léponge","Bob","0134678400","leponge.bob@superdev.com","DDSI","DSI","A01"')
    expect(lines[2]).toBe('"De Bondy","Kyky","0610203040","kyky.debondy@superdev.com","Développeur Java","DSI","Bernabeu"')
  })
})
