import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import './accountsPage.css';
import { getAllUsers, updatePayment } from '../../handlers/APIController';
import Modal from '../../components/Modal';
import { UserModel } from '../../models/userModel';
import { EstablishmentModel } from '../../models/establishmentModel';

function AccountsPage({ imageUrl }: { imageUrl?: string }) {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalType, setModalType] = useState<string>('');

  const handleImageClick = (imageUrl: string, type: string) => {
    setSelectedImage(imageUrl);
    setModalType(type);
    setIsModalOpen(true);
  };

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
                  <div className={class_name}>
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
