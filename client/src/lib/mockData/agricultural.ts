import { Crop, CropStage, RegionalRiskSummary, RiskType, AgriculturalRisk } from '../types';

// Mock data for crops
export const crops: Crop[] = [
  {
    id: 1,
    name: 'Soybean',
    scientificName: 'Glycine max',
    type: 'soybean',
    description: 'Annual legume with high oil and protein content, widely cultivated in Uruguay.',
    iconPath: 'soybean.svg',
    color: '#5D873D', // Light green
  },
  {
    id: 2,
    name: 'Corn',
    scientificName: 'Zea mays',
    type: 'corn',
    description: 'Cereal grain extensively grown throughout Uruguay for grain and silage.',
    iconPath: 'corn.svg',
    color: '#F9D949', // Yellow
  },
  {
    id: 3,
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    type: 'wheat',
    description: 'Winter cereal crop, one of the main agricultural products in Uruguay.',
    iconPath: 'wheat.svg',
    color: '#E8C872', // Amber
  },
  {
    id: 4,
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    type: 'barley',
    description: 'Important winter crop in Uruguay, primarily used for malting and animal feed.',
    iconPath: 'barley.svg',
    color: '#C59D5F', // Brown
  }
];

// Mock data for Soybean crop stages
export const soybeanStages: CropStage[] = [
  { 
    id: 1, 
    cropId: 1, 
    name: 'VE', 
    label: 'Emergence', 
    description: 'Cotyledons above the soil surface', 
    dayRangeStart: 5, 
    dayRangeEnd: 10, 
    isCritical: false, 
    temperatureMin: 10, 
    temperatureMax: 25,
    waterRequirement: 2.5,
    iconPath: 'stage_ve.svg',
    sortOrder: 1
  },
  { 
    id: 2, 
    cropId: 1, 
    name: 'V1', 
    label: 'First Trifoliate', 
    description: 'First trifoliate leaf fully expanded', 
    dayRangeStart: 10, 
    dayRangeEnd: 15, 
    isCritical: false, 
    temperatureMin: 15, 
    temperatureMax: 30,
    waterRequirement: 3.5,
    iconPath: 'stage_v1.svg',
    sortOrder: 2
  },
  { 
    id: 3, 
    cropId: 1, 
    name: 'V3', 
    label: 'Third Trifoliate', 
    description: 'Third trifoliate leaf fully expanded', 
    dayRangeStart: 15, 
    dayRangeEnd: 25, 
    isCritical: false, 
    temperatureMin: 15, 
    temperatureMax: 30,
    waterRequirement: 4.5,
    iconPath: 'stage_v3.svg',
    sortOrder: 3
  },
  { 
    id: 4, 
    cropId: 1, 
    name: 'R1', 
    label: 'Beginning Bloom', 
    description: 'One open flower at any node on the main stem', 
    dayRangeStart: 40, 
    dayRangeEnd: 50, 
    isCritical: true, 
    temperatureMin: 20, 
    temperatureMax: 30,
    waterRequirement: 6.5,
    iconPath: 'stage_r1.svg',
    sortOrder: 4
  },
  { 
    id: 5, 
    cropId: 1, 
    name: 'R3', 
    label: 'Beginning Pod', 
    description: 'Pod 5mm long at one of the four uppermost nodes', 
    dayRangeStart: 50, 
    dayRangeEnd: 60, 
    isCritical: true, 
    temperatureMin: 20, 
    temperatureMax: 30,
    waterRequirement: 7.5,
    iconPath: 'stage_r3.svg',
    sortOrder: 5
  },
  { 
    id: 6, 
    cropId: 1, 
    name: 'R5', 
    label: 'Beginning Seed', 
    description: 'Seed 3mm long in a pod at one of the four uppermost nodes', 
    dayRangeStart: 65, 
    dayRangeEnd: 75, 
    isCritical: true, 
    temperatureMin: 18, 
    temperatureMax: 28,
    waterRequirement: 7.0,
    iconPath: 'stage_r5.svg',
    sortOrder: 6
  },
  { 
    id: 7, 
    cropId: 1, 
    name: 'R7', 
    label: 'Beginning Maturity', 
    description: 'One normal pod on the main stem that has reached its mature pod color', 
    dayRangeStart: 90, 
    dayRangeEnd: 100, 
    isCritical: false, 
    temperatureMin: 15, 
    temperatureMax: 28,
    waterRequirement: 3.0,
    iconPath: 'stage_r7.svg',
    sortOrder: 7
  },
  { 
    id: 8, 
    cropId: 1, 
    name: 'R8', 
    label: 'Full Maturity', 
    description: '95% of the pods have reached their mature pod color', 
    dayRangeStart: 105, 
    dayRangeEnd: 115, 
    isCritical: false, 
    temperatureMin: 15, 
    temperatureMax: 28,
    waterRequirement: 0,
    iconPath: 'stage_r8.svg',
    sortOrder: 8
  }
];

// Mock regional risk data
export const regionalRiskData: RegionalRiskSummary[] = [
  {
    regionName: 'Litoral Oeste',
    risks: {
      drought: 65,
      frost: 10,
      hail: 25,
      flood: 15,
      heat: 40,
      disease: 30
    },
    highestRisk: 'drought',
    highestRiskLevel: 65
  },
  {
    regionName: 'Centro-Sur',
    risks: {
      drought: 45,
      frost: 15,
      hail: 30,
      flood: 20,
      heat: 25,
      disease: 35
    },
    highestRisk: 'drought',
    highestRiskLevel: 45
  },
  {
    regionName: 'Este',
    risks: {
      drought: 30,
      frost: 20,
      hail: 15,
      flood: 40,
      heat: 25,
      disease: 30
    },
    highestRisk: 'flood',
    highestRiskLevel: 40
  },
  {
    regionName: 'Norte',
    risks: {
      drought: 70,
      frost: 5,
      hail: 20,
      flood: 10,
      heat: 60,
      disease: 25
    },
    highestRisk: 'drought',
    highestRiskLevel: 70
  },
  {
    regionName: 'Centro-Norte',
    risks: {
      drought: 55,
      frost: 10,
      hail: 35,
      flood: 20,
      heat: 45,
      disease: 30
    },
    highestRisk: 'drought',
    highestRiskLevel: 55
  }
];

// Mock agricultural risk data
export const agriculturalRisks: AgriculturalRisk[] = [
  {
    id: 1,
    locationId: 1,
    cropId: 1,
    cropStageId: 4,
    date: new Date('2023-12-15'),
    riskType: 'drought',
    riskLevel: 75,
    probability: 0.8,
    details: {
      duration: '7 days',
      impactDescription: 'High probability of yield loss during critical flowering stage',
      recommendedActions: [
        'Implement irrigation if available',
        'Consider growth regulators application',
        'Monitor plant stress daily'
      ]
    }
  },
  {
    id: 2,
    locationId: 1,
    cropId: 1,
    cropStageId: 4,
    date: new Date('2023-12-18'),
    riskType: 'heat',
    riskLevel: 65,
    probability: 0.7,
    details: {
      duration: '5 days',
      impactDescription: 'Potential flower abortion due to high temperatures',
      recommendedActions: [
        'Ensure adequate irrigation',
        'Consider temporary shading for sensitive crops',
        'Avoid additional stress factors'
      ]
    }
  },
  {
    id: 3,
    locationId: 2,
    cropId: 2,
    cropStageId: 12,
    date: new Date('2023-12-20'),
    riskType: 'disease',
    riskLevel: 60,
    probability: 0.65,
    details: {
      pathogen: 'Rust',
      impactDescription: 'Humid conditions favorable for disease development',
      recommendedActions: [
        'Preventive fungicide application',
        'Increase crop monitoring frequency',
        'Ensure good field ventilation'
      ]
    }
  },
  {
    id: 4,
    locationId: 3,
    cropId: 3,
    cropStageId: 20,
    date: new Date('2023-12-25'),
    riskType: 'hail',
    riskLevel: 45,
    probability: 0.4,
    details: {
      expectedIntensity: 'Moderate',
      impactDescription: 'Potential damage to ripening heads',
      recommendedActions: [
        'Accelerate harvest if possible',
        'Check insurance coverage',
        'Prepare for emergency response'
      ]
    }
  },
  {
    id: 5,
    locationId: 4,
    cropId: 4,
    cropStageId: 26,
    date: new Date('2024-01-05'),
    riskType: 'flood',
    riskLevel: 55,
    probability: 0.5,
    details: {
      expectedDuration: '3-4 days',
      impactDescription: 'Standing water may affect late growth stages',
      recommendedActions: [
        'Ensure field drainage is working',
        'Monitor for secondary disease infections',
        'Consider emergency drainage measures'
      ]
    }
  }
];