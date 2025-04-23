import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  preferences: jsonb("preferences"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  isFavorite: boolean("is_favorite").default(false),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").references(() => locations.id),
  timestamp: timestamp("timestamp").notNull(),
  temperature: real("temperature"),
  humidity: real("humidity"),
  windSpeed: real("wind_speed"),
  windDirection: real("wind_direction"),
  precipitation: real("precipitation"),
  pressure: real("pressure"),
  visibility: real("visibility"),
  uvIndex: real("uv_index"),
  dataType: text("data_type").notNull(), // 'current', 'historical', 'forecast'
});

// Agricultural tables
export const crops = pgTable("crops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scientificName: text("scientific_name"),
  type: text("type").notNull(), // 'soybean', 'corn', 'wheat', 'barley'
  description: text("description"),
  iconPath: text("icon_path"),
  color: text("color"), // Color code for visualization
  createdAt: timestamp("created_at").defaultNow(),
});

export const cropStages = pgTable("crop_stages", {
  id: serial("id").primaryKey(),
  cropId: integer("crop_id").references(() => crops.id),
  name: text("name").notNull(), // Stage name (e.g., "V1", "R1")
  label: text("label").notNull(), // Display label (e.g., "Emergence")
  description: text("description"),
  dayRangeStart: integer("day_range_start"), // Days from planting (min)
  dayRangeEnd: integer("day_range_end"), // Days from planting (max)
  isCritical: boolean("is_critical").default(false), // Whether it's a critical stage
  temperatureMin: real("temperature_min"), // Min temperature for optimal growth
  temperatureMax: real("temperature_max"), // Max temperature for optimal growth
  waterRequirement: real("water_requirement"), // Water need in mm/day
  iconPath: text("icon_path"),
  sortOrder: integer("sort_order"), // For visualization ordering
});

export const fields = pgTable("fields", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  area: real("area"), // Area in hectares
  geometry: jsonb("geometry"), // GeoJSON polygon
  createdAt: timestamp("created_at").defaultNow(),
});

export const cropPlantings = pgTable("crop_plantings", {
  id: serial("id").primaryKey(),
  fieldId: integer("field_id").references(() => fields.id),
  cropId: integer("crop_id").references(() => crops.id),
  plantingDate: date("planting_date").notNull(),
  harvestDate: date("harvest_date"),
  variety: text("variety"),
  seedingRate: real("seeding_rate"), // Kg/ha or seeds/ha
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agriculturalRisks = pgTable("agricultural_risks", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").references(() => locations.id),
  cropId: integer("crop_id").references(() => crops.id),
  cropStageId: integer("crop_stage_id").references(() => cropStages.id),
  date: date("date").notNull(),
  riskType: text("risk_type").notNull(), // 'drought', 'frost', 'hail', 'flood', 'heat', 'disease'
  riskLevel: integer("risk_level"), // 0-100
  probability: real("probability"), // 0-1
  details: jsonb("details"), // Additional details as JSON
  createdAt: timestamp("created_at").defaultNow(),
});

export const agronomicRecommendations = pgTable("agronomic_recommendations", {
  id: serial("id").primaryKey(),
  riskId: integer("risk_id").references(() => agriculturalRisks.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: integer("priority").default(1), // 1-5 priority
  actionType: text("action_type"), // 'preventive', 'corrective'
  source: text("source"), // Source of recommendation (e.g., "INIA")
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  preferences: true,
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
  latitude: true,
  longitude: true,
  isFavorite: true,
  userId: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).pick({
  locationId: true,
  timestamp: true,
  temperature: true,
  humidity: true,
  windSpeed: true,
  windDirection: true,
  precipitation: true,
  pressure: true,
  visibility: true,
  uvIndex: true,
  dataType: true,
});

export const insertCropSchema = createInsertSchema(crops).pick({
  name: true,
  scientificName: true,
  type: true,
  description: true,
  iconPath: true,
  color: true,
});

export const insertCropStageSchema = createInsertSchema(cropStages).pick({
  cropId: true,
  name: true,
  label: true,
  description: true,
  dayRangeStart: true,
  dayRangeEnd: true,
  isCritical: true,
  temperatureMin: true,
  temperatureMax: true,
  waterRequirement: true,
  iconPath: true,
  sortOrder: true,
});

export const insertFieldSchema = createInsertSchema(fields).pick({
  userId: true,
  name: true,
  description: true,
  area: true,
  geometry: true,
});

export const insertCropPlantingSchema = createInsertSchema(cropPlantings).pick({
  fieldId: true,
  cropId: true,
  plantingDate: true,
  harvestDate: true,
  variety: true,
  seedingRate: true,
  notes: true,
});

export const insertAgriculturalRiskSchema = createInsertSchema(agriculturalRisks).pick({
  locationId: true,
  cropId: true,
  cropStageId: true,
  date: true,
  riskType: true,
  riskLevel: true,
  probability: true,
  details: true,
});

export const insertAgronomicRecommendationSchema = createInsertSchema(agronomicRecommendations).pick({
  riskId: true,
  title: true,
  description: true,
  priority: true,
  actionType: true,
  source: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;

export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof crops.$inferSelect;

export type InsertCropStage = z.infer<typeof insertCropStageSchema>;
export type CropStage = typeof cropStages.$inferSelect;

export type InsertField = z.infer<typeof insertFieldSchema>;
export type Field = typeof fields.$inferSelect;

export type InsertCropPlanting = z.infer<typeof insertCropPlantingSchema>;
export type CropPlanting = typeof cropPlantings.$inferSelect;

export type InsertAgriculturalRisk = z.infer<typeof insertAgriculturalRiskSchema>;
export type AgriculturalRisk = typeof agriculturalRisks.$inferSelect;

export type InsertAgronomicRecommendation = z.infer<typeof insertAgronomicRecommendationSchema>;
export type AgronomicRecommendation = typeof agronomicRecommendations.$inferSelect;
