import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
  name: {
    id: 'name',
    label: 'Nome',
    validationMessage: {
      maxlength: 10
    }
  },
  active: {
    id: 'active',
    label: 'Ativo'
  }
};

export  default fieldsOptions;
