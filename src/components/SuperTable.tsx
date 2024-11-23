import { Button } from "@mui/material";
import React, { useState } from "react";
import "./SuperTable.css";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Modal from "./Modal";

export type CellType = "IMAGE" | "VALUE" | "HEADER" | "ID";

export type SuperCell = {
	type: CellType;
	value: string;
}

interface SuperTableProps {
  data: SuperCell[][];
  buttons?: (data_id: string) => JSX.Element[];
}

const SuperTable: React.FC<SuperTableProps> = ({ data, buttons }) => {
	const [selected, setSelected] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");

	const handleImageClick = (imageUrl: string, type: string) => {
    setSelectedImage(imageUrl);
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="table">
			{isModalOpen && (
        <Modal
          disableButtons
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

      <div className="content">
        {data.map((item, index) => {
					const className = (index % 2) === 0 ? "row" : "row odd-row";
					const selectedClass = selected === index ? "selected" : "";
					return <div key={index} className={[className].join(" ")} onClick={() => setSelected(index)}>
						{item.map((item2, index2) => {
							if (item2.type !== "ID") {
								const headerClass = item2.type === "HEADER" ? "header" : "";
							const cellClasses = ["cell", selectedClass, headerClass].join(" ");

							if (item2.type === 'IMAGE') {
								return <div className={cellClasses}>
									<a href="#" 
										onClick={() =>
											handleImageClick(`${import.meta.env.VITE_API_URL}${item2.value}`,
					            "profile"
					          )
					        }>
										Click to View
									</a>
								</div>	
							}

							return <div className={cellClasses}>{item2.value}</div>
							}
						})}

						{buttons !== undefined && index !== 0 && selected !== index ? (
							<div className="cell"></div>
						) : null}

						{buttons !== undefined && buttons.length > 0 && index !== 0 && selected === index ? (
							<div className={["action-buttons", "cell", selected === index ? "selected" : ""].join(" ")} style={{flex: 1}}>
								{buttons(item.find(i => i.type === "ID")?.value as string)}
							</div>
							) : null }
					</div>;
				})
				}
      </div>
    </div>
  );
};

export default SuperTable;
