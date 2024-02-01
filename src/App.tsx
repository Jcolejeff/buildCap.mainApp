import { Routes, Route, Navigate } from 'react-router-dom';
import RouteGuard from 'guards/RouteGuard';
import externalRoute from 'routes/external';
import internalRoute, {
  innerInternalRoutes,
  maincontractorRoutes,
  subcontractorRoutes,
  adminRoutes,
  supplierRoutes,
} from 'routes/internal';
import ExternalLayout from 'layouts/external-layout';
import AppLayout from 'layouts/app-layout';
import authRoutes from 'routes/checkout';
import { Toaster, resolveValue } from 'react-hot-toast';

function App() {
  // TODO: refresh auth on reload

  return (
    <>
      <Toaster position='top-right'>
        {(t) => (
          <div
            className={`flex ${t.type === 'error' ? `items-center` : `items-start`} ${
              t.visible ? `visible` : `hidden`
            } dark:bg-grey-4 min-w-[14rem] max-w-[22rem] gap-4 rounded-[4px] bg-white p-4 shadow-md dark:shadow-none`}
            style={{
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}
          >
            <p
              className={`text-black-3 text-[14px] leading-normal dark:text-white ${
                t.type === 'error' ? `inline` : ``
              }`}
            >
              {resolveValue(t.message, t)}
            </p>
          </div>
        )}
      </Toaster>
      <Routes>
        {authRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} path={`/${i.path}`} element={i.element} />
        ))}

        {maincontractorRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/mc/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {subcontractorRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/sc/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {supplierRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/sp/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {adminRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/admin/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {internalRoute?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {innerInternalRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}

        {externalRoute?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<ExternalLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}

        <Route path='notfound' element={<></>} />
        <Route path='*' element={<Navigate to='/notfound' replace />} />
      </Routes>
    </>
  );
}

export default App;
