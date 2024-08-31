//components/ui/auto-complete-select.tsx
import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { FormField, FormItem, FormLabel } from './form';
import { AutoCompleteType } from '@/lib/autocomplete-type';
import { loadInputValue, addInputValue } from '../../app/server-actions';
import { defaultValues as importedDefaultValues} from '@/lib/defaultValues';

// auto-complete defaultValues object
const defaultValues = importedDefaultValues;

interface AutoCompleteSelectProps {
  name: string;
  inputType: keyof typeof defaultValues;
  control: any;
  label: string;
  placeholder: string;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({ name, inputType, control, label, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <AsyncCreatableSelect<AutoCompleteType>
            loadOptions={(inputValue: string) => loadInputValue(inputType, inputValue)}
            defaultOptions
            onChange={(selectedOption: AutoCompleteType | null) => {
              if (selectedOption?.isNew) {
                addInputValue(inputType, selectedOption.value);
                field.onChange(selectedOption.value);
              } else {
                field.onChange(selectedOption?.value);
              }
            }}
            placeholder={placeholder}
            value={field.value ? { label: field.value, value: field.value } : null}
            isClearable
          />
        </FormItem>
      )}
    />
  );
};

export default AutoCompleteSelect;
