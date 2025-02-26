import { useMutation } from '@tanstack/react-query';
import { httpPost } from '../utils/rest';

function useAuthenticate() {
  return useMutation({
    mutationFn: (data) => httpPost('user/login', data),
  });
}

export default useAuthenticate;
