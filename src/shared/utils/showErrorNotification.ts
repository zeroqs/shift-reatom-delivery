import { notifications } from '@mantine/notifications';

export const showErrorNotification = (message?: string | null) => {
  notifications.show({
    title: 'Ошибка',
    message: message ?? 'Неизвестная ошибка',
    color: 'red'
  });
};
