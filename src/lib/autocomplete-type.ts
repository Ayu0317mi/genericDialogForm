// Define a custom type that extends the default react-select option

export interface AutoCompleteType {
    label: string;
    value: string;
    isNew?: boolean; // Allow the __isNew__ property
  }


  