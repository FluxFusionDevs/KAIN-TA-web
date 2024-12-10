import { useEffect, useState } from 'react';
import { Button, CircularProgress, MenuItem, FormControl } from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';
import './accountsPage.css';
import { ThumbDown } from '@mui/icons-material';
import {
  getAllUsers,
  getPayments,
  updatePayment,
} from '../../handlers/APIController';
import { PaymentModel } from '../../models/paymentModel';
import Modal from '../../components/Modal';
import { UserModel } from '../../models/userModel';
import { EstablishmentModel } from '../../models/establishmentModel';

function AccountsPage({ imageUrl }: { imageUrl?: string }) {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalType, setModalType] = useState<string>('');
  const [filter, setFilter] = useState<string>('ALL');

  const handleReject = async (id: string) => {
    setIsLoading(true);
    const data = await updatePayment(id, 'FAILED');
    console.log(data);
    setIsLoading(false);
  };

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    const data = await updatePayment(id, 'COMPLETED');
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
        setIsLoading(true);
        const token = sessionStorage.getItem('authToken');
        if (!token) return;

        const data = await getAllUsers(token);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error parsing user:', error);
      }
    };

    if (!isLoading) {
      fetchEstablishment();
    }
  }, [filter]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setSelectedImage(imageUrl);
      };
    }
  }, [imageUrl]);

  if (isLoading) {
    return (
      <div style={styles.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="verification-wrapper">
      <div className="table">
        <div className="content">
          <div className="header row row-header">
            <div style={{ width: '100%' }}>Name</div>
            <div style={{ width: '100%' }}>Type</div>
            <div style={{ width: '100%' }}>Avatar</div>
            <div style={{ width: '100%' }}>Email</div>
            <div style={{ width: '100%' }}>Owned Establishment ID</div>
          </div>
          {users !== undefined
            ? users.map((item, rowIndex) => {
                const class_name = rowIndex % 2 === 0 ? 'row odd-row' : 'row';

                return (
                  <div
                    className={class_name}
                    onClick={() => setSelectedRow(rowIndex)}
                  >
                    <div>{item.name}</div>
                    <div>{item.type}</div>
                    <div>
                      <div>
                        {item.avatar ? (
                          item.avatar.includes(
                            'https://lh3.googleusercontent.com/'
                          ) ? (
                            <a
                              href="#"
                              onClick={() =>
                                handleImageClick(item.avatar, 'profile')
                              }
                            >
                              View
                            </a>
                          ) : (
                            <a
                              href="#"
                              onClick={() =>
                                handleImageClick(
                                  `${import.meta.env.VITE_API_URL}${item.avatar}`,
                                  'profile'
                                )
                              }
                            >
                              View
                            </a>
                          )
                        ) : (
                          <div>N/A</div>
                        )}
                      </div>
                    </div>
                    <div>{item.email}</div>
                    <div>
                      {item.owned_establishment
                        ? typeof item.owned_establishment === 'string'
                          ? item.owned_establishment
                          : (item.owned_establishment as EstablishmentModel)
                              .name
                        : 'N/A'}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          disableButtons
          header={
            modalType === 'profile' ? 'Profile Image' : 'Proof of Payment'
          }
          contentStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          content={
            <img src={selectedImage} alt="Preview" style={{ width: '50%' }} />
          }
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  table: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  selected_button: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  section: {
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    width: 150,
  },
  text_input: {
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  sub_header: {},
  sidebar: {
    backgroundColor: '#2673DD',
    width: 260,
    color: 'white',
  },
  selected_sidebar_button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  sidebar_button: {
    width: '100%',
    color: 'white',
    borderRadius: 20,
  },
  tab_button: {
    width: '100%',
    color: 'black',
  },
};

export default AccountsPage;
