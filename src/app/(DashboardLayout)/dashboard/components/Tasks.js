import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from 'reactstrap';

const FeedData = [
  {
    title: 'Irrigated Section A of the orchard',
    icon: 'bi bi-droplet-fill',
    color: 'info',
    date: 'Yesterday',
    id: 1,
  },
  {
    title: 'Apply organic mulch around young trees',
    icon: 'bi bi-tree-fill',
    color: 'secondary',
    date: 'To Do',
    id: 2,
  },
  {
    title: 'Pruned dead branches from older trees',
    icon: 'bi bi-scissors',
    color: 'warning',
    date: 'April 16, 2025',
    id: 3,
  },
  {
    title: 'Check weather forecast for next irrigation plan',
    icon: 'bi bi-cloud-sun-fill',
    color: 'primary',
    date: 'To Do',
    id: 4,
  },
  {
    title: 'Sprayed trees with natural pest control',
    icon: 'bi bi-bug-fill',
    color: 'danger',
    date: 'April 14, 2025',
    id: 5,
  },
  {
    title: 'Harvested mature avocados from Block B',
    icon: 'bi bi-basket3-fill',
    color: 'dark',
    date: 'April 13, 2025',
    id: 6,
  },
];

const Tasks = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Tasks</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Previously Submitted Tasks
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed) => (
            <ListGroupItem
              key={feed.id}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button className="rounded-circle me-3" size="sm" color={feed.color}>
                <i className={feed.icon} />
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">{feed.date}</small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Tasks;
