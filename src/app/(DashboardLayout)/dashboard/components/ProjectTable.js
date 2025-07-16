import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import user1 from "public/images/users/user1.jpg";
import { getDatabase, ref, onValue, update } from "firebase/database";

const ProjectTables = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const db = getDatabase();
    const statusRef = ref(db, "Tree_status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTreeData(data);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateCheckDates = async () => {
    const db = getDatabase();
    const statusRef = ref(db, "Tree_status");
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const formatDate = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    await update(statusRef, {
      last_check_date: formatDate(today),
      next_check_date: formatDate(nextMonth),
    });
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      case "stable":
        return "➖";
    }
  };

  //const username = typeof window !== "undefined" ? sessionStorage.getItem("user") : "User";
  useEffect(() => {
    // Fetch user name from session storage
    const userName = sessionStorage.getItem("user");
    if (userName) {
      const userObj = JSON.parse(userName);
      setUserName(userObj.userId || "User");
    }
  }, []);


  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Tree Status</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {"Tree's Health & Condition"}
        </CardSubtitle>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <Table className="text-nowrap mt-3 align-middle" borderless>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Last Check</th>
                  <th>Next Check</th>
                  <th>Status</th>
                  <th>Trend</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <Image
                        src={user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{userName}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{treeData?.last_check_date}</td>
                  <td>{treeData?.next_check_date}</td>
                  <td>
                    {treeData?.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td>
                  <td>{getTrendIcon(treeData?.trend)}</td>
                  <td>
                    <Button color="primary" size="sm" onClick={updateCheckDates}>
                      Update Check Dates
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
