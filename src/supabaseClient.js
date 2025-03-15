import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eajhgudvqgxleumkejvu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhamhndWR2cWd4bGV1bWtlanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NDA5NTMsImV4cCI6MjA1NzIxNjk1M30.rmGUKlc5gxRMedAZMkRa9Z1nIis4VxV7kFb3pkwKHTg'
export const supabase = createClient(supabaseUrl, supabaseKey)