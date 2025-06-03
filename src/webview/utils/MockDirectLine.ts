import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

export enum ConnectionState {
  Uninitialized = 0,
  Connecting = 1,
  Connected = 2,
  FailedToConnect = 4
}

export interface IActivity {
  id?: string;
  type: string;
  timestamp?: string;
  from: {
    id: string;
    name?: string;
    role: 'user' | 'bot';
  };
  text?: string;
  channelData?: any;
  speak?: string;
}

/**
 * Creates a mock DirectLine client that simulates the behavior of the actual DirectLine service
 * with proper connection state management and activity handling.
 *
 * Features:
 * - Maintains connection state through BehaviorSubject
 * - Simulates activity sending/receiving
 * - Handles error scenarios
 *
 * @param {Array} activities - Initial activities to display in the chat
 */
export class MockDirectLine {
  private activitySubject: BehaviorSubject<IActivity | null>;
  private statusSubject: BehaviorSubject<ConnectionState>;
  private currentActivities: IActivity[];
  public activity$: Observable<IActivity>;
  public connectionStatus$: Observable<ConnectionState>;

  constructor(activities: IActivity[] = []) {
    this.activitySubject = new BehaviorSubject<IActivity | null>(null);
    this.statusSubject = new BehaviorSubject<ConnectionState>(
      ConnectionState.Connected
    );

    // Share both streams
    this.connectionStatus$ = this.statusSubject.asObservable();
    this.activity$ = this.activitySubject
      .asObservable()
      .pipe(filter((activity): activity is IActivity => activity !== null)); // Filter out initial null value

    // Store the activities for reset functionality
    this.currentActivities = Array.isArray(activities) ? activities : [];

    // Initialize the conversation
    this.resetConversation();
  }

  public resetConversation(): void {
    // Clear existing messages
    this.activitySubject.next(null);

    // Re-send the initial activities with delays
    this.currentActivities.forEach((activity, index) => {
      setTimeout(() => this.activitySubject.next(activity), index * 1000);
    });
  }

  public postActivity(activity: IActivity): Observable<string> {
    const id = Math.random().toString(36).substr(2, 9);
    activity.id = id;
    activity.timestamp = new Date().toISOString();

    this.activitySubject.next(activity);

    // Simulate bot response with the next available message from current transcript
    setTimeout(() => {
      const nextBotMessage = this.currentActivities.find(
        (a) => a.from.role === "bot" && (!a.id || a.id > activity.id!)
      );
      if (nextBotMessage) {
        this.activitySubject.next({
          ...nextBotMessage,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        });
      }
    }, 1000);

    return new Observable((observer) => {
      observer.next(id);
      observer.complete();
    });
  }

  public simulateConnectionState(state: ConnectionState): void {
    this.statusSubject.next(state);
  }
}

// Sample activities for demo purposes - realistic conversation flow
export const defaultMockActivities: IActivity[] = [
  {
    id: "1",
    type: "message",
    timestamp: new Date().toISOString(),
    from: { id: "bot", name: "Assistant", role: "bot" },
    text: "Hello! I'm your virtual assistant. How can I help you today?",
  },
  {
    id: "2",
    type: "message",
    timestamp: new Date().toISOString(),
    from: { id: "user", name: "User", role: "user" },
    text: "Hi! I'm looking for information about your products and services.",
  },
  {
    id: "3",
    type: "message",
    timestamp: new Date().toISOString(),
    from: { id: "bot", name: "Assistant", role: "bot" },
    text: "Great! I'd be happy to help you with product information. We offer a wide range of services including:\n• Product consultation\n• Technical support\n• Account management\n• Custom solutions\n\nWhat specific area interests you most?",
  },
  {
    id: "4",
    type: "message",
    timestamp: new Date().toISOString(),
    from: { id: "user", name: "User", role: "user" },
    text: "I'm particularly interested in technical support options.",
  },
  {
    id: "5",
    type: "message",
    timestamp: new Date().toISOString(),
    from: { id: "bot", name: "Assistant", role: "bot" },
    text: "Perfect! Our technical support includes:\n• 24/7 online assistance\n• Live chat support\n• Phone support during business hours\n• Comprehensive documentation\n• Video tutorials\n\nWould you like me to connect you with a technical specialist?",
  }
];
