import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";
import "./accountsPage.css";
import { ThumbDown } from "@mui/icons-material";
import { getPayments, updatePayment } from "../../handlers/APIController";
import { PaymentModel } from "../../models/paymentModel";
import { EstablishmentModel } from "../../models/establishmentModel";
import { UserModel } from "../../models/userModel";
import Modal from "../../components/Modal";

function AccountsPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");

  const handleReject = async (id: string) => {
    setIsLoading(true);
    const data = await updatePayment(id, "FAILED");
    console.log(data);
    setIsLoading(false);
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    const data = await updatePayment(id, "COMPLETED");
    console.log(data);
    setIsLoading(false);
  };

  const handleImageClick = (imageUrl: string, type: string) => {
    setSelectedImage(imageUrl);
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const data = await getPayments();
        const filtered = data.filter((payment) => payment.status === "PENDING");
        setPayments(filtered);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    };

    if (!isLoading) {
      fetchEstablishment();
    }
  }, [isLoading]);

  return (
    <div className="verification-wrapper">
      <div className="table">
        <div className="content">
          <div className="header row row-header">
            <div style={{ width: "100%" }}>Name</div>
            <div style={{ width: "100%" }}>Type</div>
            <div style={{ width: "100%" }}>Profile Image</div>
            <div style={{ width: "100%" }}>Price</div>
            <div style={{ width: "100%" }}>Proof of Payment</div>
            <div style={{ width: "100%" }}>Action</div>
          </div>
          {payments !== undefined
            ? payments.map((item, rowIndex) => {
                const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";

                return (
                  <div
                    className={class_name}
                    onClick={() => setSelectedRow(rowIndex)}
                  >
                    <div>
                      {typeof item.user === "object"
                        ? item.user.name
                        : item.user}
                    </div>
                    <div>
                      <div>
                        {typeof item.user === "object" &&
                        (!item.user.avatar || item.user.avatar === "") ? (
                          <div>No Image</div>
                        ) : (
                          typeof item.user === "object" && (
                            <a
                              href="#"
                              onClick={() =>
                                handleImageClick(
                                  `${import.meta.env.VITE_API_URL}${
                                    item.user.avatar
                                  }`,
                                  "profile"
                                )
                              }
                            >
                              Click to View
                            </a>
                          )
                        )}
                      </div>
                    </div>
                    <div>{item.amount} PHP</div>
                    <div>
                      <a
                        href="#"
                        onClick={() =>
                          handleImageClick(
                            `${import.meta.env.VITE_API_URL}${
                              item.proofOfPayment
                            }`,
                            "proof"
                          )
                        }
                      >
                        Click to View
                      </a>
                    </div>
                    <div>
                      {selectedRow === rowIndex ? (
                        <div className="action-buttons">
                          <div className="reject-button">
                            <Button
                              sx={{
                                backgroundColor: "#dc3545",
                              }}
                              disabled={isLoading}
                              onClick={() => handleReject(item._id)}
                              className="button"
                              variant="contained"
                              startIcon={<ThumbDown />}
                            >
                              Reject
                            </Button>
                          </div>
                          <div className="approve-button">
                            <Button
                              onClick={() => handleApprove(item._id)}
                              sx={{
                                backgroundColor: "#28a745",
                              }}
                              disabled={isLoading}
                              className="button"
                              variant="contained"
                              startIcon={<ThumbUp />}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          header={
            modalType === "profile" ? "Profile Image" : "Proof of Payment"
          }
          contentStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          content={
            <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />
          }
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
const styles = {
  table: {
    maxHeight: "100%",
    overflowY: "auto",
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  sidebar_button: {
    width: "100%",
    color: "white",
    borderRadius: 20,
  },
  tab_button: {
    width: "100%",
    color: "black",
  },
};

export default AccountsPage;
