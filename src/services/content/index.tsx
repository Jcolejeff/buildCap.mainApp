import API from '../index';
import { getContentInterface, getSingleContentInterface } from './content.types';

const getContent = async (user_id: string) => {
  const { data } = await API.get(`/apps`, {
    params: {
      created_by: user_id,
      reverse_sort: true,
      page: 1,
      size: 50,
    },
  });

  return data;
};

const getSingleContent = async (params: getSingleContentInterface) => {
  const { data: allPages } = await API.get(`/pages`, {
    params: {
      reverse_sort: true,
      page: 1,
      size: 50,
      app_id: params?.app_id,
    },
  });
  const { data: currentApp } = await API.get(`/apps/${params?.app_id}`, {
    params: {
      app_id: params?.app_id,
    },
  });

  return { allPages, currentApp };
};

const getAllWorkflows = async (pageId: string) => {
  const { data } = await API.get(`/workflows`, {
    params: {
      reverse_sort: true,
      page: 1,
      size: 50,
      page_id: pageId,
    },
  });

  return data;
};
// const getSingleWorkflow = async (params: any) => {
//   const { data } = await API.get(`/pages`, {
//     params: {
//       reverse_sort: true,
//       page: 1,
//       size: 50,
//       app_id: params?.app_id,
//     },
//   });

//   return data;
// };
const getSingleWorkflow = async (workflowId: string, pageId: string) => {
  const { data } = await API.get(`/workflows/${workflowId}`, {
    params: {
      reverse_sort: true,
      page: 1,
      size: 50,
      page_id: pageId,
    },
  });

  return data;
};
const getSinglePage = async (appId: string, pageId: string) => {
  const { data } = await API.get(`/pages/${pageId}`, {
    params: {
      reverse_sort: true,
      page: 1,
      size: 50,
      app_id: appId,
    },
  });

  return data;
};

const contentService = {
  getContent,
  getSingleContent,
  getAllWorkflows,
  getSingleWorkflow,
  getSinglePage,
};

export default contentService;
