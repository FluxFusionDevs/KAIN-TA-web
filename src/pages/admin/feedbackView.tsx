import { useEffect, useState } from 'react';

import './feedbackView.css';
import { EstablishmentModel } from '../../models/establishmentModel';
import { getEstablishment } from '../../handlers/APIController';
import { UserModel } from '../../models/userModel';
import SuperTable, { CellType, SuperCell } from '../../components/SuperTable';

function FeedbackView() {
  const [establishment, setEstablishment] = useState<EstablishmentModel>();
  const [tableData, setTableData] = useState<SuperCell[][]>();

  useEffect(() => {
    // Set table data
    const headers: SuperCell[] = [
      { type: 'ID', value: '_id' },
      { type: 'HEADER', value: 'User ID' },
      { type: 'HEADER', value: 'Comment' },
      { type: 'HEADER', value: 'Rating' },
    ];

    if (establishment !== undefined) {
      const data: SuperCell[][] = [
        headers, // Add the headers as the first row
        ...establishment.ratings.map((item) => [
          { type: 'ID' as CellType, value: item._id as string },
          { type: 'VALUE' as CellType, value: item._id as string },
          { type: 'VALUE' as CellType, value: item.comment as string },
          { type: 'VALUE' as CellType, value: `${item.rating} / 5` },
        ]),
      ];

      setTableData(data);
    }
  }, [establishment]);

  useEffect(() => {
    const fetchEstablishment = async () => {
      const user = sessionStorage.getItem('user');
      if (user === undefined || user === null)
        return console.warn('User Tokens not Initialized');

      const user_parsed: UserModel = JSON.parse(user) as UserModel;
      console.log(user_parsed);

      if (user_parsed === null || user_parsed === undefined) return;

      try {
        const user_parsed: UserModel = JSON.parse(user) as UserModel;

        if (!user_parsed || !user_parsed.owned_establishment) {
          console.warn('Owned establishment is not available');
          return;
        }

        // Now we can safely pass the owned_establishment to getEstablishment
        const establishment = await getEstablishment(
          typeof user_parsed.owned_establishment === 'string'
            ? user_parsed.owned_establishment
            : user_parsed.owned_establishment._id
        );
        setEstablishment(establishment);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    };

    fetchEstablishment();
  }, []);

  return (
    <div className="wrapper">
      <SuperTable data={tableData ?? []} />
    </div>
  );
}

export default FeedbackView;
