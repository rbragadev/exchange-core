/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('STUDENT', 'WORKER');

-- CreateEnum
CREATE TYPE "UserPhase" AS ENUM ('PRE_ARRIVAL', 'FIRST_30_DAYS', 'SETTLED');

-- CreateEnum
CREATE TYPE "UserObjective" AS ENUM ('ACCOMMODATION', 'COURSE', 'BOTH');

-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('HOMESTAY', 'SHARED');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('ACCOMMODATION', 'COURSE');

-- CreateEnum
CREATE TYPE "ReviewTargetType" AS ENUM ('ACCOMMODATION', 'COURSE');

-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('SCHOOL', 'HOMESTAY_PROVIDER', 'AGENCY');

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "role" TEXT,
    "badge" TEXT,
    "reputation_score" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "origin_country" TEXT,
    "origin_city" TEXT,
    "destination_city" TEXT,
    "status" "UserStatus",
    "phase" "UserPhase",
    "objective" "UserObjective",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner" (
    "id" TEXT NOT NULL,
    "type" "PartnerType" NOT NULL,
    "name" TEXT NOT NULL,
    "contact_email" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "payout_model" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodation" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" "AccommodationType" NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "price_cad" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CAD',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "address_hint" TEXT,
    "rules" TEXT,
    "description" TEXT,
    "partner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "school_name" TEXT NOT NULL,
    "program_name" TEXT NOT NULL,
    "program_type" TEXT,
    "city" TEXT NOT NULL,
    "weekly_hours" INTEGER,
    "duration_weeks" INTEGER,
    "price_cad" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'CAD',
    "visa_type" TEXT,
    "rules" TEXT,
    "description" TEXT,
    "partner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "target_type" "ReviewTargetType" NOT NULL,
    "accommodation_id" TEXT,
    "course_id" TEXT,
    "rating_safety" INTEGER,
    "rating_location" INTEGER,
    "rating_experience" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "type" "LeadType" NOT NULL,
    "accommodation_id" TEXT,
    "course_id" TEXT,
    "partner_id" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "source" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "copilot_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "question" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "recommended_accommodation_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommended_course_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "model_name" TEXT,
    "latency_ms" INTEGER,
    "source" TEXT,
    "confidence" TEXT,
    "warnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "copilot_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "partner_type_is_active_idx" ON "partner"("type", "is_active");

-- CreateIndex
CREATE INDEX "accommodation_city_active_idx" ON "accommodation"("city", "active");

-- CreateIndex
CREATE INDEX "accommodation_type_active_idx" ON "accommodation"("type", "active");

-- CreateIndex
CREATE INDEX "accommodation_price_cad_idx" ON "accommodation"("price_cad");

-- CreateIndex
CREATE INDEX "accommodation_partner_id_idx" ON "accommodation"("partner_id");

-- CreateIndex
CREATE INDEX "course_city_active_idx" ON "course"("city", "active");

-- CreateIndex
CREATE INDEX "course_school_name_idx" ON "course"("school_name");

-- CreateIndex
CREATE INDEX "course_partner_id_idx" ON "course"("partner_id");

-- CreateIndex
CREATE INDEX "review_user_id_created_at_idx" ON "review"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "review_target_type_created_at_idx" ON "review"("target_type", "created_at");

-- CreateIndex
CREATE INDEX "review_accommodation_id_idx" ON "review"("accommodation_id");

-- CreateIndex
CREATE INDEX "review_course_id_idx" ON "review"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_user_id_target_type_accommodation_id_course_id_key" ON "review"("user_id", "target_type", "accommodation_id", "course_id");

-- CreateIndex
CREATE INDEX "lead_type_created_at_idx" ON "lead"("type", "created_at");

-- CreateIndex
CREATE INDEX "lead_partner_id_created_at_idx" ON "lead"("partner_id", "created_at");

-- CreateIndex
CREATE INDEX "lead_user_id_created_at_idx" ON "lead"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "lead_accommodation_id_idx" ON "lead"("accommodation_id");

-- CreateIndex
CREATE INDEX "lead_course_id_idx" ON "lead"("course_id");

-- CreateIndex
CREATE INDEX "copilot_session_user_id_created_at_idx" ON "copilot_session"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "copilot_session" ADD CONSTRAINT "copilot_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
