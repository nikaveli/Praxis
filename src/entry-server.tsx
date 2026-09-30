import { renderToString } from 'react-dom/server';
import { App, routes } from './App';
export function render(path: string) { return renderToString(<App path={path} />); }
export { routes };
