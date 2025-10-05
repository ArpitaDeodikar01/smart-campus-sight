import { motion } from "framer-motion";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Camera, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const wasteData = [
  { time: "00:00", count: 12 },
  { time: "04:00", count: 8 },
  { time: "08:00", count: 15 },
  { time: "12:00", count: 23 },
  { time: "16:00", count: 18 },
  { time: "20:00", count: 14 },
];

const locationData = [
  { location: "Library", count: 8 },
  { location: "Hostel 1", count: 5 },
  { location: "Cafeteria", count: 6 },
  { location: "Academic", count: 4 },
];

const detections = [
  { id: 1, location: "Library Block", lat: 29.8674, lng: 77.8997, status: "pending" },
  { id: 2, location: "Hostel 3", lat: 29.8665, lng: 77.8988, status: "pending" },
  { id: 3, location: "Cafeteria", lat: 29.8680, lng: 77.9000, status: "acknowledged" },
];

export const WasteSection = () => {
  const [acknowledged, setAcknowledged] = useState<number[]>([3]);

  const handleAcknowledge = (id: number) => {
    setAcknowledged([...acknowledged, id]);
  };

  return (
    <section id="waste" className="min-h-screen py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-green">AI Waste Detection System</span>
          </h2>
          <p className="text-xl text-muted-foreground">Real-time monitoring and analysis</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-4">Waste Detection Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--warning))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--warning))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-4">Waste by Location</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="location" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Live Camera Feed
            </h3>
            <div className="aspect-video rounded-xl bg-muted/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative z-10 text-center">
                <Camera className="w-16 h-16 text-primary/50 mx-auto mb-2" />
                <p className="text-muted-foreground">AI Detection Active</p>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-destructive/20 border border-destructive rounded-lg text-xs font-semibold text-destructive">
                LIVE
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Detection Locations
            </h3>
            <div className="space-y-3">
              {detections.map((detection) => (
                <div
                  key={detection.id}
                  className="flex items-center justify-between p-4 rounded-xl glass-hover"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        acknowledged.includes(detection.id)
                          ? "bg-primary/20 text-primary"
                          : "bg-warning/20 text-warning animate-pulse-glow"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{detection.location}</p>
                      <p className="text-xs text-muted-foreground">
                        {detection.lat.toFixed(4)}, {detection.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  {acknowledged.includes(detection.id) ? (
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Clean-up Acknowledged</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleAcknowledge(detection.id)}
                      className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30"
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
