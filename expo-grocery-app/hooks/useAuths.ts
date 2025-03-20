import { useMutation } from '@tanstack/react-query';
import { get } from '@/utils';
import { API_URL, ENDPOINTS, ERROR_MESSAGES } from '@/constants';
import { User, UserBase } from '@/interfaces';

export const useAuth = () => {
  const {
    mutate: signIn,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }: UserBase) => {
      const response = await get<User[]>(
        `${API_URL.BASE_URL}${ENDPOINTS.USERS}?email=${email}&password=${password}`,
      );
      const user = response.find((user: User) => user.email === email);
      if (!user) {
        throw new Error(ERROR_MESSAGES.AUTH_INCORRECT);
      }
      return user;
    },
  });

  return {
    signIn,
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
};
