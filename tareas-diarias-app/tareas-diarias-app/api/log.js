/**
 * Vercel serverless function: POST /api/log
 *
 * Body variants:
 *   { sheet: 'Tareas',    pantalla, tarea, estado }
 *   { sheet: 'Filosofía', corriente, autor, libro, tema, reflexion }
 *
 * Env vars required:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY  (with literal \n for newlines)
 *   GOOGLE_SPREADSHEET_ID
 */

import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID

function getAuth() {
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return auth
}

function nowStr() {
  return new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body
    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    let range, values

    if (body.sheet === 'Filosofía') {
      range = 'Filosofía!A:F'
      values = [[
        nowStr(),
        body.corriente ?? '',
        body.autor     ?? '',
        body.libro     ?? '',
        body.tema      ?? '',
        body.reflexion ?? '',
      ]]
    } else {
      // Default: Tareas sheet
      range = 'Tareas!A:D'
      values = [[
        nowStr(),
        body.pantalla ?? '',
        body.tarea    ?? '',
        body.estado   ?? '',
      ]]
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('api/log error:', err)
    return res.status(500).json({ error: err.message })
  }
}
