import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain, CloudSun, Sun, Wind, Droplets } from 'lucide-react';

const MOCK_WEATHER = {
  current: { temp: 24, condition: 'Partly Cloudy', humidity: 45, wind: 12 },
  forecast: [
    { day: 'Mon', temp: 25, icon: Sun },
    { day: 'Tue', temp: 22, icon: CloudRain },
    { day: 'Wed', temp: 23, icon: CloudSun },
    { day: 'Thu', temp: 26, icon: Sun },
    { day: 'Fri', temp: 21, icon: CloudRain },
  ]
};

export function WeatherWidget() {
  return (
    <Card className="shadow-sm border-border rounded-xl bg-card overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30 border-b border-border">
        <CardTitle className="text-base flex items-center gap-2 text-foreground">
          <CloudSun className="h-5 w-5 text-primary" /> 7-Day Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        {/* Current Weather */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div>
            <p className="text-4xl font-bold tracking-tight text-foreground">{MOCK_WEATHER.current.temp}°C</p>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{MOCK_WEATHER.current.condition}</p>
          </div>
          <div className="h-16 w-16 rounded-full bg-background shadow-sm flex items-center justify-center border border-border text-amber-500">
            <CloudSun className="h-8 w-8" />
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-1 items-center gap-2 px-3 py-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
            <Droplets className="h-4 w-4" />
            <span className="text-sm font-medium">{MOCK_WEATHER.current.humidity}% Humidity</span>
          </div>
          <div className="flex flex-1 items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Wind className="h-4 w-4" />
            <span className="text-sm font-medium">{MOCK_WEATHER.current.wind} km/h</span>
          </div>
        </div>

        {/* Forecast */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Extended Forecast</p>
          <div className="flex justify-between">
            {MOCK_WEATHER.forecast.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                <day.icon className={`h-5 w-5 ${day.icon === Sun ? 'text-amber-500' : 'text-blue-400'}`} />
                <span className="text-sm font-bold text-foreground">{day.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
