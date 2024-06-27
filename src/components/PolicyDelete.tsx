import { ModalProps } from "../types";
import { deletePolicy } from "../services/policyService";

const PolicyDelete = ({
  isOpen,
  onClose,
  onSave,
  title,
  id,
}: ModalProps) => {

  const handleDelete = async () => {
    try {
      await deletePolicy(id as number);
      onSave();
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  if (!isOpen) return null;
  return (
    <>
     <h4> {title} </h4> 
      <div>
        Você tem certeza que deseja deletar esse registro?
        <div className="modal-actions">
          <button type="button" onClick={handleDelete}>
            Deletar
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default PolicyDelete;
