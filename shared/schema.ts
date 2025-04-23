import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real } from "drizzle-orm/pg-core";
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

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;
