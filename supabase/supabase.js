import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabase_url = 'https://pgjhcuciyozcrfpmxswa.supabase.co';
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnamhjdWNpeW96Y3JmcG14c3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5ODI4MDEsImV4cCI6MTk5NzU1ODgwMX0.VafTWVDqk8IuhXQ-uiOLptyZQwHvGvFmn0AWQWg-JGI';
const supabase = createClient(supabase_url, supabase_key, {
  localStorage: AsyncStorage,
});

export default supabase;