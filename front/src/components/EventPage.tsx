import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { IUserInfo } from '../App';
import { firebaseDb } from '../firebase';
import EventPageFragment from './EventPageFragment';

export interface InterfaceEvent {
  body: string;
  date: string;
  eventId: string;
  location: string;
  participants: IUserInfo[];
  sponsor: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
  };
  title: string;
}

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      year: string;
      month: string;
      date: string;
      eventId: string;
    };
  };
}

interface InterfaceState {
  isLoding: boolean;
  event: InterfaceEvent;
}

// TODO get userInfo by id
export default class EventPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      event: {
        body: '',
        date: '',
        eventId: '',
        location: '',
        participants: [],
        sponsor: {
          displayName: '',
          email: '',
          photoURL: '',
          uid: '',
        },
        title: '',
      },
      isLoding: false,
    };

    this.getEvents = this.getEvents.bind(this);
    this.getEventsService = this.getEventsService.bind(this);
  }

  public async getEvents(
    year: string,
    month: string,
    date: string,
    eventId: string
  ) {
    this.setState({
      event: { ...this.state.event },
      isLoding: true,
    });
    const val = (await firebaseDb
      .ref(`events/${year}/${month}/${date}/${eventId}`)
      .once('value')).val();
    if (val) {
      this.setState({
        event: val,
        isLoding: false,
      });
    } else {
      this.setState({
        event: this.state.event,
        isLoding: false,
      });
    }
  }

  public async getEventsService() {
    const { year, month, date, eventId } = this.props.match.params;
    this.getEvents(year, month, date, eventId);
  }

  public pushUserPage(userInfo: IUserInfo) {
    this.props.history.push(`/users/${userInfo.uid}`);
  }

  public componentWillMount() {
    this.getEventsService();
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        {this.state.isLoding ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <EventPageFragment
            history={this.props.history}
            event={this.state.event}
            getEvents={this.getEventsService}
          />
        )}
      </div>
    );
  }
}
