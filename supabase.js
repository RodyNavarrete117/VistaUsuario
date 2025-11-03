// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// 🔗 Conexión a tu proyecto Supabase
const SUPABASE_URL = 'https://kibzdmmpggezoqsrkvyh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYnpkbW1wZ2dlem9xc3JrdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExOTg1MzUsImV4cCI6MjA3Njc3NDUzNX0.sg-LbjERSP1OOPx0TZKptP2Zr2iDOykGITsl47GpPQI';

// 🚀 Crear cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
