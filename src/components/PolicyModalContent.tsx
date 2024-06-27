import React from 'react';
import PolicyForm from './PolicyForm';
import PolicyDelete from './PolicyDelete';
import { ModalProps } from '../types';

interface PolicyModalContentProps extends ModalProps {
  mode: 'add' | 'edit' | 'del' | '';
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    width: '70%',
    maxWidth: '500px', 
  },
};

const PolicyModalContent: React.FC<PolicyModalContentProps> = ({ mode, id, isOpen, onClose, onSave, title }) => {
  return (
    <>
      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            {mode === 'add' && (
              <PolicyForm
                isOpen={isOpen}
                onClose={onClose}
                onSave={onSave}
                title={title}
                id={id}
                mode={mode}
              />
            )}
            {mode === 'edit' && (
              <PolicyForm
                isOpen={isOpen}
                onClose={onClose}
                onSave={onSave}
                title={title}
                id={id}
                mode={mode}
              />
            )}
            {mode === 'del' && (
              <PolicyDelete 
                isOpen={isOpen}
                onClose={onClose}
                onSave={onSave}
                title={title}
                id={id}
                mode={mode}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PolicyModalContent;
