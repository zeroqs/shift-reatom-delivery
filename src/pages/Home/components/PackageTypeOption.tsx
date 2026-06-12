import { Text, Title } from '@mantine/core';

import type { PackageTypeOptionProps } from '../types/types';

import { getPackageTypeDimensions } from '../utils/packageSize';

import styles from '../styles.module.css';

export const PackageTypeOption = ({ packageType }: PackageTypeOptionProps) => (
  <div className={styles.packageTypeOption}>
    <Title order={5}>{packageType.name}</Title>
    <Text c='dimmed' size='md'>
      {getPackageTypeDimensions(packageType)}
    </Text>
  </div>
);
