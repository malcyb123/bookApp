import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = "https://hbdbpkfdhsqcddxwopsu.supabase.co"
const supabaseAnonKey = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZGJwa2ZkaHNxY2RkeHdvcHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTk5OTMsImV4cCI6MjA0NzQ5NTk5M30.HKvNAiR6Dtr3Ts4ai9tpctjkDXNK4hFpuX38_5yY-vc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})