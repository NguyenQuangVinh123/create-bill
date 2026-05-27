-- Composite: filter/join by customer + sort by date (list + search flows)
CREATE INDEX "ContactIncome_customerId_dateCreated_idx" ON "ContactIncome"("customerId", "dateCreated" DESC);

-- Trigram: speed up ILIKE '%query%' on customer name (Prisma `contains` + insensitive)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "Customer_name_trgm_idx" ON "Customer" USING gin (lower("name") gin_trgm_ops);
