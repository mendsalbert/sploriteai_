import useSWR from 'swr';
import getUserSubscription from './getUserSubscription';

const fetcher = async (userId) => await getUserSubscription(userId);

const useUserSubscription = (userId) => {
  const { data, error } = useSWR(userId, fetcher);

  return {
    isSubscribed: data?.isSubscribed,
    subscriptionId: data?.subscriptionId,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserSubscription;
