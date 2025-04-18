import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "public/images/users/user1.jpg";
import user2 from "public/images/users/user2.jpg";
import user3 from "public/images/users/user3.jpg";
import user4 from "public/images/users/user4.jpg";
import user5 from "public/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Tree #A12",
    email: "Checked by: Yossi M.",
    project: "April 17, 2025",
    status: "done", // Healthy
    weeks: "48 weeks",
    budget: "Section A",
  },
  {
    avatar: user2,
    name: "Tree #B07",
    email: "Checked by: Dana R.",
    project: "April 16, 2025",
    status: "pending", // Needs Attention
    weeks: "32 weeks",
    budget: "Section B",
  },
  {
    avatar: user3,
    name: "Tree #C23",
    email: "Checked by: Amir S.",
    project: "April 15, 2025",
    status: "pending", // Needs Attention
    weeks: "60 weeks",
    budget: "Section C",
  },
  {
    avatar: user4,
    name: "Tree #A04",
    email: "Checked by: Noa T.",
    project: "April 14, 2025",
    status: "done", // Healthy
    weeks: "25 weeks",
    budget: "Section A",
  },
  {
    avatar: user5,
    name: "Tree #B19",
    email: "Checked by: David G.",
    project: "April 13, 2025",
    status: "pending", // Needs Attention
    weeks: "38 weeks",
    budget: "Section B",
  },
];

const ProjectTables = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Tree Status</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {"Trees's Health & Condition"}
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Tree No.#</th>
                <th>Last Checked Date</th>
                <th>Status</th>
                <th>Age</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <Image
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td>
                  <td>{tdata.weeks}</td>
                  <td>{tdata.budget}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
