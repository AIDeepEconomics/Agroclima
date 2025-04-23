import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    { 
      id: 'faq1', 
      question: 'How do I interpret the weather map layers?', 
      answer: 'Each map layer represents different weather data. Temperature layers use a color gradient from blue (cold) to red (hot). Wind layers use arrows to show direction and colors for intensity. Precipitation layers use blue shading to indicate rainfall amounts. You can adjust the opacity of each layer or toggle them on/off in the layer controls panel.' 
    },
    { 
      id: 'faq2', 
      question: 'How accurate is the forecast data?', 
      answer: 'Our forecast data is sourced from multiple meteorological services and updated regularly. Short-term forecasts (1-3 days) are typically 80-90% accurate, while longer-range forecasts (4-7 days) are around 70% accurate. We continuously evaluate and improve our forecast models.' 
    },
    { 
      id: 'faq3', 
      question: 'Can I download historical weather data?', 
      answer: 'Yes, you can export historical weather data from the Historical Analysis page. Navigate to the data table view, use the filters to select your desired date range and parameters, then click the "Export" button. Data is available in CSV, JSON, or Excel formats.' 
    },
    { 
      id: 'faq4', 
      question: 'How do I save a location for quick access?', 
      answer: 'To save a location, search for it using the location search bar in the header. When viewing weather data for that location, click the "Save Location" button. You can manage your saved locations in the Settings page under the "Locations" tab.' 
    },
    { 
      id: 'faq5', 
      question: 'How can I change the units of measurement?', 
      answer: 'You can change units (temperature, wind speed, pressure) in the Settings page under the "Units" tab. These preferences will be saved to your account if you\'re logged in, or to your browser if you\'re using the app without an account.' 
    },
  ];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Help & Information"
          breadcrumbs={[{ path: '/', label: 'Dashboard' }, { path: '/help', label: 'Help' }]}
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Title and Search */}
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Help Center</h1>
              
              <div className="w-full lg:w-96">
                <Input
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Help Content */}
            <Tabs defaultValue="guides">
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="guides">User Guides</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              {/* User Guides */}
              <TabsContent value="guides" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 flex items-center justify-center">
                          <span className="material-icons text-4xl text-primary-500">dashboard</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Dashboard Overview</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Learn how to use the main dashboard and its features
                          </p>
                          <Button variant="link" className="px-0 py-1 h-auto">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 flex items-center justify-center">
                          <span className="material-icons text-4xl text-primary-500">map</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Weather Map Tutorial</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            How to navigate and customize the interactive weather map
                          </p>
                          <Button variant="link" className="px-0 py-1 h-auto">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 flex items-center justify-center">
                          <span className="material-icons text-4xl text-primary-500">history</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Historical Data Analysis</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Working with charts and historical weather records
                          </p>
                          <Button variant="link" className="px-0 py-1 h-auto">View Guide</Button>
                        </div>
                      </div>
                      
                      <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 flex items-center justify-center">
                          <span className="material-icons text-4xl text-primary-500">calendar_today</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">Forecast Interpretation</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Understanding forecast data and prediction models
                          </p>
                          <Button variant="link" className="px-0 py-1 h-auto">View Guide</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-icons text-6xl text-white/80">play_circle</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">Weather Map Tutorial</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            3:45 • Basic map navigation and controls
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-icons text-6xl text-white/80">play_circle</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">Working with Weather Data</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            5:12 • Data analysis and export features
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-icons text-6xl text-white/80">play_circle</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">Advanced User Settings</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            4:23 • Customizing your weather experience
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* FAQ */}
              <TabsContent value="faq" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {searchQuery && filteredFaqs.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                        <Button 
                          variant="link" 
                          onClick={() => setSearchQuery('')}
                          className="mt-2"
                        >
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs.map(faq => (
                          <AccordionItem value={faq.id} key={faq.id}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Still Have Questions?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center sm:text-left sm:flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-0">
                          Can't find the answer you're looking for? Please contact our support team.
                        </p>
                      </div>
                      <Button>
                        <span className="material-icons mr-2">support_agent</span>
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Data Sources */}
              <TabsContent value="data" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        AgroClima uses data from multiple trusted meteorological sources to provide the most accurate weather information. Our data is refreshed multiple times per hour for current conditions and forecasts.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <h3 className="font-medium mb-2">Current & Forecast Data</h3>
                          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              National Weather Service (NWS)
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              European Centre for Medium-Range Weather Forecasts (ECMWF)
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              Global Forecast System (GFS)
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              Weather Research and Forecasting Model (WRF)
                            </li>
                          </ul>
                        </div>
                        
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <h3 className="font-medium mb-2">Historical Data</h3>
                          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              NOAA National Centers for Environmental Information
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              Global Historical Climatology Network
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              Met Office Hadley Centre
                            </li>
                            <li className="flex items-center">
                              <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                              National Snow and Ice Data Center
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Data Update Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Data Type</th>
                              <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Update Frequency</th>
                              <th className="text-left py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">Resolution</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="py-3 px-4">Current Conditions</td>
                              <td className="py-3 px-4">Every 15-30 minutes</td>
                              <td className="py-3 px-4">Location specific</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="py-3 px-4">Short-range Forecast</td>
                              <td className="py-3 px-4">Hourly</td>
                              <td className="py-3 px-4">1-3 day hourly, 3-5 day 3-hourly</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="py-3 px-4">Medium-range Forecast</td>
                              <td className="py-3 px-4">4 times daily</td>
                              <td className="py-3 px-4">5-10 day daily</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4">Historical Data</td>
                              <td className="py-3 px-4">Monthly updates</td>
                              <td className="py-3 px-4">Daily records</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Contact */}
              <TabsContent value="contact" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-300">
                        Our support team is available to help with any questions or issues you may have with the application.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Name</label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <Input id="email" type="email" placeholder="your.email@example.com" />
                        </div>
                        
                        <div className="flex flex-col space-y-2 sm:col-span-2">
                          <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                          <Input id="subject" placeholder="Help request subject" />
                        </div>
                        
                        <div className="flex flex-col space-y-2 sm:col-span-2">
                          <label htmlFor="message" className="text-sm font-medium">Message</label>
                          <textarea 
                            id="message" 
                            rows={5}
                            placeholder="Describe your issue or question..."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button>Send Message</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Connect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center text-center">
                        <span className="material-icons text-3xl text-primary-500 mb-2">email</span>
                        <h3 className="font-medium mb-1">Email Support</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          Get help via email
                        </p>
                        <a href="mailto:support@agroclima.example" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                          support@agroclima.example
                        </a>
                      </div>
                      
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center text-center">
                        <span className="material-icons text-3xl text-primary-500 mb-2">forum</span>
                        <h3 className="font-medium mb-1">Community Forum</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          Join discussions with other users
                        </p>
                        <a href="#" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                          Visit Forum
                        </a>
                      </div>
                      
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center text-center">
                        <span className="material-icons text-3xl text-primary-500 mb-2">chat</span>
                        <h3 className="font-medium mb-1">Live Chat</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          Chat with support (business hours)
                        </p>
                        <Button variant="outline" size="sm">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
