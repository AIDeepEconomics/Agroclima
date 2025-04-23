# AgroClima: Agricultural Meteorological Visualization Platform

## Project Overview

AgroClima is a comprehensive agricultural meteorological visualization application built with React, TypeScript, and Tailwind CSS. It provides interactive visualizations of weather data with a focus on agricultural applications, including current conditions, historical analysis, and forecasts. The application is specifically designed for agricultural risk management in Uruguay, targeting producers of soybean, corn, wheat, and barley crops.

## Architecture

This project follows a client-server architecture with a clear separation between frontend and backend:

```
/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and constants
│   │   ├── pages/        # Page components
│   │   └── main.tsx      # Entry point
│   └── index.html        # HTML template
├── server/               # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage abstraction
│   └── vite.ts           # Vite server configuration
└── shared/               # Shared types and schemas
    └── schema.ts         # Database schema definitions
```

## Data Flow Architecture

1. **Frontend**: React application with reactive state management
2. **API Layer**: Express routes for data retrieval and persistence
3. **Storage Layer**: Backend storage abstraction (currently using in-memory storage)
4. **Shared Types**: Common TypeScript types and schemas used by both frontend and backend

## Key Technologies

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Routing**: wouter for client-side routing
- **State Management**: React Context, TanStack Query 
- **Data Fetching**: TanStack Query with custom fetch wrappers
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Express.js, TypeScript
- **Storage**: In-memory storage with interfaces for future database integration
- **Type Safety**: TypeScript throughout the entire stack
- **Schema Validation**: Zod with drizzle-zod integration
- **Visualization**: recharts for data visualization

## Component Architecture

### Component Organization

Components are organized into the following categories:

1. **Layout Components** (`/client/src/components/layout/`):
   - `Header.tsx`: Page header with breadcrumbs
   - `Sidebar.tsx`: Navigation sidebar

2. **UI Components** (`/client/src/components/ui/`):
   - Base components from shadcn/ui
   - Custom components for weather-specific data display:
     - `WeatherCard.tsx`: Display weather metrics
     - `WeatherMap.tsx`: Interactive weather map
     - `LayerControl.tsx`: Controls for map visualization layers
     - `TimelineControl.tsx`: Timeline controls for historical data
     - `ForecastItem.tsx`: Individual forecast day representation
     - `HistoricalChart.tsx`: Chart for historical weather data
   - Agricultural components (planned):
     - `CropSelector.tsx`: Visual crop selection interface
     - `PhenologyTimeline.tsx`: Crop development stages visualization
     - `RiskMap.tsx`: Agricultural risk visualization
     - `CriticalStageCard.tsx`: Information on crop's critical stages
     - `WaterBalanceChart.tsx`: Water balance visualization for crops
     - `ThermalStressMap.tsx`: Thermal stress visualization
     - `CropCalendar.tsx`: Planting and harvesting calendar

3. **Modal Components** (`/client/src/components/modals/`):
   - `LoginModal.tsx`: User authentication
   - `ExportModal.tsx`: Data export functionality
   - `LayerConfigModal.tsx`: Configuration for map layers
   - `HelpModal.tsx`: Contextual help
   - `MapDetailsModal.tsx`: Detailed map information
   - Agricultural modals (planned):
     - `RiskDetailModal.tsx`: Detailed agricultural risk information
     - `AgronomicRecommendationModal.tsx`: Contextual recommendations
     - `HistoricalComparisonModal.tsx`: Compare current data with historical
     - `FieldRegistrationModal.tsx`: Register/edit agricultural fields

4. **Page Components** (`/client/src/pages/`):
   - `Dashboard.tsx`: Main dashboard with current weather
   - `Historical.tsx`: Historical data analysis
   - `Forecast.tsx`: Weather forecast display
   - `Settings.tsx`: User preferences
   - `Help.tsx`: Help and documentation
   - Agricultural pages (planned):
     - `AgriculturalRisk.tsx`: Risk assessment for agriculture
     - `CropManagement.tsx`: Crop-specific management tools
     - `FieldManagement.tsx`: Field/parcel management
     - `Recommendations.tsx`: Agronomic recommendations

### State Management

The application uses a combination of React Context and local component state:

1. **ThemeProvider**: Manages light/dark theme (`/client/src/lib/providers/ThemeProvider.tsx`)
2. **WeatherDataProvider**: Provides weather data throughout the app (`/client/src/lib/providers/WeatherDataProvider.tsx`)
3. **TanStack Query**: For data fetching, caching, and mutation
4. **Agricultural Providers** (planned):
   - **CropProvider**: Manages crop-specific data and state
   - **PhenologyProvider**: Provides phenological stage information
   - **RiskAssessmentProvider**: Agricultural risk calculations and warnings
   - **FieldManagementProvider**: User's field/parcel management

## Data Model

The core data models are defined in `shared/schema.ts` with the following key types:

1. **CurrentWeather**: Current weather conditions
2. **ForecastItem**: Daily forecast data
3. **HistoricalDataPoint**: Historical weather data point
4. **WeatherData**: Combined weather data (current, forecast, historical)
5. **Location**: Geographic location
6. **User**: User account data
7. **UserPreferences**: User-specific settings
8. **MapLayer**: Weather map visualization layer
9. **Crop**: Agricultural crop information (soybean, corn, wheat, barley)
10. **CropStage**: Phenological stages of crops
11. **AgriculturalRisk**: Risk assessment data for agricultural operations
12. **Field**: User-defined agricultural field/parcel
13. **RiskMap**: Geospatial data for agricultural risk visualization

## API Routes

Backend API routes are defined in `server/routes.ts`:

1. **Weather Endpoints**:
   - `GET /api/weather/current`: Current weather data
   - `GET /api/weather/forecast`: Weather forecast
   - `GET /api/weather/historical`: Historical weather data

2. **Location Endpoints**:
   - `GET /api/locations`: Get locations
   - `POST /api/locations`: Create location
   - `PUT /api/locations/:id`: Update location

3. **User Endpoints**:
   - `GET /api/users/:id`: Get user data
   - `POST /api/users`: Create user
   - `PUT /api/users/:id`: Update user
   
4. **Agricultural Endpoints** (Planned):
   - `GET /api/crops`: Get available crops
   - `GET /api/crops/:id/stages`: Get phenological stages for a crop
   - `GET /api/agricultural-risks`: Get agricultural risk data
   - `GET /api/agricultural-risks/map`: Get risk map data
   - `POST /api/fields`: Create a new field/parcel
   - `GET /api/fields`: Get user fields
   - `GET /api/recommendations`: Get agricultural recommendations

## Storage Abstraction

The application uses a storage interface defined in `server/storage.ts` that allows for swapping between different storage implementations without changing application logic:

```typescript
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Additional methods...
}
```

Current implementation is `MemStorage` which provides in-memory storage. Future implementations could include database connections.

## Naming Conventions

1. **Components**: PascalCase for component names
2. **Files**:
   - PascalCase for component files (e.g., `WeatherCard.tsx`)
   - kebab-case for utility files (e.g., `use-theme.ts`)
   - camelCase for other files (e.g., `queryClient.ts`)

3. **Variables/Functions**: camelCase
4. **Types/Interfaces**: PascalCase
5. **Constants**: UPPER_SNAKE_CASE for true constants, camelCase for configuration objects

## Custom Hooks

The application includes several custom hooks:

1. **`useTheme`**: Manages theme state and toggling (`/client/src/hooks/use-theme.ts`)
2. **`useWeatherData`**: Provides access to weather data (`/client/src/hooks/use-weather-data.ts`)
3. **`useMapLayers`**: Manages map visualization layers (`/client/src/hooks/use-map-layers.ts`)
4. **`useIsMobile`**: Detects mobile viewport (`/client/src/hooks/use-mobile.tsx`)
5. **`useToast`**: Manages toast notifications (`/client/src/hooks/use-toast.ts`)

## Extension Points

### Adding New Weather Data Metrics

1. Update types in `shared/schema.ts`
2. Add the metric to the appropriate provider in `client/src/lib/providers/WeatherDataProvider.tsx`
3. Create UI components in `client/src/components/ui/`
4. Add API endpoint in `server/routes.ts`
5. Update storage methods in `server/storage.ts`

### Adding New Pages

1. Create the page component in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Add a navigation item in `client/src/components/layout/Sidebar.tsx`

### Adding New Map Layers

1. Define the layer in `client/src/lib/constants.ts`
2. Add layer handling in `client/src/hooks/use-map-layers.ts`
3. Update UI controls in `client/src/components/ui/LayerControl.tsx`
4. Implement visualization in `client/src/components/ui/WeatherMap.tsx`

### Adding Agricultural Risk Features

1. Update crop-related types in `shared/schema.ts`
2. Create new components for crop visualization in `client/src/components/ui/`
3. Implement new agricultural risk pages in `client/src/pages/`
4. Add crop selection and risk visualization UI components
5. Update the navigation sidebar to include agricultural sections
6. Implement risk calculation algorithms in appropriate utility files
7. Add API endpoints for crop and risk data in `server/routes.ts`

### Implementing Phenological Features

1. Define crop stage models in `shared/schema.ts`
2. Create visualization components for crop stages in `client/src/components/ui/`
3. Implement timeline visualization for phenological stages
4. Connect phenological data with weather data for risk assessment
5. Add critical stage indicators and notifications
6. Implement the crop calendar functionality

## Current Implementation Status

1. **Frontend UI**: Fully implemented
2. **Backend API**: Partially implemented with mock data
3. **Authentication**: UI implemented, backend needs integration
4. **Weather Map**: Visualization needs integration with a mapping library
5. **Data Storage**: Using in-memory storage, database integration pending

## Known Issues

1. **API Errors**: Backend returns 500 errors for weather endpoints
2. **Map Integration**: Weather map needs actual map library integration
3. **Authentication**: Login functionality is mocked
4. **React Fragment Warning**: Invalid prop warning in Header component

## Implementation Notes

1. **Mobile Responsiveness**: UI is responsive, with mobile-specific views
2. **Dark Mode**: Full dark mode support via ThemeProvider
3. **Data Mocking**: Weather data is currently mocked in `client/src/lib/mockData.ts`
4. **Unit Preferences**: User can select preferred units for temperature, wind speed, etc.

## Integration Points for External Data

The application is designed to integrate with external weather APIs. The integration points are:

1. **`server/routes.ts`**: API endpoints that fetch data
2. **`server/storage.ts`**: Methods for retrieving and storing data
3. **`WeatherDataProvider`**: Frontend provider that fetches and provides data to components

When implementing external API integration:
1. Update the appropriate methods in the storage implementation
2. Ensure the data is mapped to the application's types
3. Add any necessary API credentials using environment variables

## Development Workflow

1. **Frontend Development**: Make changes in the `client` directory
2. **Backend Development**: Make changes in the `server` directory
3. **Shared Types**: Update types in `shared/schema.ts`
4. **Run the Application**: Use the 'Start application' workflow that runs `npm run dev`