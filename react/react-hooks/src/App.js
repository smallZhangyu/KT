import style from './App.module.css';
// import ReactHooks from './reactHooks';
import CounterRedux from './reduxDemo/CounterRedux';
import ErrorBoundary from './ErrorBoundary';
import { lazy, Suspense } from 'react';

function App() {
  const ReactHooks = lazy(() => import('./reactHooks'));
  return (
    <div className={style.App}>
      <Suspense
        fallback={
          <div style={{ color: 'greenyellow', fontSize: '26px' }}>
            loading ....{' '}
          </div>
        }
      >
        <header className={style['App-header']}>
          <ErrorBoundary>
            <ReactHooks />
          </ErrorBoundary>
          <CounterRedux />
        </header>
      </Suspense>
    </div>
  );
}

export default App;
