import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLocationSchema, insertUserSchema, insertWeatherDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather data routes
  app.get("/api/weather/current", async (req, res) => {
    const locationId = Number(req.query.locationId) || 1;
    
    try {
      const data = await storage.getCurrentWeather(locationId);
      res.json(data || { message: "No current weather data available" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current weather data" });
    }
  });

  app.get("/api/weather/forecast", async (req, res) => {
    const locationId = Number(req.query.locationId) || 1;
    const days = Number(req.query.days) || 7;
    
    try {
      const data = await storage.getForecast(locationId, days);
      res.json(data || { message: "No forecast data available" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forecast data" });
    }
  });

  app.get("/api/weather/historical", async (req, res) => {
    const locationId = Number(req.query.locationId) || 1;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    
    try {
      const data = await storage.getHistoricalData(locationId, startDate, endDate);
      res.json(data || { message: "No historical data available" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch historical data" });
    }
  });

  // Location routes
  app.get("/api/locations", async (req, res) => {
    const userId = Number(req.query.userId);
    
    try {
      const locations = userId 
        ? await storage.getLocationsByUserId(userId)
        : await storage.getAllLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const locationData = insertLocationSchema.parse(req.body);
      const location = await storage.createLocation(locationData);
      res.status(201).json(location);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid location data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create location" });
      }
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const userId = Number(req.params.id);
    
    try {
      const user = await storage.getUser(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
