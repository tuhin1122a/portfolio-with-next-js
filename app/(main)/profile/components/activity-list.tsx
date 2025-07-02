"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, MonitorSmartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ActivityItem {
  timestamp: string;
  ip: string;
  userAgent: string;
}

export default function ActivityList() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return; // avoid calling if not logged in

    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/users/profile");
        const result = await res.json();
        console.log(result);
        setActivity(result?.loginHistory || []);
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [session]); // 👈 now it depends on session
  console.log("Activity List:", activity);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activity.length > 0 ? (
        activity.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-blue-500">
                  <MonitorSmartphone className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">User logged in</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> IP: {item.ip}
                    </span>
                    <span className="ml-5 block">
                      Agent: {item.userAgent || "Unknown"}
                    </span>
                    <span className="ml-5 block">
                      Time: {formatDate(item.timestamp)}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No login history found.</p>
        </div>
      )}
    </div>
  );
}
