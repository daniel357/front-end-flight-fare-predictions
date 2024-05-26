import { request } from '../api.helpers';
import { HttpResponse } from '../api.types';

import { Post } from './sample.types';

export const getPosts = (): Promise<HttpResponse<Post[]>> => {
  return request('/posts', 'get');
};

