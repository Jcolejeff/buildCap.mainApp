export interface getContentInterface {
  organization_id: string;
  page?: number;
  size?: number;
  search_value?: string;
  category: string;
}

export interface getSingleContentInterface {
  id?: string;
  organization_id?: string;
  app_id?: string;
}
export interface getallWorkflowsInterface {
  id?: string;
  organization_id?: string;
  page_id?: string;
}
