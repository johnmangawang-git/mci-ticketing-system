'use client';

import { useEffect, useState, useCallback } from 'react';

interface Event {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

export function useRealtime(pollInterval = 2000) {
  const [events, setEvents] = useState<Event[]>([]);
  const [lastEventId, setLastEventId] = useState<string>('0');
  const [isConnected, setIsConnected] = useState(false);

  const pollEvents = useCallback(async () => {
    try {
      const response = await fetch(`/api/events?lastEventId=${lastEventId}`);
      const data = await response.json();
      
      if (data.events && data.events.length > 0) {
        setEvents(prev => [...prev, ...data.events]);
        setLastEventId(data.lastEventId);
      }
      
      setIsConnected(true);
    } catch (error) {
      console.error('Error polling events:', error);
      setIsConnected(false);
    }
  }, [lastEventId]);

  const sendEvent = useCallback(async (type: string, data: any) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });
    } catch (error) {
      console.error('Error sending event:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(pollEvents, pollInterval);
    
    // Initial poll
    pollEvents();

    return () => clearInterval(interval);
  }, [pollEvents, pollInterval]);

  return {
    events,
    isConnected,
    sendEvent,
    clearEvents: () => setEvents([]),
  };
}