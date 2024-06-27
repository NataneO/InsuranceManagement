import React from 'react';
import PolicyForm from './PolicyForm';
import { ModalProps } from '../types';
import PolicyDelete from './PolicyDelete';

interface PolicyModalContentProps extends ModalProps {
  mode: 'add' | 'edit' | 'del' | '';
}

const PolicyModalContent: React.FC<PolicyModalContentProps> = ({ mode, id, isOpen, onClose, onSave, title }) => {
  return (
    <>
      {mode === 'add' && (
        <PolicyForm
          isOpen={true}
          onClose={onClose}
          onSave={onSave}
          title={title}
          id={id}
          mode={mode}
        />
      )}
      {mode === 'edit' && (
        <PolicyForm
          isOpen={true}
          onClose={onClose}
          onSave={onSave}
          title={title}
          id={id}
          mode={mode}
        />
      )}
      {mode === 'del' && (
        <PolicyDelete 
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
        title={title}
        id={id}
        mode={mode}/>
      )}
    </>
  );
};

export default PolicyModalContent;
