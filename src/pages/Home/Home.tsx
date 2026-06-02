import { Button, Image, Select, TextInput, Title } from '@mantine/core';
import { ArrowRight } from 'lucide-react';

import styles from './styles.module.css';

export const Home = () => (
  <main className={styles.container}>
    <div className={styles.row}>
      <div className={styles.block}>
        <Title order={3}>Рассчитать доставку</Title>
        <div className={styles.controls}>
          <Select
            data={['React', 'Angular', 'Vue', 'Svelte']}
            label='Город отправки'
            placeholder='Выберите город'
            size='md'
          />

          <Select
            data={['React', 'Angular', 'Vue', 'Svelte']}
            label='Город назначения'
            placeholder='Выберите город'
            size='md'
          />

          <Select
            data={['React', 'Angular', 'Vue', 'Svelte']}
            label='Размер посылки'
            placeholder='Введите размер посылки'
            size='md'
          />
        </div>

        <Button fullWidth radius={30} rightSection={<ArrowRight />} size='lg'>
          Рассчитать
        </Button>
      </div>

      <div className={styles.banner}>
        <Image radius='md' src='/images/banner.png' />
      </div>
    </div>

    <div className={styles.row}>
      <div className={`${styles.block} ${styles.bottomBlock} ${styles.friendBlock}`}>
        <div className={styles.friendContent}>
          <Title order={3}>Бесплатная доставка</Title>
          <p>за приведенного друга</p>
        </div>
        <Image className={styles.friendImage} radius='md' src='/images/handshake.png' w={330} />
      </div>

      <div className={`${styles.block} ${styles.bottomBlock}`}>
        <Title order={3}>Отследить посылку</Title>
        <div className={styles.trackControls}>
          <TextInput className={styles.trackInput} placeholder='Номер заказа' size='md' />
          <Button radius={30} size='md'>
            Найти
          </Button>
        </div>
      </div>
    </div>
  </main>
);
