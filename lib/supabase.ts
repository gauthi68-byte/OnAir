import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'sb_publishable_O8kpfYvsWHlAltKRqKAvsQ_T25UGM-w';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6c3RrcGpscGhlZnlkcG1sb2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0ODIzOTcsImV4cCI6MjEwMzA1ODM5N30.InJERHbFsSyb1BdHoPAquBgOG-gmiAt6sD00m0SF4bQ';
export const supabase = createClient(supabaseUrl, supabaseKey);
