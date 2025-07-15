"use client"
import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { parseISO } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ref, push, onValue, get, remove, update } from "firebase/database";
import { database } from '@/lib/firebaseConfig';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
  FormGroup,
} from "reactstrap";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);

  

  const toggle = () => setModal(!modal);

  // const handleSlotSelected = ({ start, end }) => {
  //   setNewEvent({ title: "", start, end });
  //   toggle();
  // };

  const handleSlotSelected = ({ start, end }) => {
    setNewEvent({
      title: "",
      start: new Date(start),
      end: new Date(end)
    });
    toggle();
  };

  const handleSaveEvent = async () => {
    
    try {
      if (!newEvent.title || !newEvent.start || !newEvent.end) {
        alert("Please complete all fields.");
        return;
      }

      const localDate = newEvent.start;
      const start = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), 0, 0, 0);
      const end = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), 23, 59, 59);
      const dateKey = format(newEvent.start, "yyyy-MM-dd");

      // Save to Firebase
      const eventsRef = ref(database, `calendarEvents/${dateKey}`);
      await push(eventsRef, {
        title: newEvent.title,
        start: start.toISOString(),
        end: end.toISOString(),
        done: false
      });

      toggle(); // close modal
      setNewEvent({ title: "", start: null, end: null }); // reset input
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      const eventDate = format(new Date(selectedEvent.start), "yyyy-MM-dd");
      console.log(eventDate);
      const eventsRef = ref(database, `calendarEvents/${eventDate}`);

      //const dbRef = ref(database, `calendarEvents/${eventDate}`);
      
      // Get existing notes
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();

        const eventKeyToDelete = Object.keys(data).find(
          key =>
            data[key].title === selectedEvent.title &&
            data[key].start === selectedEvent.start.toISOString()
        );

        if (eventKeyToDelete) {
          const deleteRef = ref(database, `calendarEvents/${eventDate}/${eventKeyToDelete}`);
          await remove(deleteRef);
        }
      }

      // Update local state
      setEvents(events.filter(e => e !== selectedEvent));
      setSelectedEvent(null);
      setActionModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleMarkAsDone = async () => {
    if (!selectedEvent) return;

    try {
      const dateKey = format(new Date(selectedEvent.start), "yyyy-MM-dd");
      const dbRef = ref(database, `calendarEvents/${dateKey}`);

      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const notes = snapshot.val();
        const noteEntry = Object.entries(notes).find(
          ([, note]) =>
            note.title === selectedEvent.title &&
            note.start === selectedEvent.start.toISOString()
        );

        if (noteEntry) {
          const [noteId] = noteEntry;
          const updateRef = ref(database, `calendarEvents/${dateKey}/${noteId}`);
          await update(updateRef, { done: true });
        }
      }

      setActionModalOpen(false);
    } catch (error) {
      console.error("Error marking event as done:", error);
    }
  };


  useEffect(() => {
    const eventsRef = ref(database, "calendarEvents");

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedEvents = [];

        Object.entries(data).forEach(([dateKey, notes]) => {
          Object.values(notes).forEach((note) => {
            loadedEvents.push({
              ...note,
              start: new Date(note.start || dateKey),
              end: new Date(note.end || dateKey),
            });
          });
        });

        setEvents(loadedEvents);
      } else {
        setEvents([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const getEventStyle = (event) => {
    const now = new Date();
    const isDone = event.done;
    const isOverdue = !isDone && new Date(event.end) < now;

    let backgroundColor = "#007bff"; // default: blue

    if (isDone) backgroundColor = "#28a745"; // green
    else if (isOverdue) backgroundColor = "#dc3545"; // red

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
      },
    };
  };



  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Farm Activity Calendar</CardTitle>
          <CardSubtitle className="text-muted mb-3" tag="h6">
            Select a date to log notes, tasks, or observations
          </CardSubtitle>
          <div style={{ height: "80vh" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSlotSelected}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setActionModalOpen(true);
            }}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            view={currentView}
            onView={(view) => setCurrentView(view)}
            defaultView="month"
            views={['month', 'week', 'day']}
            style={{ height: "100%" }}
            popup
            eventPropGetter={getEventStyle}
            />
          </div>
        </CardBody>
      </Card>

      {/* Modal for adding note */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Note</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="noteTitle">Note</Label>
            <Input
              id="noteTitle"
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g. Fertilizer applied"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEvent}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal for completing or deleting notes */}
      <Modal isOpen={actionModalOpen} toggle={() => setActionModalOpen(false)}>
        <ModalHeader toggle={() => setActionModalOpen(false)}>
          Task Options
        </ModalHeader>
        <ModalBody>
          <p>What would you like to do with this note?</p>
          <p><strong>{selectedEvent?.title}</strong></p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleMarkAsDone}>
            Mark as Done
          </Button>
          <Button color="danger" onClick={handleDeleteEvent}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setActionModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CalendarPage;