import { useState } from 'react';
import { createImageFormStructure } from './form-structure';
import { CreateImageRequestBody } from '.';
import { CreateAssetForm } from '../../component/create-asset-form';

type Props = {
  isLoading: boolean;
  createAssetRequest: ({ name, price, plan, description }: CreateImageRequestBody) => Promise<any>;
  uploadImageRequest?: () => Promise<any>;
};

export const SubmitForm = ({ isLoading, createAssetRequest }: Props) => {
  const [selectedOption, setSelectedOption] = useState<Record<string, string | boolean>>({
    plan: 'ownership',
    forkability_status: true,
  });

  const _getSelectedOption = (option: Record<string, string | boolean>) => {
    setSelectedOption(option);
  };

  const onSubmit = async (data: any) => {
    const { name, description } = data;

    const plans: any = {
      free: 1,
      ownership: 2,
      subscription: 3,
    };

    const __plan: any = selectedOption.plan;

    const options: any = {
      name,
      price: selectedOption.plan !== 'free' ? parseInt(data.price) : 0,
      plan: plans[__plan],
      forkability_status: selectedOption.forkability_status,
      description,
    };

    if (selectedOption.plan === 'subscription') {
      options.subscription_period = parseInt(data.subscription_period);
    }

    await createAssetRequest(options);
  };

  return (
    <CreateAssetForm
      formStructure={createImageFormStructure}
      onSubmitHandler={onSubmit}
      isLoading={isLoading}
      _getSelectedOption={_getSelectedOption}
    />
  );
};
