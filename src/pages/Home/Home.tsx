import { Anchor, Button, Image, Paper, Select, TextInput, Title } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';
import { ArrowRight } from 'lucide-react';

import type { DeliveryForm } from './model';

import styles from './styles.module.css';

interface HomeModel {
  cities: Array<string>;
  form: DeliveryForm;
  tips: {
    senderCities: Array<string>;
    receiverCities: Array<string>;
  };
}

interface Props {
  model: HomeModel;
}

interface CityTipsProps {
  cities: Array<string>;
  onSelectCity: (city: string) => void;
}

const CityTips = ({ cities, onSelectCity }: CityTipsProps) => (
  <div className={styles.tips}>
    {cities.map((city) => (
      <Anchor
        key={city}
        className={styles.tip}
        component='button'
        type='button'
        underline='always'
        onClick={() => onSelectCity(city)}
      >
        {city}
      </Anchor>
    ))}
  </div>
);

export const Home = reatomComponent(({ model }: Props) => {
  const { form } = model;
  const sendingCityField = bindField(form.fields.senderPoint);
  const destinationCityField = bindField(form.fields.receiverPoint);

  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <Paper
          className={styles.block}
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            form.submit();
          }}
        >
          <Title order={3}>Рассчитать доставку</Title>
          <div className={styles.controls}>
            <section>
              <Select
                data={model.cities}
                label='Город отправки'
                placeholder='Выберите город'
                size='md'
                {...sendingCityField}
                onChange={(value) => sendingCityField.onChange(value ?? '')}
              />
              <CityTips cities={model.tips.senderCities} onSelectCity={sendingCityField.onChange} />
            </section>

            <section>
              <Select
                data={model.cities}
                label='Город назначения'
                placeholder='Выберите город'
                size='md'
                {...destinationCityField}
                onChange={(value) => destinationCityField.onChange(value ?? '')}
              />
              <CityTips
                cities={model.tips.receiverCities}
                onSelectCity={destinationCityField.onChange}
              />
            </section>

            <Select
              data={['React', 'Angular', 'Vue', 'Svelte']}
              label='Размер посылки'
              placeholder='Введите размер посылки'
              size='md'
            />
          </div>

          <Button fullWidth radius={30} rightSection={<ArrowRight />} size='lg' type='submit'>
            Рассчитать
          </Button>
        </Paper>

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
});
