import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";

import './accountsPage.css'
import { ThumbDown } from "@mui/icons-material";
import { getPayments } from "../../handlers/APIController";
import { PaymentModel } from "../../models/paymentModel";

function AccountsPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentModel[]>([]);

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const data = await getPayments();      
        const filtered = data.filter(payment => payment.status === "PENDING");
        setPayments(filtered);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }

    fetchEstablishment();
  }, [])

  return (
    <div className="verification-wrapper">
      <div className="table">
            <div className="content">
              <div className="header row row-header">
                <div style={{ width: "100%" }}>Name</div>
                <div style={{ width: "100%" }}>Type</div>
                <div style={{ width: "100%" }}>Profile Image</div>
                <div style={{ width: "100%" }}>Price</div>
                <div style={{ width: "100%" }}>Documents</div>
                <div style={{ width: "100%" }}>Action</div>
              </div>
              {payments !== undefined ?
                payments.map((item, rowIndex) => {
                  const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";

                  return (<div className={class_name} onClick={() => setSelectedRow(rowIndex)}>
                    <div>{item.user.name}</div>
                    <div>{item.type}</div>
                    <div>
                      <div>
                         {
                          (item.user.avatar === null) || (item.user.avatar === "") ? 
                            <a href={`${import.meta.env.VITE_API_URL}${item.user.avatar}`} target="_blank">Click to View</a> :
                            <div>No Image</div>
                         }
                       </div>
                    </div>
                    <div>{item.amount} PHP</div>
                    <div>
                      documents here
                    </div>
                    <div>
                      {selectedRow === rowIndex ? (
                        <div className="action-buttons">
                        <div className="reject-button">
                          <Button 
                            sx={{
                              backgroundColor: "#dc3545"
                            }}
                            className="button" 
                            variant="contained" 
                            startIcon={<ThumbDown />}>
                            Reject
                          </Button>
                        </div>
                        <div className="approve-button">
                          <Button 
                            sx={{
                              backgroundColor: "#28a745",
                            }}
                            className="button"
                            variant="contained" 
                            startIcon={<ThumbUp />}>
                            Approve
                          </Button>
                        </div>
                      </div>
                      ) : null}
                    </div>
                  </div>)
                })
                : null} 
            </div>
      </div>
    </div>
  );
}

const styles = {
  table: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  selected_button: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  section: {
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    width: 150,
  },
  text_input: {
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
  },
  sub_header: {},
  sidebar: {
    backgroundColor: "#2673DD",
    width: 260,
    color: "white",
  },
  selected_sidebar_button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  sidebar_button: {
    width: "100%",
    color: "white",
    borderRadius: 20
  },
  tab_button: {
    width: "100%",
    color: "black",
  },
};

export default AccountsPage;
