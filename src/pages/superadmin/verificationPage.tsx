import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";

import './verificationPage.css';
import { EstablishmentModel } from "../../models/establishmentModel";
import { getEstablishments, updateEstablishmentStatus } from "../../handlers/APIController";
import Modal from "../../components/Modal";
import SuperTable, { CellType, SuperCell } from "../../components/SuperTable";

function VerificationPage() {
  // const [selectedRow, setSelectedRow] = useState<number>(0);
  const [establishments, setEstablishments] = useState<EstablishmentModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage] = useState<string>("");
  const [tableData, setTableData] = useState<SuperCell[][]>();

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

  // const handleImageClick = (imageUrl: string) => {
  //   setSelectedImage(imageUrl);
  //   setIsModalOpen(true);
  // }

  useEffect(() => {
    // Set table data
    const headers: SuperCell[] = [
      { type: 'ID', value: '_id' },
      { type: 'HEADER', value: 'Name' },
      { type: 'HEADER', value: 'Type' },
      { type: 'HEADER', value: 'Profile Image' },
      { type: 'HEADER', value: 'Documents' },
      { type: 'HEADER', value: 'Action' },
    ];

    if (establishments !== undefined) {
      const data: SuperCell[][] = [
        headers, // Add the headers as the first row
        ...establishments.map((item) => [
          { type: 'ID' as CellType, value: item._id as string },
          { type: 'VALUE' as CellType, value: item.name as string },
          { type: 'VALUE' as CellType, value: item.quisines.join(', ') as string },
          { type: 'IMAGE' as CellType, value: `${import.meta.env.VITE_API_URL}${item.image}` },
        ]),
      ];

      setTableData(data);
    }
  }, [establishments]);

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
      <SuperTable 
        data={tableData ?? []} 
        buttons={(row_id) => [
          <Button 
            disabled={isLoading}
            onClick={() => handleReject(row_id)}
            sx={{ backgroundColor: "#dc3545" }}
            className="button" 
            variant="contained" 
            startIcon={<ThumbDown />}>
            Reject
          </Button>,
          <Button 
            disabled={isLoading}
            onClick={() => handleApprove(row_id)}
            sx={{ backgroundColor: "#28a745" }}
            className="button"
            variant="contained" 
            startIcon={<ThumbUp />}>
            Approve
          </Button>
        ]}
        />
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

// const styles = {
//   table: {
//     maxHeight: '100%',
//     overflowY: 'auto',
//   },
//   selected_button: {
//     borderBottomWidth: 2,
//     borderBottomColor: "black",
//   },
//   section: {
//     marginTop: 5,
//   },
//   button: {
//     borderRadius: 25,
//     width: 150,
//   },
//   text_input: {
//     width: "100%",
//   },
//   header: {
//     fontWeight: "bold",
//     fontSize: 36,
//   },
//   sub_header: {},
//   sidebar: {
//     backgroundColor: "#2673DD",
//     width: 260,
//     color: "white",
//   },
//   selected_sidebar_button: {
//     backgroundColor: 'rgba(0, 0, 0, 0.2)'
//   },
//   sidebar_button: {
//     width: "100%",
//     color: "white",
//     borderRadius: 20
//   },
//   tab_button: {
//     width: "100%",
//     color: "black",
//   },
// };

export default VerificationPage;
