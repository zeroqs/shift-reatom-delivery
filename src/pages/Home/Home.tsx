import { Button, Image, Paper, Select, TextInput, Title } from '@mantine/core';
import { bindField, reatomComponent } from '@reatom/react';
import { ArrowRight } from 'lucide-react';

import type { HomeProps } from './types/types';

import { CitySelectNothingFound, CityTips, PackageSizeSelect } from './components';

import styles from './styles.module.css';

export const Home = reatomComponent(({ model, onRetry }: HomeProps) => {
  const { form } = model;
  const sendingCityField = bindField(form.fields.senderPoint);
  const destinationCityField = bindField(form.fields.receiverPoint);
  const packageValue = form.fields.package.value();

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
                nothingFoundMessage={
                  <CitySelectNothingFound isError={model.isPointsError} onRetry={onRetry} />
                }
                data={model.cities}
                label='Город отправки'
                placeholder='Выберите город'
                size='md'
                {...sendingCityField}
                error={sendingCityField.error}
                onChange={(value) => sendingCityField.onChange(value ?? '')}
              />
              <CityTips cities={model.tips.senderCities} onSelectCity={sendingCityField.onChange} />
            </section>

            <section>
              <Select
                nothingFoundMessage={
                  <CitySelectNothingFound isError={model.isPointsError} onRetry={onRetry} />
                }
                data={model.cities}
                label='Город назначения'
                placeholder='Выберите город'
                size='md'
                {...destinationCityField}
                error={destinationCityField.error}
                onChange={(value) => destinationCityField.onChange(value ?? '')}
              />
              <CityTips
                cities={model.tips.receiverCities}
                onSelectCity={destinationCityField.onChange}
              />
            </section>

            <PackageSizeSelect
              error={form.fields.package.validation().error}
              isError={model.isPackageTypesError}
              packageTypes={model.packageTypes}
              value={packageValue}
              onChange={form.fields.package.set}
              onRetry={onRetry}
            />
          </div>

          <Button
            fullWidth
            loading={!form.submit.ready()}
            radius={30}
            rightSection={<ArrowRight />}
            size='lg'
            type='submit'
          >
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
