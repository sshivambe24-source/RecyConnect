-- RecyConnect Seed Data (Demo Environment)
-- Fictional pilot records for testing and evaluators

INSERT INTO public.material_categories (id, name, slug, description, icon_name, popular_units, active)
VALUES 
  ('cat-paper', 'Paper & Cardboard', 'paper', 'Old Corrugated Cardboard (OCC), kraft cuts, office ledger, and paper grades.', 'FileText', ARRAY['tonnes', 'bales'], true),
  ('cat-plastics', 'Plastics', 'plastics', 'Polymers including PET flakes, HDPE regrind, PP raffia, and clean film.', 'Layers', ARRAY['tonnes', 'kg'], true),
  ('cat-metals', 'Metals', 'metals', 'Ferrous and non-ferrous industrial scrap: HMS 1 & 2, aluminum extrusions, copper.', 'Wrench', ARRAY['tonnes', 'kg'], true),
  ('cat-ewaste', 'E-Waste', 'e-waste', 'Decommissioned IT equipment, printed circuit boards, and electronic components.', 'Cpu', ARRAY['tonnes', 'kg', 'units'], true),
  ('cat-other', 'Other Recyclables', 'other', 'Cullet glass, textiles, rubber, and industrial byproducts.', 'Package', ARRAY['tonnes', 'units'], true)
ON CONFLICT (id) DO NOTHING;
