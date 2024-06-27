import React from "react";
import PolicyForm from "./PolicyForm";
import PolicyDelete from "./PolicyDelete";
import { PolicyModalContentProps } from "../types";
import "../assets/styles/style.scss";

const PolicyModalContent: React.FC<PolicyModalContentProps> = ({
  mode,
  id,
  isOpen,
  onClose,
  onSave,
  title,
}) => {
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className={`content ${mode}`}>
            {(mode === "add" || mode === "edit") && (
              <PolicyForm
                isOpen={isOpen}
                onClose={onClose}
                onSave={onSave}
                title={title}
                id={id}
                mode={mode}
              />
            )}
            {mode === "del" && (
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
