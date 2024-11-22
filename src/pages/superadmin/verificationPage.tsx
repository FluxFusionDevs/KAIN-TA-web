import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";

import './verificationPage.css';
import { EstablishmentModel } from "../../models/establishmentModel";
import { getEstablishments, updateEstablishmentStatus } from "../../handlers/APIController";
import Modal from "../../components/Modal";

enum Tab {
  Users,
  Establishments,
  Food,
}

function VerificationPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [establishments, setEstablishments] = useState<EstablishmentModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleReject = async (id: string) => {
    setIsLoading(true);
    await updateEstablishmentStatus(id, "REJECTED");
    setIsLoading(false);
  }

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    await updateEstablishmentStatus(id, "APPROVED");
    setIsLoading(false);
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const fetchEstablishment = async () => {
      try {
        const data = await getEstablishments();      
        const filtered = data.filter(est => est.status === "PENDING");
        setEstablishments(filtered);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }

    if (!isLoading) {
      fetchEstablishment();
    }
  }, [isLoading])

  return (
    <div className="verification-wrapper">
      <div className="table">
        <div className="content">
          <div className="header row row-header">
            <div style={{ width: "100%" }}>Name</div>
            <div style={{ width: "100%" }}>Type</div>
            <div style={{ width: "100%" }}>Profile Image</div>
            <div style={{ width: "100%" }}>Documents</div>
            <div style={{ width: "100%" }}>Action</div>
          </div>
          {establishments !== undefined ? 
            establishments.map((item, rowIndex) => {
              const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";

              return (
                <div className={class_name} onClick={() => setSelectedRow(rowIndex)} key={item._id}>
                  <div>{item.name}</div>
                  <div>{item.quisines.join(', ')}</div>
                  <div>
                    {item.image === "" ? 
                      <div>No Image</div> : 
                      <span onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${item.image}`)}>See Image</span>
                    }
                  </div>
                  <div>
                    {item.documents.map((doc, index) => (
                      <span key={index} onClick={() => handleImageClick(`${import.meta.env.VITE_API_URL}${doc.image}`)}>Click to View</span>
                    ))}
                  </div>
                  <div>
                    {selectedRow === rowIndex ? (
                      <div className="action-buttons">
                        <div className="reject-button">
                          <Button 
                            disabled={isLoading}
                            onClick={() => handleReject(item._id)}
                            sx={{ backgroundColor: "#dc3545" }}
                            className="button" 
                            variant="contained" 
                            startIcon={<ThumbDown />}>
                            Reject
                          </Button>
                        </div>
                        <div className="approve-button">
                          <Button 
                            disabled={isLoading}
                            onClick={() => handleApprove(item._id)}
                            sx={{ backgroundColor: "#28a745" }}
                            className="button"
                            variant="contained" 
                            startIcon={<ThumbUp />}>
                            Approve
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })
          : null} 
        </div>
      </div>
      {isModalOpen && (
        <Modal 
        disableButtons
          header="Image Preview" 
          contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          content={<img src={selectedImage} alt="Preview" style={{ width: '50%' }} />} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
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

export default VerificationPage;
