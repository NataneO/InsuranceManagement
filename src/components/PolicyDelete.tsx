import React from 'react';
import { ModalProps } from '../types';
import axios from 'axios';


const PolicyDelete: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, id, mode }) => {

    const handleDelete = async () => {
        try {
          await axios.delete(`/api/apolices/${id}`);
          onSave();
        } catch (error) {
          console.error('Error deleting policy:', error);
        }
      };

  return (
    <>
    {title}
     <div>
        Voce tem certeza que deseja deletar esse registro?
        <div className="modal-actions">
                  <button type="button" onClick={handleDelete}>Deletar</button>
                  <button type="button" onClick={onClose}>Cancelar</button>
                </div>
     </div>
    </>
  );
};

export default PolicyDelete;
