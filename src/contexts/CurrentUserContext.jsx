'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createClient } from '../../utlis/supabase/client';

const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children, table = 'users' }) {
  const supabase = createClient();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const { data, error: qErr } = await supabase
        .from(table)
        .select('*')
        .eq('id', user.id)
        .single();

      if (qErr) {
        setError(qErr);
        setUserData(null);
      } else {
        setUserData(data);
      }
    } catch (err) {
      setError(err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, [supabase, table]);

  useEffect(() => {
    fetchCurrentUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchCurrentUser();
    });

    return () => {
      if (listener?.subscription?.unsubscribe) {
        listener.subscription.unsubscribe();
      } else if (listener?.unsubscribe) {
        listener.unsubscribe();
      }
    };
  }, [fetchCurrentUser, supabase]);

  return (
    <CurrentUserContext.Provider
      value={{ userData, loading, error, refresh: fetchCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (ctx === undefined || ctx === null) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return ctx;
}

export default CurrentUserContext;
