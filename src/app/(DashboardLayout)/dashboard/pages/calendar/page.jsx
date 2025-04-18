"use client"
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
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

  const toggle = () => setModal(!modal);

  const handleSlotSelected = ({ start, end }) => {
    setNewEvent({ title: "", start, end });
    toggle();
  };

  const handleSaveEvent = () => {
    if (newEvent.title) {
      setEvents([...events, newEvent]);
      toggle();
    }
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
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            view={currentView}
            onView={(view) => setCurrentView(view)}
            defaultView="month"
            views={['month', 'week', 'day']}
            style={{ height: "100%" }}
            popup
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
    </>
  );
};

export default CalendarPage;