import MyAssistants from 'pages/external/my-assistants';
import CreateAssistantPage from 'pages/app/subcontractor/dashboard';

import { routeTypes } from 'types';

const externalRoute: routeTypes = [
  // {
  //   element: <MyAssistants />,
  //   path: '',
  // },
  {
    element: <CreateAssistantPage />,
    path: 'create-assistant',
  },
  {
    element: <MyAssistants />,
    path: 'my-assistants',
  },
];

export default externalRoute;
