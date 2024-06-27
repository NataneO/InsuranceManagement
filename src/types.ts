export interface Policy {
  id: number;
  numero: number;
  valor_premio: number;
  segurado: {
    nome: string;
    email: string;
    cpf_cnpj: string;
  };
  coberturas: {
    nome: string;
    valor: number;
  }[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  id?: number;
  mode: string;
}

export interface PolicyModalContentProps extends ModalProps {
  mode: "add" | "edit" | "del" | "";
}

export interface PolicyDetailsParams {
  id: number;
}
