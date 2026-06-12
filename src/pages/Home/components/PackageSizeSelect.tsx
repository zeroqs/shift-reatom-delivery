import { Combobox, Input, InputBase, ScrollArea, Tabs, useCombobox } from '@mantine/core';
import { useState } from 'react';

import type {
  CustomPackageSize,
  CustomPackageSizeErrors,
  PackageSizeSelectProps
} from '../types/types';

import { getPackageFieldValue } from '../utils/formFields';
import { validateCustomPackageSize } from '../utils/packageSize';
import { CustomPackageSizeForm } from './CustomPackageSizeForm';
import { PackageTypeOption } from './PackageTypeOption';
import { PackageTypesEmpty } from './PackageTypesEmpty';

export const PackageSizeSelect = ({
  error,
  isError,
  value,
  packageTypes,
  onChange,
  onRetry
}: PackageSizeSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const [customValue, setCustomValue] = useState<string | null>(null);
  const [tab, setTab] = useState<string | null>('list');
  const [customSize, setCustomSize] = useState<CustomPackageSize>({
    height: '',
    length: '',
    width: '',
    weight: ''
  });
  const [customSizeErrors, setCustomSizeErrors] = useState<CustomPackageSizeErrors>({});

  const handleCustomSizeChange = (field: keyof CustomPackageSize, value: number | string) => {
    setCustomSize((current) => ({ ...current, [field]: String(value) }));
    setCustomSizeErrors((current) => ({ ...current, [field]: undefined }));
  };

  const applyCustomSize = () => {
    const { errors, packageValue } = validateCustomPackageSize(customSize);

    setCustomSizeErrors(errors);

    if (!packageValue) return;

    setCustomValue(`${packageValue.length}x${packageValue.width}x${packageValue.height} см`);
    onChange(packageValue);
    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(optionValue) => {
        const packageType = packageTypes.find((item) => item.name === optionValue);

        if (packageType) {
          setCustomValue(null);
          onChange(getPackageFieldValue(packageType));
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          pointer
          component='button'
          error={error}
          label='Размер посылки'
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents='none'
          size='md'
          type='button'
          onClick={() => combobox.toggleDropdown()}
        >
          {(customValue ?? value) || <Input.Placeholder>Введите размер посылки</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Tabs value={tab} onChange={setTab}>
          <Tabs.List grow>
            <Tabs.Tab value='list'>Список</Tabs.Tab>
            <Tabs.Tab value='custom'>Свои размеры</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel pt='xs' value='list'>
            <Combobox.Options>
              <ScrollArea.Autosize mah={300} type='scroll'>
                {packageTypes.map((packageType) => (
                  <Combobox.Option key={packageType.id} value={packageType.name}>
                    <PackageTypeOption packageType={packageType} />
                  </Combobox.Option>
                ))}
                {(isError || packageTypes.length === 0) && (
                  <PackageTypesEmpty isError={isError} onRetry={onRetry} />
                )}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Tabs.Panel>

          <Tabs.Panel pt='xs' value='custom'>
            <CustomPackageSizeForm
              errors={customSizeErrors}
              value={customSize}
              onChange={handleCustomSizeChange}
              onSubmit={applyCustomSize}
            />
          </Tabs.Panel>
        </Tabs>
      </Combobox.Dropdown>
    </Combobox>
  );
};
