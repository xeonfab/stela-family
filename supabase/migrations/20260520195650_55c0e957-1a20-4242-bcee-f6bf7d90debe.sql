ALTER TABLE public.waitlist_entries
  ADD CONSTRAINT waitlist_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND length(email) <= 255),
  ADD CONSTRAINT waitlist_foyers_values CHECK (foyers IN ('1', '2', '3+')),
  ADD CONSTRAINT waitlist_source_length CHECK (length(source) <= 64);
