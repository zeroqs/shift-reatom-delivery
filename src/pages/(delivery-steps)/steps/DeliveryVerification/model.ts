import type { CreateDeliveryOrderDto } from '@api';

import { postApiDeliveryOrder } from '@api';
import { notifications } from '@mantine/notifications';
import { action, computed, reset, withAsync } from '@reatom/core';

import { router } from '@/app/router';
import { sentOrderAtom } from '@/pages/ApplicationSent/model';
import { packageIdAtom, receiverPointIdAtom, senderPointIdAtom } from '@/pages/Home/model';
import { catchError } from '@/shared';

import { completedStepsAtom, orderInfoAtom } from '../../model';
import { deliveryOptionsAtom, selectedDeliveryOptionAtom } from '../DeliveryType/model';
import { payerForm } from '../Payer/model';
import { receiverForm, receiverPhoneField } from '../Receiver/model';
import { receiverAddressForm } from '../ReceiverAddress/model';
import { senderForm, senderPhoneField } from '../Sender/model';
import { senderAddressForm } from '../SenderAddress/model';

export const createOrderDtoAtom = computed<CreateDeliveryOrderDto>(() => ({
  packageId: packageIdAtom(),
  optionType: selectedDeliveryOptionAtom()?.type ?? 'default',
  senderPointId: senderPointIdAtom(),
  senderAddress: {
    street: senderAddressForm.fields.street(),
    house: senderAddressForm.fields.house(),
    apartment: senderAddressForm.fields.apartment(),
    comment: senderAddressForm.fields.comment()
  },
  sender: {
    firstname: senderForm.fields.firstname(),
    lastname: senderForm.fields.lastname(),
    middlename: senderForm.fields.middlename(),
    phone: senderPhoneField()
  },
  receiverPointId: receiverPointIdAtom(),
  receiverAddress: {
    street: receiverAddressForm.fields.street(),
    house: receiverAddressForm.fields.house(),
    apartment: receiverAddressForm.fields.apartment(),
    comment: receiverAddressForm.fields.comment(),
    isNonContact: receiverAddressForm.fields.isNonContact()
  },
  receiver: {
    firstname: receiverForm.fields.firstname(),
    lastname: receiverForm.fields.lastname(),
    middlename: receiverForm.fields.middlename(),
    phone: receiverPhoneField()
  },
  payer: payerForm.fields.payer()
}));

const resetDeliveryFlow = () => {
  reset(packageIdAtom);
  reset(senderPointIdAtom);
  reset(receiverPointIdAtom);
  reset(deliveryOptionsAtom);
  reset(selectedDeliveryOptionAtom);
  completedStepsAtom.reset();
  senderForm.reset();
  receiverForm.reset();
  senderAddressForm.reset();
  receiverAddressForm.reset();
  payerForm.reset();
};

export const createOrder = action(async () => {
  const body = createOrderDtoAtom();

  const response = await catchError(() => postApiDeliveryOrder({ body }));

  if (response.error) {
    notifications.show({
      title: 'Ошибка',
      message: response.error.message,
      color: 'red'
    });
    return;
  }

  const { order } = response.result.data;

  sentOrderAtom.set({
    number: order._id,
    price: order.price,
    items: orderInfoAtom()
  });

  resetDeliveryFlow();

  router.applicationSent.go();
}, 'delivery.createOrder').extend(withAsync());
