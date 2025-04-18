"use client"
import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { BiQuestionMark } from 'react-icons/bi';
import { FaTree } from 'react-icons/fa';
import { GiWaterDrop } from 'react-icons/gi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Row>
      <Col md="8" className="mx-auto">
        <Card>
          <CardBody>
            <CardTitle tag="h5" className="mb-3">
              <BiQuestionMark className="me-2" />
              Frequently Asked Questions (FAQ)
            </CardTitle>

            <Accordion open={activeIndex} toggle={toggle}>
              {/* Question 1 */}
              <AccordionItem>
                <AccordionHeader targetId="1">
                  <FaTree className="me-2" />
                  How do I know if my avocado tree is healthy?
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  You can check the overall appearance of the leaves, branches, and fruits. If the tree shows signs of wilting or yellowing leaves, it might be a sign of a nutrient imbalance or disease. Regular monitoring of soil health and using our sensors for real-time data can also help.
                </AccordionBody>
              </AccordionItem>

              {/* Question 2 */}
              <AccordionItem>
                <AccordionHeader targetId="2">
                  <GiWaterDrop className="me-2" />
                  How often should I water my avocado trees?
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  Avocado trees require deep watering at least once a week during the dry season. However, it{"'"}s important not to overwater, as this can lead to root rot. Use our soil moisture sensors for accurate watering schedules based on real-time data.
                </AccordionBody>
              </AccordionItem>

              {/* Question 3 */}
              <AccordionItem>
                <AccordionHeader targetId="3">
                  <FaTree className="me-2" />
                  What{"'"}s the best time to harvest avocados?
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  The best time to harvest avocados is when the fruit reaches full size and has a slightly soft texture when gently squeezed. This typically occurs 7-12 months after flowering, depending on the variety.
                </AccordionBody>
              </AccordionItem>

              {/* Question 4 */}
              <AccordionItem>
                <AccordionHeader targetId="4">
                  <BiQuestionMark className="me-2" />
                  Can I use organic fertilizers for my avocado trees?
                </AccordionHeader>
                <AccordionBody accordionId="4">
                  Yes! Organic fertilizers such as compost, manure, and fish emulsion are great for avocado trees. They help improve soil health and provide essential nutrients without the use of chemicals.
                </AccordionBody>
              </AccordionItem>

              {/* Question 5 */}
              <AccordionItem>
                <AccordionHeader targetId="5">
                  <GiWaterDrop className="me-2" />
                  How do I handle pests in my avocado orchard?
                </AccordionHeader>
                <AccordionBody accordionId="5">
                  We recommend using natural pest control methods, such as neem oil or beneficial insects like ladybugs. You can also monitor pest levels through regular inspections and reports from your orchard{"'"}s sensors.
                </AccordionBody>
              </AccordionItem>

              {/* Question 6 */}
              <AccordionItem>
                <AccordionHeader targetId="6">
                  <FaTree className="me-2" />
                  How do I improve soil drainage in my orchard?
                </AccordionHeader>
                <AccordionBody accordionId="6">
                  Improving soil drainage can be done by adding organic matter like compost to the soil, creating raised beds, or installing proper irrigation systems. You can monitor soil moisture with our sensor system to prevent waterlogging.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default FAQ;
